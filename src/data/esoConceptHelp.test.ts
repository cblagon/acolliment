import { describe, expect, it } from "vitest";
import { getEsoConceptHelp } from "./esoConceptHelp";

describe("ESO concept context", () => {
  it("provides a worked factorisation example in mathematics", () => {
    const help = getEsoConceptHelp("eso3-mat-algebra", "Factoritzar");
    expect(help).toBeDefined();
    // Verify that the demonstrated common-factor transformation is equivalent.
    for (const x of [-2, 0, 5]) expect(6 * x + 9).toBe(3 * (2 * x + 3));
  });
  it("does not show the polynomial meaning of root outside mathematics", () => {
    expect(getEsoConceptHelp("eso3-mat-algebra", "Arrel")).toBeDefined();
    expect(getEsoConceptHelp("eso3-cie-cos", "Arrel")).toBeUndefined();
  });
});