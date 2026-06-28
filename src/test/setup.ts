import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterAll, afterEach, beforeAll, beforeEach } from "vitest";
import { useThemeStore } from "@/features/theme";
import { server } from "@/mocks/node";
import { installStorageMock } from "./storage-mock";

const storageMock = installStorageMock();

beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });
});

beforeEach(() => {
  storageMock.clear();
  useThemeStore.setState({ theme: "light" });
  document.documentElement.classList.remove("dark");
  document.documentElement.style.colorScheme = "light";
});

afterEach(() => {
  server.resetHandlers();
  cleanup();
});

afterAll(() => {
  server.close();
});
