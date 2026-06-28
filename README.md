# React App Template

TypeScript + React 向けの SPA テンプレートです。Vite 8、TanStack Router / Query、Biome、Vitest、lefthook を同梱しています。

## 前提

- Node.js `>=24.14.0`（[`.tool-versions`](./.tool-versions) 参照）
- [pnpm](https://pnpm.io/) `11.6.0`（[`packageManager`](./package.json) 参照）

`mise install` などで指定できます。

## セットアップ

```bash
pnpm install
pnpm run dev
```

## よく使うコマンド

| コマンド | 説明 |
|---------|------|
| `pnpm run dev` | 開発サーバー起動 |
| `pnpm run build` | 本番ビルド |
| `pnpm run test` | Vitest 実行 |
| `pnpm run lint` | Biome による lint / format チェック |
| `pnpm run lint:hooks` | ESLint（React Hooks / Compiler ルール） |
| `pnpm run ci` | typecheck + lint + test + build |

## テンプレートの使い始め方

同梱のデモ（ショーケース）は 1 か所にまとまっています。自分のアプリを作るときは次を削除/編集するだけです。

1. `src/features/demo/` を削除
2. `src/routes/demo.tsx` を削除
3. `src/routes/__root.tsx` の `navItems` からデモ用の行を削除
4. `src/routes/index.tsx`（ホーム）を書き換えて開発を開始
5. （API モックが不要なら）`src/mocks/handlers.ts` のデモハンドラを削除

`stores/` や `hooks/` などは必要になったときに追加してください。

## ディレクトリ構成

型ベースを基本に、機能ごとにまとめたいものは `features/` へ置く構成です。

```text
src/
├── app/           # アプリ層: Providers（QueryClient / テーマ同期）
├── components/    # 横断的に使う汎用コンポーネント
│   ├── layout/    #   AppShell / PageLayout
│   └── ui/        #   className 定数（Button / Input / Card など）
├── features/      # 機能単位のまとまり
│   ├── theme/     #   ダーク/ライト切替（store・ThemeToggle・ThemeSync）
│   └── demo/      #   ★同梱機能のショーケース（不要なら削除）
├── lib/           # フレームワーク非依存ユーティリティ（cn など）
├── mocks/         # MSW ハンドラ（dev / テスト共通）
├── routes/        # TanStack Router ファイルベースルート（ページ実体もここ）
├── styles/        # グローバル CSS（Tailwind CSS v4）
└── test/          # テスト setup、Router テスト用ヘルパー
```

## 採用スタック

| カテゴリ | ライブラリ |
|---------|-----------|
| UI | React 19、Tailwind CSS 4 |
| ルーティング | TanStack Router（ファイルベース） |
| データ取得 | TanStack Query |
| フォーム | React Hook Form + Zod |
| 状態管理 | Zustand |
| ビルド | Vite 8 + React Compiler |
| Lint / Format | Biome |
| React Compiler lint | ESLint (`eslint-plugin-react-hooks`) |
| API モック | MSW（dev の `worker.start` とテストの `setupServer` で共通ハンドラを使用） |
| テスト | Vitest + Testing Library + MSW + happy-dom |
| Git hooks | lefthook |

### Lint の役割分担

- **Biome**: フォーマット、import 整理、一般 lint、a11y
- **ESLint**: React Compiler 固有ルール（Biome 未対応のため最小構成で併用）

## TanStack Router

- ルート定義: `src/routes/`
- 生成ファイル: `src/routeTree.gen.ts`（dev / build 時に自動生成。Biome 対象外）

| パス | 内容 |
|------|------|
| `/` | ホーム（このテンプレートの説明） |
| `/demo` | 同梱機能のショーケース（Zustand / React Hook Form + Zod / TanStack Query + MSW） |

シンプルなページはルートファイルにコンポーネントを直接書きます（`src/routes/index.tsx` 参照）。規模が大きくなったら `src/features/<機能名>/` に切り出して、ルートファイルから読み込んでください。

## API モック（MSW）

`src/mocks/handlers.ts` のハンドラを、開発時（`src/mocks/browser.ts`）とテスト時（`src/mocks/node.ts`）で共通利用します。

- 開発時: `src/main.tsx` の `enableMocking()` が dev のときだけ Service Worker を起動します。定義していないリクエストは素通しします（`onUnhandledRequest: "bypass"`）。
- Service Worker 本体は `public/mockServiceWorker.js`（`pnpm exec msw init public` で生成。コミット対象）。
- モックが不要なら `src/main.tsx` の `enableMocking()` 呼び出しを削除してください。

## lefthook

`pnpm install` 時に `prepare` スクリプトで lefthook がインストールされます。

### pre-commit

- Biome（ステージ済みファイル）
- ESLint hooks（`src/**/*.{ts,tsx}`）
- osv-scanner（`pnpm-lock.yaml` 変更時）
- gitleaks

### pre-push

- `pnpm run ci`（typecheck + lint + test + build）

### 外部ツール（pre-commit で必要）

以下はローカルにインストールしてください。未インストールの場合、該当 hook が失敗します。

```bash
# macOS (Homebrew)
brew install osv-scanner gitleaks
```

## CI

GitHub Actions（[`.github/workflows/ci.yml`](./.github/workflows/ci.yml)）で `pnpm run ci` を実行します。

PR 向けの脆弱性スキャンは [`.github/workflows/osv-scanner-pr.yml`](./.github/workflows/osv-scanner-pr.yml) で実行します。

## VS Code

[`.vscode/extensions.json`](./.vscode/extensions.json) の推奨拡張をインストールすると、Biome / ESLint / Tailwind / Vitest の開発体験が整います。
