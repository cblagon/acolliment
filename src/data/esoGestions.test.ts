import { describe, expect, it } from "vitest";
import { gestionsAmbit } from "./esoGestions";

describe("course-specific ESO procedures", () => {
  it.each(["2eso", "3eso", "4eso"])("keeps existing identifiers and complete cards in %s", (course) => {
    const blocks = gestionsAmbit(course).blocs;
    expect(blocks).toHaveLength(9);
    expect(blocks[0].id).toBe(`${course}-gestions-1`);
    expect(blocks[5].id).toBe(`${course}-gestions-6`);
    expect(blocks.every((b) => b.fitxes.length === 8)).toBe(true);
    expect(new Set(blocks.map((b) => b.id)).size).toBe(9);
  });
  it("provides different new scenarios for each course", () => {
    const names = ["2eso", "3eso", "4eso"].flatMap((course) => gestionsAmbit(course).blocs.slice(6).map((b) => b.nom));
    expect(new Set(names).size).toBe(9);
  });
});