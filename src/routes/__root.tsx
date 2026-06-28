import {
  createRootRoute,
  Link,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import {
  navLinkActiveClassName,
  navLinkClassName,
} from "@/components/ui/styles";
import { ThemeToggle } from "@/features/theme";
import { cn } from "@/lib/cn";

const navItems = [
  { label: "ホーム", to: "/" as const },
  // デモを削除するときは、この行と src/routes/demo.tsx, src/features/demo を消してください。
  { label: "デモ", to: "/demo" as const },
];

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  return (
    <AppShell>
      <header className="border-b border-zinc-300 bg-white/80 backdrop-blur-sm dark:border-zinc-700 dark:bg-zinc-900/80">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Sparkles
                aria-hidden="true"
                className="size-5 text-amber-500 dark:text-amber-400"
              />
              <p className="font-semibold text-zinc-900 dark:text-zinc-300">
                React App Template
              </p>
            </div>
            <ThemeToggle />
          </div>

          <nav aria-label="メイン">
            <ul className="flex flex-wrap gap-2">
              {navItems.map((item) => {
                const isActive =
                  item.to === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.to);

                return (
                  <li key={item.to}>
                    <Link
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        isActive ? navLinkActiveClassName : navLinkClassName,
                      )}
                      to={item.to}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-3xl justify-center px-6 py-8">
        <Outlet />
      </main>
    </AppShell>
  );
}
