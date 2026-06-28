import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, test } from "vitest";
import { renderWithRouter } from "@/test/render-with-router";
import { useDemoCounterStore } from "./demo-store";

describe("DemoPage", () => {
  beforeEach(() => {
    useDemoCounterStore.setState({ count: 0 });
  });

  test("Zustand カウンターを増やしてリセットできる", async () => {
    const user = userEvent.setup();

    await renderWithRouter("/demo");

    const counter = screen.getByRole("status", { name: "カウンター" });
    expect(counter).toHaveTextContent("0");

    await user.click(screen.getByRole("button", { name: "+1 する" }));
    expect(counter).toHaveTextContent("1");

    await user.click(screen.getByRole("button", { name: "リセット" }));
    expect(counter).toHaveTextContent("0");
  });

  test("フォームは空送信でエラー、入力送信で結果を表示する", async () => {
    const user = userEvent.setup();

    await renderWithRouter("/demo");

    await user.click(screen.getByRole("button", { name: "送信する" }));
    expect(screen.getByRole("alert")).toHaveTextContent(
      "名前を入力してください",
    );

    await user.type(screen.getByLabelText("名前"), "山田 太郎");
    await user.click(screen.getByRole("button", { name: "送信する" }));

    expect(screen.getByText("送信成功")).toBeInTheDocument();
    expect(screen.getByText(/「山田 太郎」/)).toBeInTheDocument();
  });

  test("TanStack Query が MSW のモックレスポンスを表示する", async () => {
    await renderWithRouter("/demo");

    expect(
      await screen.findByText("これは MSW が返すモックレスポンスです。"),
    ).toBeInTheDocument();
  });
});
