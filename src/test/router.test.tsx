import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import { THEME_STORAGE_KEY, useThemeStore } from "@/features/theme";
import { renderWithRouter } from "@/test/render-with-router";

describe("Router", () => {
  test("ホームからデモへ遷移できる", async () => {
    const user = userEvent.setup();

    await renderWithRouter("/");

    expect(
      screen.getByRole("heading", { name: "React App Template" }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("link", { name: "デモ" }));

    expect(
      await screen.findByRole("heading", { name: "同梱機能のショーケース" }),
    ).toBeInTheDocument();
  });

  test("ヘッダーのテーマ切り替えボタンでダークモードとライトモードを切り替えられる", async () => {
    const user = userEvent.setup();

    await renderWithRouter("/");

    const toggleButton = screen.getByRole("button", {
      name: "ダークモードに切り替え",
    });

    await user.click(toggleButton);

    expect(
      screen.getByRole("button", { name: "ライトモードに切り替え" }),
    ).toBeInTheDocument();
    expect(useThemeStore.getState().theme).toBe("dark");
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });
});
