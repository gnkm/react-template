import { PageLayout } from "@/components/layout/page-layout";
import { DemoCounter } from "./demo-counter";
import { DemoForm } from "./demo-form";
import { DemoQuery } from "./demo-query";

export function DemoPage() {
  return (
    <PageLayout
      description="このテンプレートに同梱したライブラリの動作例です。不要になったら src/features/demo と src/routes/demo.tsx を削除してください。"
      title="同梱機能のショーケース"
    >
      <div className="space-y-4">
        <DemoCounter />
        <DemoForm />
        <DemoQuery />
      </div>
    </PageLayout>
  );
}
