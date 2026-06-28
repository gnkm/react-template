import { useEffect, useRef } from "react";
import {
  applyTheme,
  getInitialTheme,
  useThemeStore,
} from "@/stores/theme-store";

export function ThemeSync() {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) {
      return;
    }

    hasInitialized.current = true;
    setTheme(getInitialTheme());
  }, [setTheme]);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return null;
}
