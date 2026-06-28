import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterAll, afterEach, beforeAll, beforeEach } from "vitest";
import { useCounterStore } from "@/stores/counter-store";
import { useThemeStore } from "@/stores/theme-store";
import { server } from "./msw/server";
import { installStorageMock } from "./storage-mock";

const storageMock = installStorageMock();

beforeAll(() => {
  server.listen();
});

beforeEach(() => {
  storageMock.clear();
  useCounterStore.setState({ count: 0 });
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
