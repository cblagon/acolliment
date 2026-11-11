import { beforeEach, describe, expect, it, vi } from "vitest";
import { translateEsoLines } from "./esoTranslations";
import { invokeQueued } from "./aiQueue";

vi.mock("./aiQueue", () => ({ invokeQueued: vi.fn() }));
beforeEach(() => { localStorage.clear(); vi.mocked(invokeQueued).mockReset(); });
describe("ESO language translations", () => {
  it("requests the chosen help language and reuses successful translations", async () => {
    vi.mocked(invokeQueued).mockResolvedValue({ lines: ["Ecuación", "Resuelve la ecuación."] });
    const source = ["Equació", "Resol l'equació."];
    expect(await translateEsoLines(source, "es")).toEqual(["Ecuación", "Resuelve la ecuación."]);
    await translateEsoLines(source, "es");
    expect(invokeQueued).toHaveBeenCalledExactlyOnceWith("ai-text-tools", { action: "translate-lines", targetLang: "es", lines: source });
  });
  it("keeps Catalan content unchanged without AI", async () => {
    expect(await translateEsoLines(["Equació"], "ca")).toEqual(["Equació"]);
    expect(invokeQueued).not.toHaveBeenCalled();
  });
  it("does not cache failed or incomplete translations", async () => {
    vi.mocked(invokeQueued).mockResolvedValueOnce({ lines: [] }).mockResolvedValueOnce({ lines: ["معادله"] });
    await expect(translateEsoLines(["Equació"], "ps")).rejects.toThrow();
    expect(await translateEsoLines(["Equació"], "ps")).toEqual(["معادله"]);
    expect(invokeQueued).toHaveBeenCalledTimes(2);
  });
  it("shares concurrent requests and separates languages", async () => {
    vi.mocked(invokeQueued).mockResolvedValue({ lines: ["Equation"] });
    await Promise.all([translateEsoLines(["Equació"], "en"), translateEsoLines(["Equació"], "en")]);
    expect(invokeQueued).toHaveBeenCalledTimes(1);
    vi.mocked(invokeQueued).mockResolvedValue({ lines: ["Équation"] });
    expect(await translateEsoLines(["Equació"], "fr")).toEqual(["Équation"]);
    expect(invokeQueued).toHaveBeenCalledTimes(2);
  });
});