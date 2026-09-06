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
  await expect(page).toHaveURL(/\/music$/);
  await expect(
    page.getByRole("heading", { name: "Music", exact: true }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test("unknown book and music URLs return 404", async ({ request }) => {
  expect((await request.get("/reading/not-a-book")).status()).toBe(404);
  expect((await request.get("/music/not-a-song")).status()).toBe(404);
});

test("project filters and contact reveal work", async ({ page }) => {
  await page.goto("/projects");
  await page.getByRole("button", { name: "unity" }).click();
  await expect(page.getByRole("link", { name: /voltline/i })).toBeVisible();

  await page.goto("/contact");
  await page.getByRole("button", { name: /reveal email/i }).click();
  await expect(
    page.getByRole("link", { name: /hello@iomancer\.dev/i }),
  ).toBeVisible();
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
    "/projects",
    "/writing",
    "/contact",
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
