import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { getProjectsSortedByDate } from "../src/app/projects/projects";
import { getAllPosts } from "../src/lib/blog";
import { teachingCourses, teachingImpact } from "../src/app/_data/teaching";
import { completedBooks } from "../src/app/reading/books";
import { courses } from "../src/app/study/courses";
import { hobbyLinks } from "../src/app/_data/hobbies";
import { allTrails2026Hikes, calculateHikeStats, formatActivityTime } from "../src/app/hikes/hikes";
import { countries, getTotalDaysSpent } from "../src/app/travel/countries";
import { getComediansByLatestSeen, getMostRecentlySeenComedian } from "../src/app/comedy/comedians";

const routes = [
  "/",
  "/projects",
  "/projects/instant-perler-pattern",
  "/projects/kokoro-pi",
  "/projects/udemy-courses",
  "/about",
  "/blog",
  "/blog/gpt-5-5-vs-opus-4-7",
  "/reading",
  "/study",
  "/hikes",
  "/hobbies",
  "/travel",
  "/music-festivals",
  "/comedy",
  "/art",
];

async function selectArchive(page: Page, control: string, value: string, label: string) {
  const picker = page.getByRole("combobox", { name: control });
  if (await picker.isVisible()) {
    await picker.selectOption(value);
    await expect(picker).toHaveValue(value);
  } else {
    const tab = page.getByRole("tab", { name: label, exact: true });
    await tab.click();
    await expect(tab).toHaveAttribute("aria-selected", "true");
  }
}

async function settlePageImages(page: Page) {
  const horizontalScroll = await page
    .locator(".MuiTabs-scroller")
    .evaluateAll((elements) => elements.map((element) => element.scrollLeft));
  // Exercise actual lazy loading by scrolling through the visible collection.
  // A full-page capture alone does not load images below the viewport.
  for (const frame of await page.locator("main [data-content-image]:visible").all()) {
    await frame.scrollIntoViewIfNeeded();
    await expect
      .poll(
        () =>
          frame.evaluate((element) => {
            const image = element.querySelector("img");
            return !image || image.complete;
          }),
        { timeout: 20_000 }
      )
      .toBe(true);
  }
  await page.locator(".MuiTabs-scroller").evaluateAll((elements, positions) => {
    elements.forEach((element, index) => {
      element.scrollLeft = positions[index];
    });
  }, horizontalScroll);
  await page.evaluate(() => window.scrollTo(0, 0));
}

for (const route of routes) {
  test(`${route} is responsive and accessible`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator("main#main-content")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(page.getByRole("navigation", { name: "Main navigation" })).toBeVisible();
    await expect(page.getByRole("contentinfo")).toHaveCount(1);
    await page.evaluate(() => document.fonts.ready);
    for (const width of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      await expect
        .poll(() => page.evaluate(() => document.documentElement.scrollWidth), {
          message: `${route} overflows at ${width}px`,
        })
        .toBeLessThanOrEqual(width);
    }
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(results.violations).toEqual([]);
    }
    expect(errors).toEqual([]);
  });
}

test("newsletter is opt-in, validates inline, and restores focus", async ({ page }) => {
  await page.goto("/");
  await page.clock.install();
  await page.clock.fastForward(20_000);
  await expect(page.getByRole("dialog")).toHaveCount(0);
  const trigger = page.getByRole("button", { name: "Subscribe to the newsletter" });
  await trigger.click();
  await expect(page.getByRole("dialog", { name: "Newsletter" })).toBeVisible();
  await page.getByLabel("Email Address").fill("not-an-email");
  await page.getByRole("button", { name: "Subscribe", exact: true }).click();
  await expect(
    page.getByText("Please enter a valid email address", { exact: false })
  ).toBeVisible();
  await expect(page.getByLabel("Email Address")).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

test("newsletter success and failure use a mocked API, never a real subscription", async ({
  page,
}) => {
  await page.route("**/api/subscribe", (route) =>
    route.fulfill({ status: 500, json: { success: false, message: "Please try again later." } })
  );
  await page.goto("/");
  await page.getByRole("button", { name: "Subscribe to the newsletter" }).click();
  await page.getByLabel("Email Address").fill("reader@example.com");
  await page.getByRole("button", { name: "Subscribe", exact: true }).click();
  await expect(
    page.getByRole("alert").filter({ hasText: "Please try again later." })
  ).toBeVisible();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.route("**/api/subscribe", (route) =>
    route.fulfill({ json: { success: true, message: "Thanks for subscribing." } })
  );
  await page.getByRole("button", { name: "Subscribe", exact: true }).click();
  await expect(page.getByRole("dialog", { name: "You're subscribed." })).toBeVisible();
  await expect(page.getByRole("status")).toHaveText("Thanks for subscribing.");
  await expect(page.getByRole("button", { name: "Done", exact: true })).toBeFocused();
  await page.getByRole("button", { name: "Done", exact: true }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Subscribe to the newsletter" })).toBeFocused();
});

test("home remains navigable without JavaScript", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator("#index")).toBeVisible();
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Projects" })
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Projects");
  for (const project of getProjectsSortedByDate()) {
    await page.getByRole("link", { name: project.title, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`/projects/${project.slug}$`));
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(project.title);
    await page.getByRole("link", { name: "All projects", exact: true }).click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Projects");
  }
  await context.close();
});

test("closing a pending signup preserves the email and ignores a stale response", async ({
  page,
}) => {
  let release!: () => void;
  const pending = new Promise<void>((resolve) => {
    release = resolve;
  });
  await page.route("**/api/subscribe", async (route) => {
    await pending;
    await route
      .fulfill({ json: { success: true, message: "Thanks for subscribing." } })
      .catch(() => {});
  });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Subscribe to the newsletter" });
  await trigger.click();
  await expect(page.getByRole("dialog").getByRole("textbox")).toHaveCount(1);
  await page.getByLabel("Email Address").fill("reader@example.com");
  await page.getByRole("button", { name: "Subscribe", exact: true }).click();
  await expect(page.getByRole("button", { name: "Subscribing…" })).toBeDisabled();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  release();
  await trigger.click();
  await expect(page.getByLabel("Email Address")).toHaveValue("reader@example.com");
  await expect(page.getByRole("button", { name: "Subscribe", exact: true })).toBeEnabled();
  await expect(page.getByRole("dialog", { name: "Newsletter" })).toBeVisible();
});

test("development specimen follows the live shared patterns and is gated in production", async ({
  page,
}) => {
  const response = await page.goto("/preview");
  if (process.env.PLAYWRIGHT_PRODUCTION === "1") {
    expect(response?.status()).toBe(404);
    return;
  }
  expect(response?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await page.getByRole("tab", { name: "Second collection" }).click();
  await expect(page.getByRole("heading", { name: "Second example record" })).toBeVisible();
  const trigger = page.getByRole("button", { name: "Open example dialog" });
  await trigger.click();
  await expect(page.getByRole("dialog", { name: "Example dialog" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
});

test("home directory is complete navigation, not repeated promotional copy", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveAccessibleName("Zachary Reece");
  const index = page.locator("#index");
  await expect(index.getByRole("heading", { name: "Explore", exact: true })).toBeVisible();
  await expect(page.getByText("Reimagining education.", { exact: true })).toBeVisible();
  await expect(page.getByText("Software Engineer", { exact: true })).toBeVisible();
  await expect(index.getByRole("link")).toHaveCount(14);
  await expect(index.getByRole("link", { name: "Writing" })).toHaveAttribute("href", "/blog");
  await expect(index.getByRole("link", { name: "Teaching on Udemy" })).toHaveAttribute(
    "href",
    "/projects/udemy-courses"
  );
  await expect(page.getByText(teachingImpact.students, { exact: false })).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Building at Flint" })).toHaveCount(0);
  await expect(page.getByText("Instant Perler Pattern", { exact: true })).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Selected work", exact: true })).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Latest writing", exact: true })).toBeVisible();
  await expect(page.locator('a[href="mailto:zachdreece@gmail.com"]')).toHaveCount(1);
});

test("@visual home Explore rows have padded hover and focus states with consistent arrows", async ({
  page,
}) => {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    const index = page.locator("#index");
    await expect(index.locator(".zr-end-glyph")).toHaveText(Array(14).fill("→"));
    for (const name of ["About", "GitHub"]) {
      const row = index.getByRole("link", { name, exact: true });
      await row.hover();
      const spacing = await row.evaluate((element) => {
        const bounds = element.getBoundingClientRect();
        const label = element.querySelector(".zr-title")!.getBoundingClientRect();
        const arrow = element.querySelector(".zr-end-glyph")!.getBoundingClientRect();
        const style = getComputedStyle(element);
        return {
          left: label.left - bounds.left,
          right: bounds.right - arrow.right,
          top: parseFloat(style.paddingTop),
          bottom: parseFloat(style.paddingBottom),
        };
      });
      expect(spacing.left).toBeGreaterThanOrEqual(16);
      expect(spacing.right).toBeGreaterThanOrEqual(12);
      expect(spacing.top).toBeGreaterThanOrEqual(12);
      expect(spacing.bottom).toBeGreaterThanOrEqual(12);
      await expect(row).toHaveScreenshot(`explore-${name.toLowerCase()}-hover-${width}.png`);
      await row.focus();
      await expect(row).toBeFocused();
    }
  }
});

test("home projects sit between the hero and writing with equal-weight detail links", async ({
  page,
}) => {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    const section = page.getByRole("region", { name: "Projects", exact: true });
    const published = getProjectsSortedByDate().filter(
      (project) => project.slug !== "instant-perler-pattern"
    );
    await expect(section.getByRole("listitem")).toHaveCount(published.length);
    expect(await section.evaluate((element) => getComputedStyle(element).borderTopWidth)).toBe(
      "1px"
    );
    expect(
      await section
        .getByRole("listitem")
        .first()
        .evaluate((element) => getComputedStyle(element).borderTopWidth)
    ).toBe("0px");
    expect(
      await section
        .getByRole("listitem")
        .nth(1)
        .evaluate((element) => getComputedStyle(element).borderTopWidth)
    ).toBe("1px");
    await expect(section.getByRole("link", { name: "All projects", exact: true })).toHaveAttribute(
      "href",
      "/projects"
    );
    for (const [index, project] of published.entries()) {
      const row = section.getByRole("listitem").nth(index);
      await expect(row.getByRole("heading", { level: 3 })).toHaveText(project.title);
      await expect(row.getByRole("link")).toHaveAttribute("href", `/projects/${project.slug}`);
    }
    const hero = await page.getByText("Reimagining education.", { exact: true }).boundingBox();
    const projects = await section.boundingBox();
    const writing = await page
      .getByRole("region", { name: "Latest writing", exact: true })
      .boundingBox();
    expect(projects!.y).toBeGreaterThan(hero!.y + hero!.height);
    expect(writing!.y).toBeGreaterThanOrEqual(projects!.y + projects!.height);
    const link = section.getByRole("link", { name: "Kokoro Pi", exact: true });
    await link.focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/projects\/kokoro-pi$/);
    await page.goBack();
    await expect(page).toHaveURL(/\/$/);
  }
});

test("Hobbies replaces the header Explore link and offers all six icon cards", async ({
  page,
  request,
}) => {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/about");
    const navigation = page.getByRole("navigation", { name: "Main navigation" });
    await expect(navigation.getByRole("link", { name: "Explore", exact: true })).toHaveCount(0);
    await navigation.getByRole("link", { name: "Hobbies", exact: true }).click();
    await expect(page).toHaveURL(/\/hobbies$/);
    await expect(navigation.getByRole("link", { name: "Hobbies", exact: true })).toHaveAttribute(
      "aria-current",
      "page"
    );
    await expect(page).toHaveTitle("Hobbies | Zachary Reece");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://zacharyreece.dev/hobbies"
    );
    const main = page.locator("main");
    await expect(main.getByRole("listitem")).toHaveCount(6);
    for (const hobby of hobbyLinks) {
      const card = main.getByRole("link", { name: hobby.title, exact: true });
      await expect(card).toHaveAttribute("href", hobby.url);
      await expect(card.locator('svg[aria-hidden="true"]')).toHaveCount(1);
      await card.focus();
      await expect(card).toBeFocused();
      expect(
        await card.evaluate((element) => parseFloat(getComputedStyle(element).outlineWidth))
      ).toBeGreaterThanOrEqual(2);
      if (hobby.external) {
        await expect(card).toHaveAttribute("target", "_blank");
        await expect(card).not.toContainText("Opens in a new tab");
      }
    }
    const hikes = main.getByRole("link", { name: "Hikes", exact: true });
    await hikes.focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/hikes$/);
    await expect(navigation.getByRole("link", { name: "Hobbies", exact: true })).toHaveAttribute(
      "aria-current",
      "location"
    );
    await page.goBack();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Hobbies");
  }
  expect(await (await request.get("/sitemap.xml")).text()).toContain(
    "https://zacharyreece.dev/hobbies"
  );
});

test("Hobbies cards and homepage projects work without JavaScript", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
  const page = await context.newPage();
  await page.goto("/");
  await page
    .getByRole("region", { name: "Projects", exact: true })
    .getByRole("link", { name: "Udemy Courses", exact: true })
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Udemy Courses");
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Hobbies", exact: true })
    .click();
  await page.locator("main").getByRole("link", { name: "Travel", exact: true }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Travel");
  await context.close();
});

test("six screenshot hikes retain recorded metrics, correct trail links, and working photos", async ({
  page,
}) => {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/hikes?location=colorado");
    await expect(page.locator("main")).toContainText(`${calculateHikeStats().totalHikes} hikes`);
    for (const location of ["Colorado", "California"]) {
      await selectArchive(page, "Hike locations", location.toLowerCase(), location);
      await expect(page.getByText("Trail photo via AllTrails", { exact: true })).toHaveCount(0);
      await expect(
        page.getByText(
          "Private property: check current access restrictions and waiver requirements before visiting.",
          { exact: true }
        )
      ).toHaveCount(0);
      for (const hike of allTrails2026Hikes.filter((hike) => hike.location.endsWith(location))) {
        const entry = page
          .locator("main")
          .getByRole("listitem")
          .filter({ has: page.getByRole("heading", { name: hike.name, exact: true }) });
        await expect(entry.getByRole("link", { name: hike.name, exact: true })).toHaveAttribute(
          "href",
          hike.trailUrl!
        );
        await expect(entry.locator("time")).toHaveAttribute("datetime", hike.date);
        await expect(entry).toContainText(`${hike.distance} mi`);
        await expect(entry).toContainText(`${hike.elevation!.toLocaleString("en-US")} ft`);
        await expect(entry).toContainText(formatActivityTime(hike.activity!.movingTime));
        await expect(entry).toContainText(formatActivityTime(hike.activity!.totalTime));
        await expect(entry).toContainText(
          `${hike.activity!.averagePace[0]}:${String(hike.activity!.averagePace[1]).padStart(2, "0")} / mi`
        );
        await expect(entry).toContainText(
          `${hike.activity!.estimatedCalories.toLocaleString("en-US")} kcal`
        );
        if (hike.activity?.rating !== undefined) {
          await expect(entry).toContainText("5 / 5");
        }
        const image = entry.getByRole("img", { name: `Trail photo: ${hike.name}`, exact: true });
        await image.scrollIntoViewIfNeeded();
        await expect
          .poll(() => image.evaluate((element) => (element as HTMLImageElement).naturalWidth), {
            timeout: 20_000,
          })
          .toBeGreaterThan(0);
      }
    }
    const trigger = page.getByRole("button", { name: "View images of Panorama Loop", exact: true });
    await trigger.click();
    await expect(page.getByRole("dialog").getByRole("heading")).toHaveText("Panorama Loop");
    await page.keyboard.press("Escape");
    await expect(trigger).toBeFocused();
  }
});

test("about uses the shared contact footer and the project keeps all eight capabilities", async ({
  page,
}) => {
  await page.goto("/about");
  await expect(page.locator('a[href="mailto:zachdreece@gmail.com"]')).toHaveCount(1);
  await expect(page.locator('a[href="/resume.pdf"]')).toHaveCount(1);
  await page.goto("/projects/instant-perler-pattern");
  await expect(page.getByRole("heading", { name: "Capabilities", exact: true })).toBeVisible();
  for (const title of [
    "Image upload",
    "Direct pattern editing",
    "Color replacement",
    "Custom grid size",
    "Color normalization",
    "Export options",
    "Bead count",
    "Pattern auto-size",
  ]) {
    await expect(page.getByText(title, { exact: true })).toHaveCount(1);
  }
});

test("projects is a browsable list with keyboard detail navigation and browser history", async ({
  page,
}) => {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/projects");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Projects");
    const main = page.locator("main");
    const published = getProjectsSortedByDate();
    await expect(main.getByRole("listitem")).toHaveCount(published.length);
    await expect(main.getByRole("link")).toHaveCount(published.length);
    for (const [index, project] of published.entries()) {
      await expect(main.getByRole("listitem").nth(index).getByRole("link")).toHaveAttribute(
        "href",
        `/projects/${project.slug}`
      );
    }
    await expect(page.getByRole("heading", { name: "Capabilities", exact: true })).toHaveCount(0);
    await expect(page.getByRole("link", { name: "Open the pattern maker" })).toHaveCount(0);
    await expect(page.getByRole("link", { name: "Hear the samples" })).toHaveCount(0);
    const entry = main.getByRole("link", { name: "Instant Perler Pattern", exact: true });
    await entry.focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/projects\/instant-perler-pattern$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Instant Perler Pattern");
    await expect(
      page
        .getByRole("navigation", { name: "Main navigation" })
        .getByRole("link", { name: "Projects" })
    ).toHaveAttribute("aria-current", "page");
    await expect(page.getByRole("link", { name: "Open the pattern maker" })).toHaveAttribute(
      "href",
      "https://zacharyreece.dev/instant-perler-pattern"
    );
    await expect(page.getByRole("link", { name: "View code on GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/zreecespieces/perler-pattern-generator"
    );
    await page.goBack();
    await expect(page).toHaveURL(/\/projects$/);
    await expect(entry).toBeVisible();
    await page.goForward();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Instant Perler Pattern");
    const back = page.getByRole("link", { name: "All projects", exact: true });
    await back.focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/projects$/);
    await expect(entry).toBeVisible();
    await main.getByRole("link", { name: "Kokoro Pi", exact: true }).click();
    await expect(page).toHaveURL(/\/projects\/kokoro-pi$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Kokoro Pi");
    await expect(page.getByRole("link", { name: "Hear the samples" })).toHaveAttribute(
      "href",
      "https://zreecespieces.github.io/kokoro-pi/"
    );
    await expect(page.getByRole("link", { name: "View code on GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/zreecespieces/kokoro-pi"
    );
    for (const title of [
      "Clause streaming",
      "Native ARM kernels",
      "OpenAI-compatible speech API",
      "Home Assistant and Python",
      "Install and run locally",
      "Build, compare, and validate",
    ]) {
      await expect(page.getByText(title, { exact: true })).toHaveCount(1);
    }
    await expect(page.getByText("Source image", { exact: true })).toHaveCount(0);
    for (const label of ["Text input", "Speech on the Pi", "Streaming audio"]) {
      await expect(page.getByText(label, { exact: true })).toBeVisible();
    }
    await page.getByRole("link", { name: "All projects", exact: true }).click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Projects");
  }
});

test("project detail deep links have their own metadata and unknown projects return 404", async ({
  page,
  request,
}) => {
  for (const project of getProjectsSortedByDate()) {
    await page.goto(`/projects/${project.slug}`);
    await page.reload();
    await expect(page).toHaveTitle(`${project.title} | Zachary Reece`);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://zacharyreece.dev/projects/${project.slug}`
    );
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
      "content",
      `https://zacharyreece.dev/projects/${project.slug}`
    );
  }
  await page.goto("/projects");
  await expect(page).toHaveTitle("Projects | Zachary Reece");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://zacharyreece.dev/projects"
  );
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  for (const project of getProjectsSortedByDate()) {
    expect(await sitemap.text()).toContain(`https://zacharyreece.dev/projects/${project.slug}`);
  }
  const response = await page.goto("/projects/not-a-project");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Nothing at this address.");
});

test("@visual project list rows have padded hover and visible keyboard focus", async ({ page }) => {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/projects");
    for (const project of getProjectsSortedByDate()) {
      const entry = page.locator("main").getByRole("link", { name: project.title, exact: true });
      await entry.hover();
      const padding = await entry.evaluate((element) => {
        const style = getComputedStyle(element);
        return [style.paddingLeft, style.paddingRight, style.paddingTop, style.paddingBottom].map(
          parseFloat
        );
      });
      expect(padding.every((value) => value >= 16)).toBe(true);
      await expect(entry).toHaveScreenshot(`project-${project.slug}-hover-${width}.png`);
      await page.mouse.move(0, 0);
      await page.keyboard.press("Tab");
      await entry.focus();
      await expect(entry).toBeFocused();
      expect(
        await entry.evaluate((element) => parseFloat(getComputedStyle(element).outlineWidth))
      ).toBeGreaterThanOrEqual(2);
      await expect(entry).toHaveScreenshot(`project-${project.slug}-focus-${width}.png`);
    }
  }
});

test("projects and articles share list styling, metadata, and keyboard navigation", async ({
  page,
}) => {
  const posts = getAllPosts();
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    const styles = [];
    for (const route of ["/projects", "/blog"]) {
      await page.goto(route);
      const rows = page.locator("main .zr-linked-record");
      await expect(rows).toHaveCount(
        route === "/projects" ? getProjectsSortedByDate().length : posts.length
      );
      await expect(page.locator("main .zr-end-glyph")).toHaveText(
        Array(await rows.count()).fill("→")
      );
      const row = rows.first();
      expect(
        await page
          .locator("main ul > li")
          .first()
          .evaluate((element) => getComputedStyle(element).borderTopWidth)
      ).toBe("1px");
      styles.push(
        await row.evaluate((element) => {
          const style = getComputedStyle(element);
          const title = getComputedStyle(element.querySelector("h2")!);
          return {
            columns: style.gridTemplateColumns,
            gap: style.columnGap,
            padding: style.padding,
            titleSize: title.fontSize,
            titleWeight: title.fontWeight,
          };
        })
      );
      await row.hover();
      await expect
        .poll(() => row.evaluate((element) => getComputedStyle(element).backgroundColor))
        .not.toBe("rgba(0, 0, 0, 0)");
      if (route === "/blog") await expect(row).toHaveScreenshot(`article-hover-${width}.png`);
      await row.focus();
      await expect(row).toBeFocused();
      expect(
        await row.evaluate((element) => parseFloat(getComputedStyle(element).outlineWidth))
      ).toBeGreaterThanOrEqual(2);
      if (route === "/blog") await expect(row).toHaveScreenshot(`article-focus-${width}.png`);
    }
    expect(styles[0]).toEqual(styles[1]);
    await expect(page.getByText("Latest essay", { exact: true })).toHaveCount(0);
    for (const [index, post] of posts.entries()) {
      const row = page.locator("main .zr-linked-record").nth(index);
      await expect(row).toHaveAttribute("href", `/blog/${post.slug}`);
      await expect(row.locator("time")).toHaveAttribute("datetime", post.date);
      await expect(row).toContainText(post.description);
      for (const tag of post.tags) await expect(row).toContainText(tag);
    }
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(new RegExp(`/blog/${posts[0].slug}$`));
    await page.goBack();
    await expect(page).toHaveURL(/\/blog$/);
  }
});

test("Udemy courses show shared reach, official covers, details, and release order", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator("#index").getByRole("link", { name: "Teaching on Udemy" }).click();
  await expect(page).toHaveURL(/\/projects\/udemy-courses$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Udemy Courses");
  const reach = page.locator('dl[aria-label="Combined course reach"]');
  await expect(reach.locator("dd")).toHaveText(["22,500+", "150", "Over 3,000"]);
  const section = page.getByRole("region", { name: "The courses", exact: true });
  const entries = section
    .getByRole("listitem")
    .filter({ has: page.getByRole("heading", { level: 3 }) });
  await expect(entries).toHaveCount(3);
  for (const [index, course] of teachingCourses.entries()) {
    const entry = entries.nth(index);
    await expect(entry.getByRole("heading", { level: 3 })).toHaveText(course.title);
    await expect(entry.locator("time")).toHaveAttribute("datetime", course.releaseDate);
    await expect(entry).toContainText(course.description);
    await expect(entry).toContainText(course.duration);
    await expect(
      entry.getByRole("link", { name: `View ${course.title} on Udemy`, exact: true })
    ).toHaveAttribute("href", course.url);
    const image = entry.getByRole("img", { name: `${course.title} course cover`, exact: true });
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() => image.evaluate((element) => (element as HTMLImageElement).naturalWidth), {
        timeout: 20_000,
      })
      .toBeGreaterThan(0);
    expect(
      await image.evaluate((element) =>
        new URL((element as HTMLImageElement).currentSrc).searchParams.get("url")
      )
    ).toBe(course.image);
  }
  await expect(section.locator("time")).toHaveText([
    "Released January 2020",
    "Released July 2021",
    "Released February 2024",
  ]);
  await expect(page.getByRole("heading", { name: "Capabilities", exact: true })).toHaveCount(0);
  await page.getByRole("link", { name: "All projects", exact: true }).click();
  await expect(page.locator("main .zr-linked-record").last()).toHaveAccessibleName("Udemy Courses");
  await expect(page.locator("main .zr-linked-record").last().locator("time")).toHaveText(
    "2020–2024"
  );
  await page.goto("/about");
  await expect(page.getByRole("link", { name: "three courses on Udemy" })).toHaveAttribute(
    "href",
    "/projects/udemy-courses"
  );
  await expect(page.locator("main")).toContainText("22,500+ students across 150 countries");
  await expect(page.locator("main")).toContainText("over 3,000 reviews");
  await expect(page.locator("main")).not.toContainText("20,000");
  await expect(page.locator("main")).not.toContainText("145 countries");
});

test("Udemy course links and descriptions survive unavailable cover images", async ({ page }) => {
  await page.route("**/_next/image?**", (route) => route.abort());
  await page.goto("/projects/udemy-courses");
  for (const course of teachingCourses) {
    const cover = page.getByRole("img", {
      name: `${course.title} course cover (image unavailable)`,
      exact: true,
    });
    await page.getByRole("heading", { name: course.title, exact: true }).scrollIntoViewIfNeeded();
    await expect(cover).toBeVisible();
    await expect(
      page.getByRole("link", { name: `View ${course.title} on Udemy`, exact: true })
    ).toBeVisible();
  }
});

test("Study omits the historic streak and all Khan Academy start dates", async ({ page }) => {
  await page.goto("/study");
  const main = page.locator("main");
  await expect(main).not.toContainText("streak");
  await expect(main).not.toContainText("Started");
  await expect(main).not.toContainText("March 12, 2025");
  for (const course of courses) {
    await expect(page.getByRole("heading", { name: course.title, exact: true })).toBeVisible();
    await expect(
      page.getByRole("progressbar", { name: `${course.title}: last noted mastery` })
    ).toHaveAttribute("aria-valuenow", String(course.mastery));
  }
});

test("Reading includes the four requested books with Goodreads destinations and loaded thumbnails", async ({
  page,
}) => {
  await page.goto("/reading");
  const completed = page.getByRole("region", { name: "Completed", exact: true });
  for (const book of completedBooks.slice(0, 4)) {
    const link = completed.getByRole("link", { name: book.title, exact: true });
    await expect(link).toHaveAttribute("href", book.url!);
    await expect(link).toHaveAttribute("target", "_blank");
    const entry = completed
      .getByRole("listitem")
      .filter({ has: page.getByRole("link", { name: book.title, exact: true }) });
    await expect(entry).toContainText(book.author);
    await expect(entry.locator("time")).toHaveCount(0);
    const cover = entry.getByRole("img", { name: `${book.title} cover`, exact: true });
    await cover.scrollIntoViewIfNeeded();
    await expect
      .poll(() => cover.evaluate((element) => (element as HTMLImageElement).naturalWidth), {
        timeout: 20_000,
      })
      .toBeGreaterThan(0);
    expect(
      await cover.evaluate((element) =>
        new URL((element as HTMLImageElement).currentSrc).searchParams.get("url")
      )
    ).toBe(book.coverImage);
  }
});

test("Kokoro Pi displays the original README banner and both projects retain their workflow stages", async ({
  page,
}) => {
  await page.goto("/projects/kokoro-pi");
  const banner = page.getByRole("img", { name: /^Kokoro Pi README banner:/ });
  await expect(banner).toBeVisible();
  await expect
    .poll(() => banner.evaluate((image) => (image as HTMLImageElement).naturalWidth), {
      timeout: 20_000,
    })
    .toBeGreaterThan(0);
  const image = await banner.evaluate((element) => {
    const image = element as HTMLImageElement;
    return {
      source: new URL(image.currentSrc).searchParams.get("url"),
      ratio: image.naturalWidth / image.naturalHeight,
      fit: getComputedStyle(image).objectFit,
    };
  });
  expect(image.source).toBe(
    "https://raw.githubusercontent.com/zreecespieces/kokoro-pi/main/docs/banner.png"
  );
  expect(image.ratio).toBeCloseTo(1280 / 420, 1);
  expect(image.fit).toBe("contain");
  await expect(
    page.getByText(
      "Original README banner; benchmark figures reflect the repository's test setups."
    )
  ).toBeVisible();
  const speech = page.getByRole("figure", {
    name: "Kokoro Pi speech workflow",
    exact: true,
  });
  await expect(speech.locator('svg[aria-hidden="true"]')).toHaveCount(3);
  await expect(speech.locator("figcaption")).toHaveCount(0);
  await expect(page.getByText("Illustrated workflow, not a recorded waveform.")).toHaveCount(0);
  for (const label of ["Text input", "Speech on the Pi", "Streaming audio"]) {
    await expect(speech.getByText(label, { exact: true })).toBeVisible();
  }
  await expect(speech.locator("animate, animateTransform")).toHaveCount(0);
  await page.goto("/projects/instant-perler-pattern");
  const pattern = page.getByRole("figure", {
    name: "Illustrated workflow, not a product screenshot.",
    exact: true,
  });
  for (const label of ["Source image", "Editable pixel grid", "Bead pattern"]) {
    await expect(pattern.getByText(label, { exact: true })).toBeVisible();
  }
  await expect(pattern.locator('svg[aria-hidden="true"]')).toHaveCount(3);
  await expect(page.getByRole("img", { name: /^Kokoro Pi README banner:/ })).toHaveCount(0);
});

test("Kokoro Pi remains readable if the remote README banner is unavailable", async ({ page }) => {
  await page.route("**/_next/image?**", (route) => route.abort());
  await page.goto("/projects/kokoro-pi");
  await expect(
    page.getByRole("img", { name: /Kokoro Pi README banner:.*image unavailable/i })
  ).toBeVisible();
  await expect(page.getByText("Streaming audio", { exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Hear the samples", exact: true })).toBeVisible();
});

test("@visual Kokoro Pi speech workflow at mobile and desktop widths", async ({ page }) => {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/projects/kokoro-pi");
    const workflow = page.getByRole("figure", {
      name: "Kokoro Pi speech workflow",
      exact: true,
    });
    await workflow.scrollIntoViewIfNeeded();
    await expect(workflow).toHaveScreenshot(`kokoro-speech-workflow-${width}.png`);
  }
});

test("Travel restores the historical flag-and-name carousel at every width and keeps selected countries visible", async ({
  page,
}) => {
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/travel");
    const carousel = page.getByRole("tablist", { name: "Countries visited" });
    await expect(page.getByRole("combobox", { name: "Countries visited" })).toHaveCount(0);
    await expect(carousel.getByRole("tab")).toHaveCount(countries.length);
    await expect(carousel.getByRole("tab", { name: "United States", exact: true })).toHaveAttribute(
      "aria-selected",
      "true"
    );
    for (const [index, country] of countries.entries()) {
      await expect(carousel.getByRole("tab").nth(index)).toHaveAccessibleName(country.name);
      await expect(carousel.getByRole("tab").nth(index).locator(".zr-country-flag")).toHaveText(
        country.flag
      );
    }
    await carousel.getByRole("tab", { name: "Bosnia and Herzegovina", exact: true }).click();
    await expect(page).toHaveURL(/country=bosnia-and-herzegovina/);
    await expect(
      page.getByRole("tabpanel", { name: "Bosnia and Herzegovina", exact: true })
    ).toBeVisible();
    const selected = carousel.getByRole("tab", { name: "Bosnia and Herzegovina", exact: true });
    await expect
      .poll(async () => {
        const bounds = await page.locator(".MuiTabs-scroller").boundingBox();
        const active = await selected.boundingBox();
        return (
          active!.x >= bounds!.x - 1 && active!.x + active!.width <= bounds!.x + bounds!.width + 1
        );
      })
      .toBe(true);
    await page.setViewportSize({ width: width === 1440 ? 390 : 1440, height: 1000 });
    await expect(selected).toHaveAttribute("aria-selected", "true");
    await expect(
      page.getByRole("tabpanel", { name: "Bosnia and Herzegovina", exact: true })
    ).toBeVisible();
  }
});

test("Travel country carousel supports scroll controls, keyboard exploration, and browser history", async ({
  page,
}) => {
  const last = countries.at(-1)!.name;
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/travel");
    const carousel = page.getByRole("tablist", { name: "Countries visited" });
    const scroller = page.locator(".MuiTabs-scroller");
    const initialScroll = await scroller.evaluate((element) => element.scrollLeft);
    await page.getByRole("button", { name: "Scroll countries right", exact: true }).click();
    await expect
      .poll(() => scroller.evaluate((element) => element.scrollLeft))
      .toBeGreaterThan(initialScroll);
    await expect(carousel.getByRole("tab", { name: "United States", exact: true })).toHaveAttribute(
      "aria-selected",
      "true"
    );
    await expect(
      page.getByRole("button", { name: "Scroll countries left", exact: true })
    ).toBeEnabled();
    await page.getByRole("button", { name: "Scroll countries left", exact: true }).click();
    await carousel.getByRole("tab", { name: "United States", exact: true }).focus();
    await page.keyboard.press("ArrowRight");
    await page.keyboard.press("Enter");
    await expect(page.getByRole("tabpanel", { name: "Mexico", exact: true })).toBeVisible();
    await page.keyboard.press("End");
    await page.keyboard.press("Enter");
    await expect(page.getByRole("tabpanel", { name: last, exact: true })).toBeVisible();
    await page.goBack();
    await expect(page.getByRole("tabpanel", { name: "Mexico", exact: true })).toBeVisible();
    await page.goForward();
    await expect(page.getByRole("tabpanel", { name: last, exact: true })).toBeVisible();
    await carousel.getByRole("tab", { name: last, exact: true }).focus();
    await page.keyboard.press("Home");
    await page.keyboard.press("Enter");
    await expect(page.getByRole("tabpanel", { name: "United States", exact: true })).toBeVisible();
  }
});

test("Travel includes Arizona and Minnesota once in the visited list, shades both states, and counts DC separately", async ({
  page,
}) => {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/travel?country=united-states");
    await expect(page.locator("main")).toContainText("25 US states + DC");
    const states = page.getByRole("region", { name: "States visited", exact: true });
    const list = states.getByRole("list", { name: "Visited states and district" });
    await expect(list.getByRole("listitem").filter({ hasText: /^Arizona$/ })).toHaveCount(1);
    await expect(list.getByRole("listitem").filter({ hasText: /^Minnesota$/ })).toHaveCount(1);
    await expect(list.getByRole("listitem")).toHaveCount(26);
    const names = await list.getByRole("listitem").allTextContents();
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b, "en-US")));
    const visitedFill = await states.locator('path[data-name="CO"]').getAttribute("fill");
    expect(visitedFill).toBeTruthy();
    await expect(states.locator('path[data-name="AZ"]')).toHaveAttribute("fill", visitedFill!);
    await expect(states.locator('path[data-name="MN"]')).toHaveAttribute("fill", visitedFill!);
    await expect(states.locator('path[data-name="NM"]')).not.toHaveAttribute("fill", visitedFill!);
  }
});

test("Travel country carousel stays usable during normal-motion scrolling and repeated selection", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 390, height: 1000 });
  await page.goto("/travel");
  await page.getByRole("button", { name: "Scroll countries right", exact: true }).click();
  await page.locator(".MuiTabs-root").screenshot({
    path: test.info().outputPath("travel-country-carousel-motion.png"),
  });
  for (const name of ["Bosnia and Herzegovina", "Mexico", "United States"]) {
    await page.getByRole("tab", { name, exact: true }).click();
    await expect(page.getByRole("tabpanel", { name, exact: true })).toBeVisible();
  }
  await expect(page.getByRole("tabpanel")).toHaveCount(1);
  await expect(page.getByRole("tab", { name: "United States", exact: true })).toHaveAttribute(
    "aria-selected",
    "true"
  );
  await expect
    .poll(async () => {
      const bounds = await page.locator(".MuiTabs-scroller").boundingBox();
      const active = await page
        .getByRole("tab", { name: "United States", exact: true })
        .boundingBox();
      return (
        active!.x >= bounds!.x - 1 && active!.x + active!.width <= bounds!.x + bounds!.width + 1
      );
    })
    .toBe(true);
});

test("@visual Travel country carousel long labels and keyboard focus at touch and desktop widths", async ({
  page,
}) => {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/travel?country=bosnia-and-herzegovina");
    const selected = page.getByRole("tab", { name: "Bosnia and Herzegovina", exact: true });
    await expect(selected).toHaveAttribute("aria-selected", "true");
    await expect
      .poll(async () => {
        const bounds = await page.locator(".MuiTabs-scroller").boundingBox();
        const active = await selected.boundingBox();
        return (
          active!.x >= bounds!.x - 1 && active!.x + active!.width <= bounds!.x + bounds!.width + 1
        );
      })
      .toBe(true);
    // Real keyboard input establishes focus-visible independently of prior pointer use.
    await page.keyboard.press("Tab");
    await selected.focus();
    await expect(selected).toBeFocused();
    await expect
      .poll(() =>
        selected.evaluate((element) => parseFloat(getComputedStyle(element).outlineWidth))
      )
      .toBeGreaterThanOrEqual(2);
    await expect(page.locator(".MuiTabs-root")).toHaveScreenshot(
      `travel-country-carousel-focus-${width}.png`
    );
  }
});

test("Colorado home history shows a live day count beneath Present without changing days abroad", async ({
  page,
}) => {
  await page.clock.install({ time: new Date("2026-10-12T23:59:30Z") });
  for (const width of [390, 1440]) {
    await page.clock.setSystemTime(new Date("2026-10-12T23:59:30Z"));
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/travel?country=united-states");
    const history = page.getByRole("region", { name: "Home history", exact: true });
    const colorado = history.getByRole("listitem").filter({ hasText: "Moved to Denver, Colorado" });
    await expect(colorado).toContainText("August 20, 2024 to Present");
    await expect(colorado).toContainText("783 days");
    await expect(history.getByRole("listitem")).toHaveCount(3);
    await expect(page.locator("main")).toContainText(`${getTotalDaysSpent()} days abroad`);
    await page.clock.fastForward(60_000);
    await expect(colorado).toContainText("784 days");
    await expect(page.locator("main")).toContainText(`${getTotalDaysSpent()} days abroad`);
  }
});

test("mobile archive pickers expose all options and preserve selection through resize", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const [route, control, value, label] of [
    ["/hikes", "Hike locations", "colorado", "Colorado"],
    ["/music-festivals", "Festival years", "2025", "2025"],
  ]) {
    await page.goto(route);
    const picker = page.getByRole("combobox", { name: control });
    await expect(picker).toBeVisible();
    await picker.focus();
    await picker.selectOption(value);
    await expect(picker).toBeFocused();
    await page.setViewportSize({ width: 1440, height: 1000 });
    if (await picker.isVisible()) await expect(picker).toHaveValue(value);
    else
      await expect(page.getByRole("tab", { name: label, exact: true })).toHaveAttribute(
        "aria-selected",
        "true"
      );
    await page.setViewportSize({ width: 390, height: 844 });
    await expect(picker).toHaveValue(value);
    expect(
      (await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze()).violations
    ).toEqual([]);
  }
});

test("invalid archive URLs recover to an available collection", async ({ page }) => {
  for (const [route, control] of [["/music-festivals?year=missing", "Festival years"]]) {
    await page.goto(route);
    await expect(page.getByRole("combobox", { name: control })).not.toHaveValue("missing");
    await expect(
      page.locator('main [role="region"]:visible, main [role="tabpanel"]:visible')
    ).toHaveCount(1);
  }
  await page.goto("/travel?country=missing");
  await expect(page.getByRole("tab", { name: "United States", exact: true })).toHaveAttribute(
    "aria-selected",
    "true"
  );
  await expect(page.getByRole("tabpanel", { name: "United States", exact: true })).toBeVisible();
  await page.goto("/comedy?comedian=missing");
  await expect(
    page.getByRole("tab", { name: getMostRecentlySeenComedian()!.name, exact: true })
  ).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toHaveCount(1);
});

test("Comedy orders the portrait carousel by latest attended show at every width and defaults to the most recent", async ({
  page,
}) => {
  const latest = getMostRecentlySeenComedian()!;
  const ordered = getComediansByLatestSeen();
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/comedy");
    const carousel = page.getByRole("tablist", { name: "Comedians and live series" });
    await expect(carousel.getByRole("tab")).toHaveCount(ordered.length);
    await expect(page.getByRole("combobox", { name: "Comedians and live series" })).toHaveCount(0);
    const selected = carousel.getByRole("tab", { name: latest.name, exact: true });
    await expect(selected).toHaveAttribute("aria-selected", "true");
    await expect(page.getByRole("tabpanel", { name: latest.name, exact: true })).toBeVisible();
    await expect(page.getByRole("tabpanel").getByRole("heading", { level: 2 })).toHaveText(
      "Mark Normand"
    );
    await expect(
      page.getByRole("tabpanel").locator('time[datetime^="202"]').first()
    ).toHaveAttribute("datetime", "2026-10-03");
    await expect
      .poll(async () => {
        const bounds = await page.locator(".MuiTabs-scroller").boundingBox();
        const active = await selected.boundingBox();
        return (
          active!.x >= bounds!.x - 1 && active!.x + active!.width <= bounds!.x + bounds!.width + 1
        );
      })
      .toBe(true);
    for (const [index, comedian] of ordered.entries()) {
      await expect(carousel.getByRole("tab").nth(index)).toHaveAccessibleName(comedian.name);
      await expect(
        carousel.getByRole("tab").nth(index).locator(".zr-comedian-portrait [data-content-image]")
      ).toHaveCount(1);
    }
    await carousel.getByRole("tab", { name: "Adam Ray", exact: true }).click();
    await expect(page).toHaveURL(/comedian=adam-ray/);
    const panel = page.getByRole("tabpanel", { name: "Adam Ray", exact: true });
    await expect(panel).toBeVisible();
    await expect(panel.getByRole("listitem")).toHaveCount(4);
    await expect(panel.locator("time").first()).toHaveAttribute("datetime", "2026-04-18");
    await page.setViewportSize({ width: width === 1440 ? 390 : 1440, height: 1000 });
    await expect(carousel.getByRole("tab", { name: "Adam Ray", exact: true })).toHaveAttribute(
      "aria-selected",
      "true"
    );
    await expect(panel).toBeVisible();
  }
});

test("Comedy carousel supports keyboard selection, scrolling, and URL history", async ({
  page,
}) => {
  const latest = getMostRecentlySeenComedian()!.name;
  const ordered = getComediansByLatestSeen();
  const first = ordered[0].name;
  const second = ordered[1].name;
  const last = ordered.at(-1)!.name;
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/comedy");
    const carousel = page.getByRole("tablist", { name: "Comedians and live series" });
    const right = page.getByRole("button", { name: "Scroll comedians right", exact: true });
    await expect(right).toBeEnabled();
    const scroller = page.locator(".MuiTabs-scroller");
    const initialScroll = await scroller.evaluate((element) => element.scrollLeft);
    await right.click();
    await expect
      .poll(() => scroller.evaluate((element) => element.scrollLeft))
      .toBeGreaterThan(initialScroll);
    await expect(carousel.getByRole("tab", { name: latest, exact: true })).toHaveAttribute(
      "aria-selected",
      "true"
    );
    await carousel.getByRole("tab", { name: latest, exact: true }).focus();
    await page.keyboard.press("Home");
    await expect(carousel.getByRole("tab", { name: first, exact: true })).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("tabpanel", { name: first, exact: true })).toBeVisible();
    await page.keyboard.press("ArrowRight");
    await page.keyboard.press("Enter");
    await expect(carousel.getByRole("tab", { name: second, exact: true })).toHaveAttribute(
      "aria-selected",
      "true"
    );
    await page.keyboard.press("End");
    await page.keyboard.press("Enter");
    await expect(page.getByRole("tabpanel", { name: last, exact: true })).toBeVisible();
    await expect(page.getByRole("tabpanel", { name: last, exact: true })).toContainText(
      "This was my first real exposure to stand up comedy."
    );
    await page.goBack();
    await expect(page.getByRole("tabpanel", { name: second, exact: true })).toBeVisible();
    await page.goForward();
    await expect(page.getByRole("tabpanel", { name: last, exact: true })).toBeVisible();
    expect(
      (await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze())
        .violations
    ).toEqual([]);
  }
});

test("Comedy carousel portraits load and unavailable portraits keep selectable names", async ({
  page,
}) => {
  await page.goto("/comedy");
  for (const comedian of getComediansByLatestSeen()) {
    const tab = page.getByRole("tab", { name: comedian.name, exact: true });
    await tab.scrollIntoViewIfNeeded();
    await expect
      .poll(
        () => tab.locator("img").evaluate((image) => (image as HTMLImageElement).naturalWidth),
        { timeout: 20_000 }
      )
      .toBeGreaterThan(0);
  }
  await page.route("**/_next/image?**", (route) => route.abort());
  await page.goto("/comedy?comedian=adam-ray");
  const adam = page.getByRole("tab", { name: "Adam Ray", exact: true });
  await expect(adam.locator('[data-content-image] [role="img"]')).toHaveCount(1);
  await expect(adam).toHaveAttribute("aria-selected", "true");
  await page.getByRole("tab", { name: "Tom Segura", exact: true }).click();
  await expect(page.getByRole("tabpanel", { name: "Tom Segura", exact: true })).toBeVisible();
});

test("new comedy screenshot shows preserve dates, start times, venues, addresses, and the rescheduling note", async ({
  page,
}) => {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/comedy");
    await expect(page.locator("main")).toContainText("22 shows");
    await expect(page.locator("main")).toContainText("17 comedians and live series");
    for (const [name, date, time, venue, address] of [
      [
        "Bryan Callen",
        "2026-03-07",
        "7:00 PM",
        "Comedy Works Downtown (Larimer Square)",
        "1226 15th St",
      ],
      ["Duncan Trussell", "2026-03-27", "9:45 PM", "Comedy Works Downtown (Larimer Square)", ""],
      ["Adam Ray", "2026-04-18", "7:00 PM", "Paramount Theatre", "1621 Glenarm St"],
      ["James McCann", "2026-05-29", "7:15 PM", "Comedy Works Downtown (Larimer Square)", ""],
      [
        "Jeremiah Watkins",
        "2026-06-05",
        "7:15 PM",
        "Comedy Works South (The Landmark DTC)",
        "5345 Landmark Place",
      ],
      ["Timmy No Brakes", "2026-07-30", "7:00 PM", "Comedy Works Downtown (Larimer Square)", ""],
      ["Mark Normand", "2026-10-03", "9:15 PM", "Comedy Works Downtown (Larimer Square)", ""],
    ]) {
      await page.getByRole("tab", { name, exact: true }).click();
      const panel = page.getByRole("tabpanel", { name, exact: true });
      const entry = panel
        .getByRole("listitem")
        .filter({ has: page.locator(`time[datetime="${date}"]`) });
      await expect(entry).toBeVisible();
      await expect(entry).toContainText(time);
      await expect(entry).toContainText(venue);
      if (address) await expect(entry).toContainText(address);
      if (name === "Duncan Trussell")
        await expect(entry).toContainText("Showtime moved from 7:30 PM to 9:45 PM the same night.");
      if (name === "Adam Ray")
        await expect(entry.getByRole("heading", { level: 3 })).toHaveText("WHO IS ME Tour");
      const portrait = panel.getByRole("img", { name, exact: true });
      await portrait.scrollIntoViewIfNeeded();
      await expect
        .poll(() => portrait.evaluate((image) => (image as HTMLImageElement).naturalWidth))
        .toBeGreaterThan(0);
      const dates = await panel
        .locator('time[datetime^="202"]')
        .evaluateAll((elements) => elements.map((element) => element.getAttribute("datetime")));
      expect(dates).toEqual([...dates].sort().reverse());
    }
  }
});

test("Ari Matti keeps the attended 2025 show but omits the missed April 2026 show", async ({
  page,
}) => {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/comedy?comedian=ari-matti");
    const panel = page.getByRole("tabpanel", { name: "Ari Matti", exact: true });
    await expect(panel).toBeVisible();
    await expect(panel.getByRole("listitem")).toHaveCount(1);
    await expect(panel.locator("time")).toHaveAttribute("datetime", "2025-02-07");
    await expect(page.locator('time[datetime="2026-04-25"]')).toHaveCount(0);
    await expect(page.locator("main")).toContainText("22 shows");
    await expect(page.locator("main")).toContainText("17 comedians and live series");
  }
});

test("skip link and internal navigation work with the keyboard", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main-content$/);
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Writing" })
    .click();
  await expect(page).toHaveURL(/\/blog$/);
  await expect(page.getByRole("link", { name: "Writing", exact: true })).toHaveAttribute(
    "aria-current",
    "page"
  );
});

test("art lightbox preserves image context and keyboard focus", async ({ page }) => {
  await page.goto("/art");
  const trigger = page.locator("main button").first();
  await trigger.focus();
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("button", { name: /close/i })).toBeVisible();
  expect(
    (
      await new AxeBuilder({ page })
        .include('[role="dialog"]')
        .withTags(["wcag2a", "wcag2aa"])
        .analyze()
    ).violations
  ).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

test("compact desktop archive tabs support arrow keys", async ({ page }) => {
  await page.goto("/hikes");
  const tabs = page.getByRole("tab");
  await tabs.first().focus();
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("Enter");
  await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
  const panelId = await tabs.nth(1).getAttribute("aria-controls");
  await expect(page.locator(`[id="${panelId}"]`)).toBeVisible();
});

test("broken archive images get a useful fallback", async ({ page }) => {
  await page.route("**/_next/image?**", (route) => route.abort());
  await page.goto("/reading");
  await expect(page.getByRole("img", { name: /image unavailable/i }).first()).toBeVisible();
});

test("archive deep links and browser history preserve selection", async ({ page }) => {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const [route, parameter, value, label, control, otherValue, otherLabel] of [
      [
        "/travel",
        "country",
        "mexico",
        "Mexico",
        "Countries visited",
        "united-states",
        "United States",
      ],
      ["/hikes", "location", "colorado", "Colorado", "Hike locations", "california", "California"],
      [
        "/comedy",
        "comedian",
        "adam-ray",
        "Adam Ray",
        "Comedians and live series",
        "tom-segura",
        "Tom Segura",
      ],
      ["/music-festivals", "year", "2025", "2025", "Festival years", "all", "All years"],
    ]) {
      await page.goto(`${route}?${parameter}=${value}&source=test#main-content`);
      const selected = page.getByRole("combobox", { name: control });
      if (await selected.isVisible()) await expect(selected).toHaveValue(value);
      else
        await expect(page.getByRole("tab", { name: label, exact: true })).toHaveAttribute(
          "aria-selected",
          "true"
        );
      await selectArchive(page, control, otherValue, otherLabel);
      await expect(page).toHaveURL(/source=test/);
      await expect(page).toHaveURL(/#main-content$/);
      await page.goBack();
      await expect(page).toHaveURL(new RegExp(`${parameter}=${value}`));
      await page.goForward();
      await expect(page).toHaveURL(new RegExp(`${parameter}=${otherValue}`));
      if (await selected.isVisible()) await expect(selected).toHaveValue(otherValue);
      else
        await expect(page.getByRole("tab", { name: otherLabel, exact: true })).toHaveAttribute(
          "aria-selected",
          "true"
        );
      await page.goBack();
      await page.reload();
      if (await selected.isVisible()) await expect(selected).toHaveValue(value);
      else
        await expect(page.getByRole("tab", { name: label, exact: true })).toHaveAttribute(
          "aria-selected",
          "true"
        );
    }
  }
});

test("archive image dialogs stay concise and restore focus at touch width", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const [route, control, value] of [
    ["/travel?country=mexico", "Countries visited", "mexico"],
    ["/hikes?location=colorado", "Hike locations", "colorado"],
    ["/comedy?comedian=adam-ray", "Comedians and live series", "adam-ray"],
    ["/music-festivals?year=2025", "Festival years", "2025"],
  ]) {
    await page.goto(route);
    const picker = page.getByRole("combobox", { name: control });
    if (await picker.isVisible()) await expect(picker).toHaveValue(value);
    else
      await expect(
        page.getByRole("tab", { name: value === "mexico" ? "Mexico" : "Adam Ray", exact: true })
      ).toHaveAttribute("aria-selected", "true");
    const trigger = route.startsWith("/comedy")
      ? page.getByRole("button", { name: "Enlarge Adam Ray portrait", exact: true })
      : route.startsWith("/travel")
        ? page.getByRole("button", { name: "Enlarge Mexico image", exact: true })
        : page.locator("main button:visible").first();
    await trigger.focus();
    await page.keyboard.press("Enter");
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("heading")).toHaveCount(1);
    expect(await dialog.locator("p").count()).toBeLessThanOrEqual(1);
    await expect(dialog.getByRole("link")).toHaveCount(0);
    await page.keyboard.press("Tab");
    expect(await dialog.evaluate((element) => element.contains(document.activeElement))).toBe(true);
    await page.getByRole("button", { name: "Close image", exact: true }).click();
    await expect(dialog).toHaveCount(0);
    await expect(trigger).toBeFocused();
  }
});

test("home section shortcuts move keyboard focus into their content", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Take a look around" }).click();
  await expect(page.locator("#index")).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(page.locator("#index a").first()).toBeFocused();
  await page.goto("/blog/gpt-5-5-vs-opus-4-7");
  await page.getByRole("link", { name: "Explore more", exact: true }).click();
  await expect(page.locator("#index")).toBeFocused();
});

test("reduced-motion home is static and unknown routes are useful", async ({ page }) => {
  await page.goto("/");
  expect(
    await page.evaluate(
      () => document.getAnimations().filter((animation) => animation.playState === "running").length
    )
  ).toBe(0);
  await expect(page.locator("main animate, main animateTransform")).toHaveCount(0);
  const response = await page.goto("/a-page-that-does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Nothing at this address.");
});

test("public metadata and social image are complete", async ({ page, request }) => {
  await page.goto("/blog/gpt-5-5-vs-opus-4-7");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://zacharyreece.dev/blog/gpt-5-5-vs-opus-4-7"
  );
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute("content", "article");
  const image = await request.get("/opengraph-image");
  expect(image.status()).toBe(200);
  expect(image.headers()["content-type"]).toContain("image/png");
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).not.toContain("/preview");
});

for (const width of [390, 1440]) {
  for (const route of [
    ...routes,
    "/a-page-that-does-not-exist",
    "/travel?country=mexico",
    "/hikes?location=colorado",
    "/comedy?comedian=adam-ray",
    "/music-festivals?year=2025",
  ]) {
    test(`@visual ${route} at ${width}px`, async ({ page }) => {
      test.setTimeout(180_000);
      if (route.startsWith("/travel"))
        await page.clock.setFixedTime(new Date("2026-10-12T12:00:00Z"));
      await page.setViewportSize({ width, height: 1000 });
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      await expect(page.getByRole("navigation", { name: "Main navigation" })).toBeVisible();
      await expect(page.locator("main")).toBeVisible();
      await settlePageImages(page);
      await page.addStyleTag({ content: "nextjs-portal { display: none !important; }" });
      await expect(page).toHaveScreenshot(
        `${route === "/" ? "home" : route.replaceAll(/[^a-z0-9-]/g, "-")}-${width}.png`,
        {
          fullPage: true,
          animations: "disabled",
        }
      );
    });
  }

  test(`@visual newsletter and image dialogs at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.route("**/api/subscribe", (route) =>
      route.fulfill({ status: 500, json: { success: false, message: "Please try again later." } })
    );
    await page.goto("/");
    await page.getByRole("button", { name: "Subscribe to the newsletter" }).click();
    await page.getByLabel("Email Address").fill("reader@example.com");
    await page.getByRole("button", { name: "Subscribe", exact: true }).click();
    await expect(page.getByRole("alert")).toBeVisible();
    await expect(page.getByRole("dialog")).toHaveScreenshot(`newsletter-error-${width}.png`);
    expect(
      (
        await new AxeBuilder({ page })
          .include('[role="dialog"]')
          .withTags(["wcag2a", "wcag2aa"])
          .analyze()
      ).violations
    ).toEqual([]);
    await page.route("**/api/subscribe", (route) =>
      route.fulfill({ json: { success: true, message: "Thanks for subscribing." } })
    );
    await page.getByRole("button", { name: "Subscribe", exact: true }).click();
    await expect(page.getByRole("button", { name: "Done", exact: true })).toBeFocused();
    await expect(page.getByRole("dialog")).toHaveScreenshot(`newsletter-success-${width}.png`);
    await page.getByRole("button", { name: "Done", exact: true }).click();
    await page.goto("/art");
    await page.locator("main button").first().click();
    await expect(page.getByRole("dialog")).toHaveScreenshot(`image-dialog-${width}.png`);
  });
}
