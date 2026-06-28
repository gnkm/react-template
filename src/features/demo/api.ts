export type DemoMessage = {
  message: string;
  timestamp: string;
};

export async function fetchDemoMessage(): Promise<DemoMessage> {
  const response = await fetch("/api/demo/message");

  if (!response.ok) {
    throw new Error("デモメッセージの取得に失敗しました");
  }

  return response.json() as Promise<DemoMessage>;
}
