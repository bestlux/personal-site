import { expect, test } from "@playwright/test";
import axe from "axe-core";

test("Distance opens book pages and restores keyboard focus", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /iomancer/i })).toBeVisible();
  const reading = page.getByRole("link", { name: "Reading 02", exact: true });
  await reading.click();
  await expect(
    page.getByRole("dialog", { name: "Reading", exact: true }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(reading).toBeFocused();
  await reading.click();
  await page
    .getByRole("link", { name: "Finite and Infinite Games James P. Carse" })
    .click();
  await expect(page).toHaveURL(/\/reading\/finite-and-infinite-games$/);
  await expect(
    page.getByRole("heading", {
      name: "Finite and Infinite Games",
      exact: true,
    }),
  ).toBeVisible();
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
  await page.reload();
  await page.getByRole("link", { name: "Back to Reading" }).click();
  await expect(page).toHaveURL(/\/reading$/);
});

test("photograph view and Music navigation work on a phone", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Just the photograph" }).click();
  await expect(
    page.getByRole("navigation", { name: "Personal site" }),
  ).toBeHidden();
  await page.getByRole("button", { name: "Return to iomancer" }).click();
  await page.getByRole("link", { name: "Music 03", exact: true }).click();
  await expect(
    page.getByRole("dialog", { name: "Music", exact: true }),
  ).toBeVisible();
  await expect(page).toHaveURL(/\/$/);
  await expect(
    page.getByRole("heading", { name: "Music", exact: true }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test("panel entrance does not create a transient scrollbar", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 960 });
  await page.goto("/");
  await page.getByRole("link", { name: "Reading 02", exact: true }).click();
  const overflow = await page.getByRole("dialog").evaluate((dialog) => {
    for (const animation of dialog.getAnimations({ subtree: true })) {
      animation.pause();
      animation.currentTime = 200;
    }
    return dialog.scrollHeight > dialog.clientHeight;
  });
  expect(overflow).toBe(false);
  await page.setViewportSize({ width: 390, height: 460 });
  expect(
    await page
      .getByRole("dialog")
      .evaluate((dialog) => dialog.scrollHeight > dialog.clientHeight),
  ).toBe(true);
});

for (const width of [1440, 390]) {
  test(`sections switch in one click at ${width}px without restarting the vignette`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 960 });
    await page.goto("/");
    await page.getByRole("link", { name: "About 01", exact: true }).click();
    const vignette = await page.locator(".distance-vignette").elementHandle();
    for (const [label, title] of [
      ["Reading 02", "Reading"],
      ["Music 03", "Music"],
      ["About 01", "About"],
    ]) {
      const link = page.getByRole("link", { name: label, exact: true });
      await link.click();
      await expect(
        page.getByRole("dialog", { name: title, exact: true }),
      ).toBeVisible();
      await expect(link).toHaveAttribute("aria-current", "true");
      expect(
        await vignette!.evaluate(
          (element) => element === document.querySelector(".distance-vignette"),
        ),
      ).toBe(true);
    }
    await page.getByRole("link", { name: "Reading 02", exact: true }).focus();
    await page.keyboard.press("Enter");
    await expect(
      page.getByRole("dialog", { name: "Reading", exact: true }),
    ).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toBeHidden();
    await expect(
      page.getByRole("link", { name: "Reading 02", exact: true }),
    ).toBeFocused();
    await page.getByRole("link", { name: "Music 03", exact: true }).click();
    await page
      .locator(".distance-vignette")
      .click({ position: { x: width / 2, y: 5 } });
    await expect(page.getByRole("dialog")).toBeHidden();
  });
}

test("unknown book and music URLs return 404", async ({ request }) => {
  expect((await request.get("/reading/not-a-book")).status()).toBe(404);
  expect((await request.get("/music/not-a-song")).status()).toBe(404);
});

test("retired content is unavailable and absent from the sitemap", async ({ request }) => {
  for (const route of ["/resume", "/resume.pdf", "/projects", "/writing", "/now", "/rss.xml"]) {
    expect((await request.get(route)).status(), route).toBe(404);
  }
  const sitemap = await (await request.get("/sitemap.xml")).text();
  for (const route of ["/resume", "/projects", "/writing", "/now"]) {
    expect(sitemap).not.toContain(route);
  }
});

test("no critical or serious axe violations on core routes", async ({
  page,
}) => {
  for (const route of [
    "/",
    "/about",
    "/reading",
    "/reading/finite-and-infinite-games",
    "/music",
  ]) {
    await page.goto(route);
    await page.addScriptTag({ content: axe.source });

    const results = await page.evaluate(async () => {
      const axe = (
        window as typeof window & {
          axe: {
            run: () => Promise<{
              violations: Array<{ impact: string | null }>;
            }>;
          };
        }
      ).axe;
      return axe.run();
    });

    const criticalOrSerious = results.violations.filter((violation) =>
      ["critical", "serious"].includes(violation.impact ?? ""),
    );

    expect(criticalOrSerious, `Axe issues on route ${route}`).toHaveLength(0);
  }
});
