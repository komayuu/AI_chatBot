
export const TEXTBOOK_CONTENT = `
電子教科書: Reactとは何か/できること/基礎の教科書(初学者向け)

対象: HTML/CSS/JavaScriptの超入門を終えた人(jQueryやES6の基本語彙がわかる程度)
到達目標: Reactの核心概念(コンポーネント/JSX/props/state/hooks)を理解し、Create React AppやVite/Next.jsなどの環境で簡単なアプリを自作できる。

# 目次
1. Reactとは「言語」ではなくUIライブラリ
2. Reactで何ができるのか
3. なぜReactを選ぶのか(思想と強み)
4. はじめの環境構築(Vite/Next.js)
5. 最小のReactコンポーネント
6. JSX入門(HTMLとの違い・表記ルール)
7. props: コンポーネントに値を渡す
8. state: コンポーネント内の状態を持つ
9. イベントと再レンダリングの流れ
10. フック (Hooks) 入門: useState/useEffect / useMemo / useCallback
11. コンポーネント設計(Smart/Dumb、Atomic Designの考え方)
12. コンテキストとグローバル状態: useContext/状態管理の選択肢
13. ルーティング(React Router / Next.js App Router)
14. フォームとバリデーション (Controlled/Uncontrolled、React Hook Form)
15. 非同期処理とデータフェッチ(fetch/axios、SWR/React Query)
16. 型付け: TypeScriptで安全に書く
17. テスト(Jest/React Testing Libraryの超入門)
18. スタイリング(CSS Modules、Tailwind CSS、UIコンポーネント)
19. パフォーマンス最適化(再レンダリング制御、memo、useMemo、useCallback)
20. アクセシビリティ(A11y)とセキュリティの基本
21. ビルドとデプロイ(Vite/Next.js、静的ホスティング、CI/CD)
22. 学習ロードマップ(学び方の順番とおすすめ教材)
23. よくあるエラー&デバッグ術
24. 仕上げ演習: ToDoアプリ → API連携 → 認証つきミニアプリ
25. 用語集とチェックリスト

# 1. Reactとは「言語」ではなくUIライブラリ
- Reactはプログラミング言語ではありません。JavaScript(またはTypeScript)で「ユーザーインターフェイス(UI)を組み立てる」ためのライブラリです。
- 公式の短い説明: “A JavaScript library for building user interfaces.”
- 実体: コンポーネントと呼ばれる小さいUIの部品を組み合わせ、状態(state)の変化に応じて画面を宣言的に同期させる仕組み。
- 比喩: レゴ(コンポーネント)を組み立てると家(アプリ)ができる。家の一部(状態)が変わると、Reactがどのブロックを差し替えるか自動で考えてくれる。

# 2. Reactで何ができるのか
- SPA (Single Page Application): ページ遷移なしでサクサク動くWebアプリ
- SSR/SSG (Next.js): SEOや初期表示が速いWebサイト/アプリ
- PWA: スマホアプリのようにオフラインでも一部動くWeb
- ネイティブアプリ(React Native): iOS/Androidアプリ(本教科書はWebにフォーカス)

## 代表的な用途
- ダッシュボード/管理画面
- ECサイトの商品一覧や詳細ページ(フィルタや検索)
- チャット、SNS、リアルタイムUI

# 3. なぜReactを選ぶのか(思想と強み)
- 宣言的UI: 状態がこうなればUIはこう、と「結果」を書く。
- コンポーネント指向: 再利用しやすく、テストしやすい。
- 巨大なエコシステム: Next.js、React Router、React Query、Tailwindなど。
- 長期安定: Facebook(現Meta)発、長い実績とコミュニティ。

# 4. はじめの環境構築(Vite/Next.js)
## A. Viteで最小構成
# Node.js 18+ 推奨
npm create vite@latest my-app --template react-ts
cd my-app
npm install
npm run dev
http://localhost:5173にアクセス。

## B. Next.js (SSG/SSR対応)
npx create-next-app@latest my-next-app --ts
cd my-next-app
npm run dev
http://localhost:3000にアクセス。

迷ったら: 学習はVite、実務はNext.jsから始めるのが定番。

# 5. 最小のReactコンポーネント
\`\`\`javascript
function Hello(props: { name: string }) {
  return <h1>Hello, {props.name}!</h1>;
}

export default function App() {
  return <Hello name="React" />;
}
\`\`\`
- コンポーネント=関数(またはクラス)。最小は関数コンポーネント。
- propsで外から値を受け取る。

# 6. JSX入門(HTMLとの違い)
- JSXはJavaScript内でXML風の記法を使えるシンタックスシュガー。
- 主な違いとルール:
  - classではなくclassName
  - forではなくhtmlFor
  - 1つのコンポーネントは1つの親要素で返す(<></>フラグメント可)
  - 式の埋め込みは { ... }
  - 属性に式を渡すときも { ... }
\`\`\`javascript
const user = { firstName: 'Yuki', lastName: 'Kato' };
return (
  <div className="card">
    <p>{user.firstName} {user.lastName}</p>
    <img src={\`/avatars/\${user.firstName}.png\`} alt="avatar" />
  </div>
);
\`\`\`

# 7. props: コンポーネントに値を渡す
\`\`\`javascript
function Button({ label, onClick }: { label: string; onClick?: () => void }) {
  return <button onClick={onClick}>{label}</button>;
}

<Button label="保存" onClick={() => console.log('save')} />
\`\`\`
- 親→子へデータを渡す仕組み。
- propsは読み取り専用(子から直接書き換えない)。

# 8. state: コンポーネント内の状態を持つ
\`\`\`javascript
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>+1</button>
    </div>
  );
}
\`\`\`
- useStateは状態と更新関数を返す。
- setStateで更新 → Reactが再レンダリングしてUIを同期。

# 9. イベントと再レンダリングの流れ
1. ユーザーがボタンをクリック
2. ハンドラでsetStateを呼ぶ
3. Reactが新しい状態に基づいて仮想DOMを計算
4. 差分だけを実DOMに反映 → 速い

# 10. フック(Hooks)入門
- useState: 状態を持つ
- useEffect: 副作用 (データ取得、購読、DOM更新など)
- useMemo: 重い計算のメモ化
- useCallback: 関数の参照安定化(子の不要再レンダリング抑制)

## 例: useEffectでデータ取得
\`\`\`javascript
import { useEffect, useState } from 'react';

function UserList() {
  const [users, setUsers] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    fetch('/api/users').then(r => r.json()).then(setUsers);
  }, []); // マウント時に一度だけ

  return (
    <ul>
      {users.map(u => <li key={u.id}>{u.name}</li>)}
    </ul>
  );
}
\`\`\`
`;
