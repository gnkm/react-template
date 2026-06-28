import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/page-layout";
import { cardClassName, hintClassName } from "@/components/ui/styles";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <PageLayout
      description="このページは src/routes/index.tsx です。ここを編集して開発を始めてください。"
      title="React App Template"
    >
      <section className={cardClassName}>
        <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-300">
          はじめに
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          同梱ライブラリの動作例はヘッダーの「デモ」から確認できます。
          自分のアプリを作るときは、デモ関連のファイルを削除して、このページから書き始めてください。
        </p>
        <p className={`${hintClassName} mt-4`}>
          削除するもの: <code className="text-xs">src/features/demo</code>,{" "}
          <code className="text-xs">src/routes/demo.tsx</code>,{" "}
          <code className="text-xs">src/routes/__root.tsx</code> のデモ用ナビ。
        </p>
      </section>
    </PageLayout>
  );
}
