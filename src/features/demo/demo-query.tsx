import {
  cardClassName,
  hintClassName,
  secondaryButtonClassName,
} from "@/components/ui/styles";
import { useDemoMessage } from "./use-demo-message";

export function DemoQuery() {
  const { data, error, isPending, isFetching, refetch } = useDemoMessage();

  return (
    <section aria-labelledby="demo-query-heading" className={cardClassName}>
      <h2
        className="text-base font-semibold text-zinc-900 dark:text-zinc-300"
        id="demo-query-heading"
      >
        TanStack Query + MSW（データ取得）
      </h2>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
        TanStack Query が <code className="text-xs">/api/demo/message</code>{" "}
        を取得し、 レスポンスは MSW がモックします。
      </p>

      <div aria-live="polite" className="mt-4 space-y-3">
        {isPending ? (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            読み込み中…
          </p>
        ) : error ? (
          <p className="text-sm text-red-600 dark:text-red-400" role="alert">
            {error.message}
          </p>
        ) : (
          <div className={hintClassName}>
            <p className="font-medium text-zinc-800 dark:text-zinc-300">
              {data.message}
            </p>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-500">
              {data.timestamp}
            </p>
          </div>
        )}

        <button
          className={secondaryButtonClassName}
          disabled={isFetching}
          onClick={() => {
            void refetch();
          }}
          type="button"
        >
          {isFetching ? "更新中…" : "再取得する"}
        </button>
      </div>
    </section>
  );
}
