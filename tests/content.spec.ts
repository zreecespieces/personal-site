import { expect, test } from "@playwright/test";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { formatCalendarDate } from "../src/lib/dates";
import { getAllPosts, getPostBySlug } from "../src/lib/blog";
import {
  calculateDaysSpent,
  countries,
  getTotalDaysSpent,
  getTotalStatesVisited,
} from "../src/app/travel/countries";
import { getProjectBySlug, getProjectsSortedByDate, projects } from "../src/app/projects/projects";
import { formatReleaseMonth, teachingCourses, teachingImpact } from "../src/app/_data/teaching";
import { completedBooks } from "../src/app/reading/books";
import {
  allTrails2026Hikes,
  calculateHikeStats,
  formatActivityTime,
  groupHikesByLocation,
  hikes,
} from "../src/app/hikes/hikes";
import { hobbyLinks } from "../src/app/_data/hobbies";
import { linkCategories } from "../src/app/_data/links";
import {
  comedians,
  getComediansByLatestSeen,
  getMostRecentlySeenComedian,
  getTotalShows,
  getTotalComediansSeen,
  formatShowTime,
} from "../src/app/comedy/comedians";

test("calendar dates are explicit and invalid dates are not silently normalized", () => {
  expect(formatCalendarDate("2026-05-12")).toBe("May 12, 2026");
  expect(formatCalendarDate("2024-02-29")).toBe("February 29, 2024");
  expect(formatCalendarDate("2026-02-30")).toBe("2026-02-30");
  expect(formatCalendarDate("unknown")).toBe("unknown");
  expect(
    formatCalendarDate("2026-05-12", { year: "numeric", timeZone: "America/Los_Angeles" })
  ).toBe("2026");
});

test("blog content has unique slugs, required metadata, and no path traversal", () => {
  const posts = getAllPosts();
  expect(new Set(posts.map((post) => post.slug)).size).toBe(posts.length);
  for (const post of posts) {
    expect(post.title.trim()).not.toBe("");
    expect(post.description.trim()).not.toBe("");
    expect(post.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(getPostBySlug(post.slug)?.content.trim()).not.toBe("");
  }
  expect(getPostBySlug("../../docs/personal_website_design_doc")).toBeNull();
  expect(getPostBySlug("missing")).toBeNull();
});

test("public identity assets exist and travel totals exclude DC", () => {
  for (const file of ["profile-picture.jpg", "resume.pdf", "gucci-monk.png"]) {
    expect(existsSync(resolve("public", file))).toBe(true);
  }
  const states = countries.flatMap((country) => country.states ?? []);
  expect(getTotalStatesVisited()).toBe(
    new Set(states.filter((state) => state !== "Washington DC")).size
  );
  const home = countries.find((country) => country.isHomeCountry);
  expect(home?.visits.some((visit) => visit.isOngoing && !visit.endDate)).toBe(true);
  expect(home?.states?.filter((state) => state === "Arizona")).toHaveLength(1);
  expect(home?.states?.filter((state) => state === "Minnesota")).toHaveLength(1);
  expect(getTotalStatesVisited()).toBe(25);
});

test("ongoing Colorado residence counts calendar days through an explicit date without changing travel totals", () => {
  const ongoing = countries
    .find((country) => country.isHomeCountry)!
    .visits.find((visit) => visit.isOngoing)!;
  expect(calculateDaysSpent([ongoing])).toBe(0);
  expect(calculateDaysSpent([ongoing], "2026-10-12")).toBe(783);
  expect(calculateDaysSpent([ongoing], "2026-10-13")).toBe(784);
  expect(calculateDaysSpent([ongoing], "2024-08-21")).toBe(1);
  expect(calculateDaysSpent([ongoing], "2024-08-20")).toBe(0);
  expect(calculateDaysSpent([ongoing], "2024-08-19")).toBe(0);
  for (const country of countries) {
    const completed = country.visits.filter((visit) => !visit.isOngoing);
    expect(calculateDaysSpent(completed, "2026-10-12")).toBe(calculateDaysSpent(completed));
  }
  expect(getTotalDaysSpent()).toBe(
    countries
      .filter((country) => !country.isHomeCountry)
      .reduce((total, country) => total + calculateDaysSpent(country.visits), 0)
  );
});

test("published projects have unique routable slugs and newest-first ordering", () => {
  expect(new Set(projects.map((project) => project.slug)).size).toBe(projects.length);
  const originalOrder = projects.map((project) => project.slug);
  for (const project of projects) {
    expect(project.slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    expect(project.title.trim()).not.toBe("");
    expect(project.subtitle.trim()).not.toBe("");
    expect(project.summary.trim()).not.toBe("");
    expect(project.startDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(getProjectBySlug(project.slug)).toBe(project);
    const groups = project.featureGroups.map((group) => group.id);
    expect(new Set(groups).size).toBe(groups.length);
    for (const feature of project.features) expect(groups).toContain(feature.group);
    if (project.banner) {
      expect(project.banner.url).toMatch(/^https:\/\//);
      expect(project.banner.alt.trim()).not.toBe("");
      expect(project.banner.width).toBeGreaterThan(0);
      expect(project.banner.height).toBeGreaterThan(0);
    }
  }
  const sorted = getProjectsSortedByDate();
  expect(sorted.map((project) => project.startDate)).toEqual(
    projects
      .map((project) => project.startDate)
      .sort()
      .reverse()
  );
  expect(projects.map((project) => project.slug)).toEqual(originalOrder);
  expect(getProjectBySlug("missing")).toBeNull();
  expect(getProjectBySlug("../projects")).toBeNull();
});

test("teaching uses three real courses, month-level releases, and one shared reach source", () => {
  expect(teachingCourses.map((course) => course.releaseDate)).toEqual([
    "2020-01",
    "2021-07",
    "2024-02",
  ]);
  expect(teachingCourses.map((course) => formatReleaseMonth(course.releaseDate))).toEqual([
    "January 2020",
    "July 2021",
    "February 2024",
  ]);
  expect(teachingImpact).toEqual({ students: "22,500+", countries: 150, reviews: "Over 3,000" });
  for (const course of teachingCourses) {
    expect(course.url).toMatch(/^https:\/\/www\.udemy\.com\/course\//);
    expect(course.image).toMatch(/^https:\/\/img-c\.udemycdn\.com\/course\/480x270\//);
    expect(course.topics).toHaveLength(3);
  }
  const project = getProjectBySlug("udemy-courses");
  expect(project?.courses).toBe(teachingCourses);
  expect(project?.datePrecision).toBe("month");
  expect(project?.summary).toContain(teachingImpact.students);
});

test("new reading records use the matching Goodreads books and Amazon edition covers without invented dates", () => {
  expect(completedBooks.slice(0, 4).map((book) => book.title)).toEqual([
    "The Staff Engineer's Path",
    "Brain Food",
    "The Body Keeps the Score",
    "Software Engineering at Google",
  ]);
  expect(completedBooks.slice(0, 4).map((book) => book.url)).toEqual([
    "https://www.goodreads.com/book/show/61058107-the-staff-engineer-s-path",
    "https://www.goodreads.com/book/show/35457267-brain-food",
    "https://www.goodreads.com/book/show/18693771-the-body-keeps-the-score",
    "https://www.goodreads.com/book/show/48816586-software-engineering-at-google",
  ]);
  for (const book of completedBooks.slice(0, 4)) {
    expect(book.coverImage).toMatch(/^https:\/\/m\.media-amazon\.com\/images\/I\//);
    expect(book.completedDate).toBeUndefined();
    expect(book.rating).toBeUndefined();
  }
});

test("six AllTrails screenshots are transcribed without rounding or replacing activity measurements", () => {
  expect(
    allTrails2026Hikes.map((hike) => [
      hike.name,
      hike.location,
      hike.date,
      hike.distance,
      hike.elevation,
      hike.activity?.movingTime,
      hike.activity?.totalTime,
      hike.activity?.averagePace,
      hike.activity?.estimatedCalories,
    ])
  ).toEqual([
    [
      "Davis Ponds Trail",
      "Pine, Colorado",
      "2026-05-17",
      2.63,
      243,
      [1, 0, 48],
      [1, 16, 54],
      [23, 8],
      527,
    ],
    [
      "Chavez and Beaver Brook Loop",
      "Golden, Colorado",
      "2026-06-29",
      5.24,
      1112,
      [2, 9, 27],
      [2, 30, 42],
      [24, 41],
      1123,
    ],
    [
      "Brother's Lookout via Sisters and Ponderosa Loop",
      "Evergreen, Colorado",
      "2026-07-07",
      2.34,
      413,
      [1, 3, 14],
      [1, 8, 56],
      [26, 59],
      548,
    ],
    [
      "Gem Lake Trail and Lumpy Ridge Loop",
      "Estes Park, Colorado",
      "2026-08-15",
      4.91,
      1762,
      [3, 0, 23],
      [6, 5, 54],
      [36, 46],
      1564,
    ],
    [
      "The Decalibron: Mounts Democrat, Cameron, Lincoln, and Bross Trail",
      "Alma, Colorado",
      "2026-09-12",
      7.51,
      3376,
      [4, 56, 54],
      [7, 5, 51],
      [39, 33],
      2575,
    ],
    [
      "Panorama Loop",
      "Desert Hot Springs, California",
      "2026-09-28",
      6.33,
      1171,
      [2, 26, 13],
      [3, 31, 29],
      [23, 6],
      1268,
    ],
  ]);
  expect(allTrails2026Hikes.map((hike) => hike.trailUrl)).toEqual([
    "https://www.alltrails.com/trail/us/colorado/davis-ponds-trail",
    "https://www.alltrails.com/trail/us/colorado/chavez-and-beaver-brook-loop",
    "https://www.alltrails.com/trail/us/colorado/brothers-lookout-and-three-sisters-loop",
    "https://www.alltrails.com/trail/us/colorado/gem-lake-trail-and-lumpy-ridge-loop--2",
    "https://www.alltrails.com/trail/us/colorado/the-decalibron-mounts-democrat-cameron-lincoln-and-bross-trail",
    "https://www.alltrails.com/trail/us/california/panorama-loop--3",
  ]);
  expect(formatActivityTime([1, 0, 48])).toBe("1:00:48");
  expect(allTrails2026Hikes[4].activity?.rating).toBe(5);
  expect(allTrails2026Hikes[4].difficulty).toBe("Hard");
  expect(allTrails2026Hikes.filter((hike) => hike.activity?.rating !== undefined)).toHaveLength(1);
});

test("hiking totals and location groups include each new activity once in newest-first order", () => {
  const stats = calculateHikeStats();
  expect(stats.totalHikes).toBe(39);
  expect(stats.totalDistance).toBeCloseTo(hikes.reduce((sum, hike) => sum + hike.distance, 0));
  expect(stats.totalElevation).toBe(hikes.reduce((sum, hike) => sum + (hike.elevation ?? 0), 0));
  for (const hike of allTrails2026Hikes)
    expect(
      hikes.filter((record) => record.name === hike.name && record.date === hike.date)
    ).toHaveLength(1);
  const groups = groupHikesByLocation();
  for (const group of groups)
    expect(group.hikes.map((hike) => hike.date)).toEqual(
      group.hikes
        .map((hike) => hike.date)
        .sort()
        .reverse()
    );
  expect(groups.find((group) => group.name === "California")?.hikes[0].name).toBe("Panorama Loop");
  expect(groups.find((group) => group.name === "Colorado")?.hikes[0].name).toContain(
    "The Decalibron"
  );
});

test("the Hobbies landing page and homepage directory share one set of destinations", () => {
  expect(hobbyLinks).toHaveLength(6);
  expect(new Set(hobbyLinks.map((hobby) => hobby.url)).size).toBe(6);
  expect(linkCategories.find((category) => category.title === "Hobbies")?.links).toBe(hobbyLinks);
  expect(hobbyLinks.find((hobby) => hobby.title === "BJJ & Judo")?.icon).toBe("belt");
});

test("Comedy orders comedians by their latest attended show, newest first, without changing source records", () => {
  const original = comedians.map((comedian) => ({
    name: comedian.name,
    dates: comedian.shows.map((show) => show.date),
  }));
  const latest = getMostRecentlySeenComedian();
  expect(latest?.name).toBe("Mark Normand");
  const latestDate = comedians
    .flatMap((comedian) => comedian.shows.map((show) => show.date))
    .sort()
    .at(-1);
  expect(latest?.shows.some((show) => show.date === latestDate)).toBe(true);
  const ordered = getComediansByLatestSeen();
  expect(ordered[0]).toBe(latest);
  expect(ordered.map((comedian) => comedian.name)).toEqual([
    "Mark Normand",
    "Timmy No Brakes",
    "Jeremiah Watkins",
    "James McCann",
    "Adam Ray",
    "Duncan Trussell",
    "Bryan Callen",
    "Louis C.K.",
    "Shane Gillis",
    "Ari Shaffir",
    "TJ Miller",
    "Ari Matti",
    "Ian Fidance",
    "Tom Segura",
    "Kill Tony",
    "Joe Rogan",
    "Bo Burnham",
  ]);
  const latestDates = ordered.map((comedian) =>
    comedian.shows
      .map((show) => show.date)
      .sort()
      .at(-1)
  );
  expect(latestDates).toEqual([...latestDates].sort().reverse());
  expect(
    comedians.map((comedian) => ({
      name: comedian.name,
      dates: comedian.shows.map((show) => show.date),
    }))
  ).toEqual(original);
});

test("the two new comedy screenshots add seven attended shows and four comedians, excluding the missed Ari Matti show", () => {
  const added = comedians
    .flatMap((comedian) =>
      comedian.shows
        .filter((show) => show.date.startsWith("2026"))
        .map((show) => ({ comedian: comedian.name, ...show }))
    )
    .sort((a, b) => a.date.localeCompare(b.date));
  expect(added).toEqual([
    {
      comedian: "Bryan Callen",
      date: "2026-03-07",
      startTime: "19:00",
      venue: "Comedy Works Downtown (Larimer Square)",
      address: "1226 15th St",
      city: "Denver, CO",
    },
    {
      comedian: "Duncan Trussell",
      date: "2026-03-27",
      startTime: "21:45",
      venue: "Comedy Works Downtown (Larimer Square)",
      city: "Denver, CO",
      notes: "Showtime moved from 7:30 PM to 9:45 PM the same night.",
    },
    {
      comedian: "Adam Ray",
      date: "2026-04-18",
      startTime: "19:00",
      venue: "Paramount Theatre",
      address: "1621 Glenarm St",
      city: "Denver, CO",
      tourName: "WHO IS ME Tour",
    },
    {
      comedian: "James McCann",
      date: "2026-05-29",
      startTime: "19:15",
      venue: "Comedy Works Downtown (Larimer Square)",
      city: "Denver, CO",
    },
    {
      comedian: "Jeremiah Watkins",
      date: "2026-06-05",
      startTime: "19:15",
      venue: "Comedy Works South (The Landmark DTC)",
      address: "5345 Landmark Place",
      city: "Greenwood Village, CO",
    },
    {
      comedian: "Timmy No Brakes",
      date: "2026-07-30",
      startTime: "19:00",
      venue: "Comedy Works Downtown (Larimer Square)",
      city: "Denver, CO",
    },
    {
      comedian: "Mark Normand",
      date: "2026-10-03",
      startTime: "21:15",
      venue: "Comedy Works Downtown (Larimer Square)",
      city: "Denver, CO",
    },
  ]);
  expect(comedians.find((comedian) => comedian.name === "Ari Matti")?.shows).toEqual([
    { date: "2025-02-07", venue: "Comedy Works", city: "Denver, CO" },
  ]);
  expect(getTotalShows()).toBe(22);
  expect(getTotalComediansSeen()).toBe(17);
  expect(formatShowTime("19:00")).toBe("7:00 PM");
  expect(formatShowTime("21:45")).toBe("9:45 PM");
  for (const name of [
    "Bryan Callen",
    "James McCann",
    "Jeremiah Watkins",
    "Timmy No Brakes",
    "TJ Miller",
    "Ari Shaffir",
  ]) {
    const image = new URL(comedians.find((comedian) => comedian.name === name)!.image);
    expect(image.hostname).toBe("comedyworks.com");
    expect(image.pathname).toMatch(/^\/rails\/active_storage\/blobs\/redirect\//);
  }
});
