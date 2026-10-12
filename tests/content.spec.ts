import { expect, test } from "@playwright/test";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { formatCalendarDate } from "../src/lib/dates";
import { getAllPosts, getPostBySlug } from "../src/lib/blog";
import { countries, getTotalStatesVisited } from "../src/app/travel/countries";

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
});
