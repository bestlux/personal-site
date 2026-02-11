import { describe, expect, it } from "vitest";
import {
  getAllNowEntries,
  getAllProjects,
  getAllTags,
  getAllWriting,
  getLatestNowEntry,
  getProjectBySlug,
  getWritingBySlug,
} from "@/lib/content/source";

describe("content source", () => {
  it("loads projects and can resolve by slug", () => {
    const projects = getAllProjects();
    expect(projects.length).toBeGreaterThanOrEqual(3);
    expect(getProjectBySlug("terminal-atlas")?.title).toBe("Terminal Atlas");
  });

  it("loads writing entries and tags", () => {
    const writing = getAllWriting();
    expect(writing.length).toBeGreaterThanOrEqual(2);
    expect(getWritingBySlug("ai-is-a-medium")?.title).toContain("AI");

    const tags = getAllTags();
    expect(tags).toContain("ai");
  });

  it("loads now entries sorted descending", () => {
    const entries = getAllNowEntries();
    expect(entries.length).toBeGreaterThanOrEqual(1);
    expect(getLatestNowEntry()?.month).toBe(entries[0].month);
  });
});