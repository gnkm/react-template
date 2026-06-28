import {
  buttonClassName,
  cardClassName,
  secondaryButtonClassName,
} from "@/components/ui/styles";
import { useDemoCounterStore } from "./demo-store";

export function DemoCounter() {
  const { count, increment, reset } = useDemoCounterStore();

  return (
    <section aria-labelledby="demo-counter-heading" className={cardClassName}>
      <h2
        className="text-base font-semibold text-zinc-900 dark:text-zinc-300"
        id="demo-counter-heading"
      >
        Zustand（クライアント状態）
      </h2>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
        コンポーネント外のストアで値を保持します。
      </p>

      <div className="mt-4 space-y-4">
        <p
          aria-label="カウンター"
          aria-live="polite"
          className="font-semibold text-4xl text-zinc-900 tabular-nums tracking-tight dark:text-zinc-300"
          role="status"
        >
          {count}
        </p>

        <div className="flex flex-wrap gap-2">
          <button className={buttonClassName} onClick={increment} type="button">
            +1 する
          </button>
          <button
            className={secondaryButtonClassName}
            disabled={count === 0}
            onClick={reset}
            type="button"
          >
            リセット
          </button>
        </div>
      </div>
    </section>
  );
}
