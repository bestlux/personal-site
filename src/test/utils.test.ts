import { describe, expect, it } from "vitest";
import { formatMonth, kebabToTitle, slugify } from "@/lib/utils";

describe("utils", () => {
  it("slugifies labels", () => {
    expect(slugify("  Neon Briefing 2026  ")).toBe("neon-briefing-2026");
  });

  it("formats month values", () => {
    expect(formatMonth("2026-02")).toBe("February 2026");
  });

  it("converts kebab-case to title case", () => {
    expect(kebabToTitle("slow-systems-fast-outputs")).toBe("Slow Systems Fast Outputs");
  });
});