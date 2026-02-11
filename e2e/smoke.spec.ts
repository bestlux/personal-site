import { expect, test } from "@playwright/test";
import axe from "axe-core";

test("home route renders and links are reachable", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /building living systems/i })).toBeVisible();

  await page.getByRole("link", { name: /explore projects/i }).click();
  await expect(page).toHaveURL(/\/projects$/);

  await page.getByRole("link", { name: /writing/i }).first().click();
  await expect(page).toHaveURL(/\/writing$/);
});

test("project filters and contact reveal work", async ({ page }) => {
  await page.goto("/projects");
  await page.getByRole("button", { name: "unity" }).click();
  await expect(page.getByRole("link", { name: /voltline/i })).toBeVisible();

  await page.goto("/contact");
  await page.getByRole("button", { name: /reveal email/i }).click();
  await expect(
    page.getByRole("link", { name: /iomancer@iomancer\.com/i }),
  ).toBeVisible();
});

test("no critical or serious axe violations on core routes", async ({ page }) => {
  for (const route of ["/", "/projects", "/writing", "/contact"]) {
    await page.goto(route);
    await page.addScriptTag({ content: axe.source });

    const results = await page.evaluate(async () => {
      const axe = (window as typeof window & { axe: { run: () => Promise<{ violations: Array<{ impact: string | null }> }> } }).axe;
      return axe.run();
    });

    const criticalOrSerious = results.violations.filter((violation) =>
      ["critical", "serious"].includes(violation.impact ?? ""),
    );

    expect(criticalOrSerious, `Axe issues on route ${route}`).toHaveLength(0);
  }
});
