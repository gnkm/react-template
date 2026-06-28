import { describe, expect, test } from "vitest";

describe("MSW", () => {
  test("デモのモックエンドポイントが応答する", async () => {
    const response = await fetch("/api/demo/message");
    const body = (await response.json()) as { message: string };

    expect(response.ok).toBe(true);
    expect(body.message).toContain("MSW");
  });
});
