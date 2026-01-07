# 1. Cấu trúc thư mục chuẩn NextJS
my-next-app/
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx
│  │  ├─ page.tsx
│  │  ├─ globals.css
│  │  └─ favicon.ico
│  │
│  ├─ components/
│  ├─ lib/
│  ├─ styles/
│
├─ public/
├─ next.config.js
├─ tsconfig.json
├─ package.json

# 2. Route
Route cơ bản

app/
 ├─ page.tsx            → /
 ├─ blog/
 │   └─ page.tsx        → /blog
 ├─ blog/[slug]/
 │   └─ page.tsx        → /blog/ddd-la-gi


# 3. Server Component vs. Client Component
- Mặc định: Server component
```typescript
export default function Page() {
      return <div>Server Component</div>;
}
```

- Khi cần state, effect → Client Component
```typescript
'use client';

import { useState } from 'react';

export default function Counter() {
      const [count, setCount] = useState(0);
      return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

**Quy tắc vàng**
- Không có ***useState***, ***useEffect*** → để server
- Chỉ dùng client khi thật sự cần

# 4. Server Component vs. Client Component
- build: npm run build
- run production: npm start

