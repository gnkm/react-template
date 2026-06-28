import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  buttonClassName,
  cardClassName,
  inputClassName,
} from "@/components/ui/styles";
import { cn } from "@/lib/cn";

const nameSchema = z.object({
  name: z.string().min(1, "名前を入力してください"),
});

type NameForm = z.infer<typeof nameSchema>;

export function DemoForm() {
  const [savedName, setSavedName] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setFocus,
  } = useForm<NameForm>({
    resolver: zodResolver(nameSchema),
    defaultValues: { name: "" },
  });

  return (
    <section aria-labelledby="demo-form-heading" className={cardClassName}>
      <h2
        className="text-base font-semibold text-zinc-900 dark:text-zinc-300"
        id="demo-form-heading"
      >
        React Hook Form + Zod（フォーム検証）
      </h2>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
        Zod でスキーマ検証し、React Hook Form で送信を処理します。
      </p>

      <form
        className="mt-4 space-y-4"
        noValidate
        onSubmit={handleSubmit(
          (data) => {
            setSavedName(data.name);
            reset();
          },
          () => {
            setFocus("name");
          },
        )}
      >
        <div className="space-y-2">
          <label
            className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
            htmlFor="demo-name"
          >
            名前
          </label>
          <input
            aria-describedby={errors.name ? "demo-name-error" : undefined}
            aria-invalid={errors.name ? true : undefined}
            autoComplete="name"
            className={inputClassName}
            id="demo-name"
            placeholder="例: 山田 太郎…"
            spellCheck={false}
            type="text"
            {...register("name")}
          />
          {errors.name ? (
            <p
              className="text-sm text-red-600 dark:text-red-400"
              id="demo-name-error"
              role="alert"
            >
              {errors.name.message}
            </p>
          ) : null}
        </div>

        <button className={cn(buttonClassName, "w-full")} type="submit">
          送信する
        </button>
      </form>

      <div aria-live="polite" className="mt-4">
        {savedName ? (
          <div
            className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 dark:border-emerald-900/50 dark:bg-emerald-950/40"
            role="status"
          >
            <p className="text-sm font-medium text-emerald-900 dark:text-emerald-300">
              送信成功
            </p>
            <p className="mt-1 text-sm text-emerald-800 dark:text-emerald-400">
              「{savedName}」を受け取りました。
            </p>
          </div>
        ) : (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            まだ送信されていません。
          </p>
        )}
      </div>
    </section>
  );
}
