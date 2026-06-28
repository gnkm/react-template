import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Providers } from "@/app/providers";
import { routeTree } from "@/routeTree.gen";
import "@/styles/index.css";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// 開発時のみ MSW を起動し、handlers.ts で定義した API をモックする。
// モックが不要なら enableMocking の呼び出しごと削除して構いません。
async function enableMocking() {
  if (!import.meta.env.DEV) {
    return;
  }

  const { worker } = await import("@/mocks/browser");
  await worker.start({ onUnhandledRequest: "bypass" });
}

function render() {
  const rootElement = document.getElementById("root");

  if (!rootElement) {
    throw new Error("Root element #root was not found.");
  }

  createRoot(rootElement).render(
    <StrictMode>
      <Providers>
        <RouterProvider router={router} />
      </Providers>
    </StrictMode>,
  );
}

void enableMocking().then(render);
