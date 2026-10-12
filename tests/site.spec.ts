import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = [
  "/",
  "/projects",
  "/about",
  "/blog",
  "/blog/gpt-5-5-vs-opus-4-7",
  "/reading",
  "/study",
  "/hikes",
  "/travel",
  "/music-festivals",
  "/comedy",
  "/art",
];

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
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(results.violations).toEqual([]);
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
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(
    page.getByRole("alert").filter({ hasText: "Thanks for subscribing." })
  ).toBeVisible();
});

test("home remains navigable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3100/");
  await expect(page.locator("#index")).toBeVisible();
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Projects" })
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Instant Perler Pattern");
  await context.close();
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

test("archive tabs expose the selected panel and support arrow keys", async ({ page }) => {
  for (const route of ["/hikes", "/travel", "/comedy"]) {
    await page.goto(route);
    const tabs = page.getByRole("tab");
    await tabs.first().focus();
    await page.keyboard.press("ArrowRight");
    await page.keyboard.press("Enter");
    await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
    const panelId = await tabs.nth(1).getAttribute("aria-controls");
    await expect(page.locator(`[id="${panelId}"]`)).toBeVisible();
  }
});

test("broken archive images get a useful fallback", async ({ page }) => {
  await page.route("**/_next/image?**", (route) => route.abort());
  await page.goto("/reading");
  await expect(page.getByRole("img", { name: /image unavailable/i }).first()).toBeVisible();
});

test("archive deep links and browser history preserve selection", async ({ page }) => {
  for (const [route, parameter, value, label] of [
    ["/travel", "country", "mexico", "Mexico"],
    ["/hikes", "location", "colorado", "Colorado"],
    ["/comedy", "comedian", "adam-ray", "Adam Ray"],
    ["/music-festivals", "year", "2025", "2025"],
  ]) {
    await page.goto(`${route}?${parameter}=${value}&source=test#main-content`);
    const selected = page.getByRole("tab", { name: label, exact: true });
    await expect(selected).toHaveAttribute("aria-selected", "true");
    const other = page.getByRole("tab").first();
    if ((await other.getAttribute("aria-selected")) === "true") {
      await page.getByRole("tab").nth(1).click();
    } else {
      await other.click();
    }
    await expect(page).toHaveURL(/source=test/);
    await expect(page).toHaveURL(/#main-content$/);
    await page.goBack();
    await expect(selected).toHaveAttribute("aria-selected", "true");
    await page.reload();
    await expect(selected).toHaveAttribute("aria-selected", "true");
  }
});

test("home section shortcuts move keyboard focus into their content", async ({ page }) => {
  await page.goto("/about");
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Index", exact: true })
    .click();
  await expect(page.locator("#index")).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(page.locator("#index a").first()).toBeFocused();
  await page.goto("/");
  await page.getByRole("link", { name: "Explore my work" }).click();
  await expect(page.locator("#selected-work")).toBeFocused();
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
  for (const route of ["/", "/projects", "/blog/gpt-5-5-vs-opus-4-7"]) {
    test(`@visual ${route} at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator("main")).toBeVisible();
      await page.addStyleTag({ content: "nextjs-portal { display: none !important; }" });
      await expect(page).toHaveScreenshot(
        `${route === "/" ? "home" : route.replaceAll("/", "-")}-${width}.png`,
        {
          fullPage: true,
          animations: "disabled",
        }
      );
    });
  }
}
