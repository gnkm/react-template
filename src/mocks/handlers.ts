import { HttpResponse, http } from "msw";

/**
 * MSW のリクエストハンドラ。
 * ここに定義したエンドポイントだけがモックされ、それ以外は実ネットワークに流れます。
 *
 * 下記はショーケース用のデモハンドラです。
 * 自分のアプリを作るときは置き換えるか削除してください。
 */
export const handlers = [
  http.get("/api/demo/message", () => {
    return HttpResponse.json({
      message: "これは MSW が返すモックレスポンスです。",
      timestamp: new Date().toISOString(),
    });
  }),
];
