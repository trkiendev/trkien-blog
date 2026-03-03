**content** 1 bài blog được tách làm 2 phần: 
- **Metadata / layout data** (title, tags, thumbnail…) → lưu ở các cột riêng trong DB
- **Body**: lưu markdown "sạch" và khi render thì **map Markdown --> class, component** (CodeBlock, Callout, bullet-list, paragraph...)

# 1. Lưu phần header (title, tags, thumbnail) như metadata
Ví dụ schema (ý tưởng):
- blog_posts.slug.
- blog_post_translations.title
- blog_posts.thumbnail_url
- blog_posts.tags (text[] hoặc bảng quan hệ)

Ví dụ record:
- title: "DDD: Domain Driven Design"
- thumbnail_url: "/thumbnails/domain-driven-design-thumbnail.png"
- tags: ["DDD","ERP","Software Architect"]
--> Phần này không **nằm trong markdown body** nữa

# 2. Lưu body dưới dạng markdown "sạch"
## 2.1. Paragraph + line break
Trong TSX:
```tsx
<p className="paragraph"> ... <br /> ... </p>
```

Trong Markdown bạn lưu
```Markdown
Hello everyone, I have been involved in developing an ERP project approaching Domain-Driven-Design (DDD) philosophy.
I have found this approach very effective for handling complex business domains.
So today I would like to share my understanding and experience with the methodology.

My knowledge and experience are still limited, so there may be some mistakes in my blog, I would be appreciate if you could help me to improve the content.
```
Renderer sẽ tự biến nó thành <p> và bạn map <p> → class="paragraph".

## 2.2. Headings
```markdown
## I. Understanding: Domain Driven Design

### WHAT
```

## 2.3. Bullet list có style bullet-list
TSX
```tsx
<ul className="bullet-list">
      <li>...</li>
</ul>
```

Markdown:
```markdown
Business rules may change due to:

- "adjustments in business strategy."
- "optimization of operational processes."
- "or changes in government policies and regulations."
```

Renderer map ul → <ul class="bullet-list">.

## 2.4. Blockquote
TSX <blockquote>... → Markdown:
```markdown
> user enter data → the system persists it to the database → data is displayed to the client → user update or delete it.
```

## 2.5. Inline code style (thay cho span + font)
TSX:
```tsx
<span className={`${spaceMono.className} ${blogCss.codeColor}`}>if-else</span>
```

Markdown dùng inline code:
```markdown
... scattered `if-else` conditions.
```

Renderer map code (inline) → <code class="...">.

## 2.6. CodeBlock component
TSX:
```tsx
<CodeBlock language="csharp" code={`...`} />
```

Markdown dùng fenced code:
```csharp
public class BudgetPlan {
      // Constructor
      private BudgetPlan() {}
      public BudgetPlan() ....

      // Properties
      public Money Amount { get; private set; }

      // Domain behaviors
      internal bool IsExceed(Money amount) {
            // Logic kiểm tra ngân sách.... 
      }
}
```
Renderer sẽ bắt gặp code fence `csharp` và bạn map nó sang component `<CodeBlock language="csharp" ... />`.


## 2.7. Callout component
Markdown thuần không có `<Callout>` nên bạn cần **quy ước**. 2 cách hay dùng:

```markdown
:::callout
DDD does not focus on the database or CRUD operations. Instead, it focused on expressing business rules clearly and consistently within the codebase.
:::
```

# 3. Ví dụ "body markdown" 
Bạn sẽ lưu trong DB (cột content_markdown) kiểu như:
```md
Hello everyone, I have been involved in developing an ERP project approaching Domain-Driven-Design (DDD) philosophy.
I have found this approach very effective for handling complex business domains.
So today I would like to share my understanding and experience with the methodology.

My knowledge and experience are still limited, so there may be some mistakes in my blog, I would be appreciate if you could help me to improve the content.

## I. Understanding: Domain Driven Design

### WHAT

**DDD (Domain Driven Design)** is not a specific pattern or framework, but a philosophy for building software systems around the core business domain.
The business domain becomes the heart of the system...

Business rules may change due to:

- "adjustments in business strategy."
- "optimization of operational processes."
- "or changes in government policies and regulations."

#### When CRUD is no longer enough

In many ERP systems...

> user enter data → the system persists it to the database → data is displayed to the client → user update or delete it.

... scattered `if-else` conditions.

csharp
public class BudgetPlan {
      ...
}
```


DDD does not focus on the database or CRUD operations. Instead, it focused on expressing business rules clearly and consistently within the codebase.

# 4. Có mất Tailwind class không ?
Không mất, nhưng **header không nên nằm trong markdown body**.
Bạn render header theo template cố định:
- `<h1>` lấy từ `title`
- tags lấy từ `tags`
- thumbnail lấy từ `thumbnail_url`.
Layout vẫn giữ y nguyên Tailwind như bạn đang viết.

Markdown chỉ lo "body"

# 5. Tổng kết
- `content_markdown` (TEXT) → lưu Markdown sạch như ví dụ trên
- Render Next.js:
  - Layout header bằng React + Tailwind
  - Body: ReactMarkdown/MDX renderer + mapping className + custom components
