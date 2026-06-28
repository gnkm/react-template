import type { ReactNode } from "react";

type PageLayoutProps = {
  children: ReactNode;
  description?: string;
  title: string;
};

export function PageLayout({ children, description, title }: PageLayoutProps) {
  return (
    <div className="w-full max-w-lg space-y-6">
      <header className="space-y-2">
        <h1 className="text-balance text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-300">
          {title}
        </h1>
        {description ? (
          <p className="text-pretty text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {description}
          </p>
        ) : null}
      </header>
      {children}
    </div>
  );
}
