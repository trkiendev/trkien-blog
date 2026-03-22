export function slugify(text: string): string {
      return text
            .toLowerCase()
            .normalize("NFD") // tách dấu
            .replace(/[\u0300-\u036f]/g, "") // remove dấu tiếng Việt
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^\w\-]+/g, "")
            .replace(/\-\-+/g, "-");
}