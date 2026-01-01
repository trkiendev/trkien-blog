**SSG (Static Site Generation)** trong Next.js là cơ chế render trang HTML sẵn tại thời điểm build (next build), sau đó các file HTML/CSS/JS này được phục vụ trực tiếp cho người dùng (qua CDN hoặc static hosting). Không có bước render phía server cho mỗi request.

# Cách SSG hoạt động (tóm tắt)
1. Build time: Next.js chạy code để lấy dữ liệu.
2. Render: Tạo HTML tĩnh cho từng page.
3. Deploy: Đưa HTML lên CDN/host tĩnh.
4. Runtime: Trình duyệt tải HTML có sẵn → nhanh, ổn định.

# Cú pháp trong NextJS
**App Router (Next.js 13+)**
```typescript
export const dynamic = "force-static"; // ép SSG

async function getPosts() {
      const res = await fetch("https://api.example.com/posts", {
            cache: "force-cache", // mặc định là cache → SSG
      });
      return res.json();
}

export default async function PostsPage() {
      const posts = await getPosts();
      return (
            <ul>
                  {posts.map((p: any) => <li key={p.id}>{p.title}</li>)}
            </ul>
      );
}
```

# SWOT
## Ưu điểm chính
- Hiệu năng cao: HTML có sẵn, TTFB rất thấp.
- SEO tốt: Nội dung render sẵn cho bot.
- Chi phí thấp: Không cần server runtime cho mỗi request.
- Ổn định: Ít phụ thuộc backend khi người dùng truy cập.

## Hạn chế
- Dữ liệu tĩnh: Không phù hợp dữ liệu thay đổi liên tục.
- Build lâu: Nhiều page → thời gian build tăng.
- Không cá nhân hóa theo user tại request time.

# ISR (Incremental Static Regeneration) – mở rộng của SSG
ISR cho phép tái tạo trang tĩnh theo chu kỳ sau khi deploy:
```typescript
export const revalidate = 60; // 60 giây regenerate 1 lần
```

- Vẫn là SSG.
- Tự động cập nhật nội dung mà ***không cần rebuild toàn bộ site***.

# WHEN
## Khi nào nên dùng SSG
- Blog, landing page, documentation.
- Trang marketing, giới thiệu sản phẩm.
- Nội dung ít thay đổi, đọc nhiều.

## Khi không nên dùng ?
- Dashboard theo user.
- Dữ liệu realtime (chat, stock price).
- Trang cần kiểm tra quyền ở request time.

