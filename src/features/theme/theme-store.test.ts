import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import {
  applyTheme,
  getInitialTheme,
  getSystemTheme,
  readStoredTheme,
  THEME_STORAGE_KEY,
  useThemeStore,
} from "./theme-store";

describe("theme-store", () => {
  beforeEach(() => {
    useThemeStore.setState({ theme: "light" });
    document.documentElement.classList.remove("dark");
    document.documentElement.style.colorScheme = "";
  });

  afterEach(() => {
    document.documentElement.classList.remove("dark");
    document.documentElement.style.colorScheme = "";
    vi.restoreAllMocks();
  });

  test("applyTheme で html に dark クラスと color-scheme を反映する", () => {
    applyTheme("dark");

    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(document.documentElement.style.colorScheme).toBe("dark");

    applyTheme("light");

    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(document.documentElement.style.colorScheme).toBe("light");
  });

  test("toggleTheme で light と dark を切り替える", () => {
    useThemeStore.setState({ theme: "light" });

    useThemeStore.getState().toggleTheme();
    expect(useThemeStore.getState().theme).toBe("dark");
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");

    useThemeStore.getState().toggleTheme();
    expect(useThemeStore.getState().theme).toBe("light");
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe("light");
  });

  test("setTheme で localStorage に保存する", () => {
    useThemeStore.getState().setTheme("dark");

    expect(readStoredTheme()).toBe("dark");
    expect(useThemeStore.getState().theme).toBe("dark");
  });

  test("getInitialTheme は保存値を優先し、なければ OS 設定を使う", () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, "dark");
    expect(getInitialTheme()).toBe("dark");

    window.localStorage.clear();
    vi.spyOn(window, "matchMedia").mockImplementation((query) => ({
      matches: query === "(prefers-color-scheme: dark)",
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    expect(getSystemTheme()).toBe("dark");
    expect(getInitialTheme()).toBe("dark");
  });
});
