2. Bước 1 – Thiết lập routing [locale]
Cấu trúc thư mục
app/
 └── [locale]/
     └── blogs/
         └── domain-driven-design/
             └── page.tsx


📌 Bắt buộc: page.tsx phải nằm dưới [locale].

URL sau khi xong:

/vi/blogs/domain-driven-design
/en/blogs/domain-driven-design

3. Bước 2 – Tách content theo ngôn ngữ (chuẩn, sạch)
contents/domain-driven-design.vi.ts
export const content = {
  title: "DDD: Domain Driven Design",
  intro: "Sau một khoảng thời gian khá dài phát triển dự án ERP..."
};

contents/domain-driven-design.en.ts
export const content = {
  title: "DDD: Domain Driven Design",
  intro: "After a long period of developing ERP systems using DDD..."
};

contents/domain-driven-design/index.ts

👉 Đây là chỗ bạn còn thiếu trong mô tả, nhưng rất quan trọng.

import { content as vi } from "./domain-driven-design.vi";
import { content as en } from "./domain-driven-design.en";

export function getContent(locale: "vi" | "en") {
  return locale === "vi" ? vi : en;
}

4. Bước 3 – page.tsx (Server Component, đúng chuẩn)
import { getContent } from "@/contents/domain-driven-design";

export default function Page({
  params,
}: {
  params: { locale: "vi" | "en" };
}) {
  const content = getContent(params.locale);

  return (
    <>
      <h1>{content.title}</h1>
      <p>{content.intro}</p>
    </>
  );
}


📌 Điểm đúng của bạn:

Không dùng use client

Render content theo params.locale

5. Bước 4 – SwitchLanguage (Client Component)

Component bạn đưa ra gần như đúng hoàn toàn.
Tôi chỉ chỉnh 1 chi tiết nhỏ để an toàn hơn.

SwitchLanguage.tsx
'use client';

import { usePathname, useRouter } from "next/navigation";

export default function SwitchLanguage() {
  const pathname = usePathname();
  const router = useRouter();

  function switchLang(lang: "vi" | "en") {
    const segments = pathname.split("/");

    // segments[0] = ""
    // segments[1] = locale
    segments[1] = lang;

    router.push(segments.join("/"));
  }

  return (
    <div className="lang-switch">
      <button onClick={() => switchLang("vi")}>VI</button>
      <button onClick={() => switchLang("en")}>EN</button>
    </div>
  );
}


👉 Component này chỉ đổi URL, không đụng content → đúng triết lý App Router.

6. Bước 5 – generateMetadata (làm SAU CÙNG)

Khi routing + locale đã ổn, lúc này mới nên thêm SEO.

page.tsx
export async function generateMetadata({
  params,
}: {
  params: { locale: "vi" | "en" };
}) {
  const isVi = params.locale === "vi";

  return {
    title: isVi
      ? "DDD – Domain Driven Design trong ERP"
      : "DDD – Domain Driven Design in ERP Systems",
    alternates: {
      languages: {
        vi: "/vi/blogs/domain-driven-design",
        en: "/en/blogs/domain-driven-design",
      },
    },
  };
}