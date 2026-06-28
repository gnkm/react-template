import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/cn";
import { useThemeStore } from "@/stores/theme-store";

export function ThemeToggle() {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "ライトモードに切り替え" : "ダークモードに切り替え"}
      className={cn(
        "relative inline-flex size-18 translate-y-2 touch-manipulation items-center justify-center rounded-full",
        "border border-zinc-300 bg-white text-zinc-600",
        "shadow-lg shadow-zinc-900/10",
        "transition-[box-shadow,colors] duration-150",
        "hover:border-zinc-400 hover:bg-zinc-50 hover:text-zinc-900 hover:shadow-xl hover:shadow-zinc-900/15",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2",
        "dark:border-zinc-500 dark:bg-zinc-800 dark:text-zinc-300",
        "dark:shadow-[0_6px_20px_rgba(0,0,0,0.55)] dark:ring-1 dark:ring-zinc-400/20",
        "dark:hover:border-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-200",
        "dark:hover:shadow-[0_10px_28px_rgba(0,0,0,0.65)] dark:hover:ring-zinc-400/30",
        "dark:focus-visible:ring-zinc-300 dark:focus-visible:ring-offset-zinc-900",
      )}
      onClick={toggleTheme}
    >
      {isDark ? (
        <Sun aria-hidden="true" className="size-8" />
      ) : (
        <Moon aria-hidden="true" className="size-8" />
      )}
    </button>
  );
}
