import { apiFetch } from "@/shared/api/api-client";

// POST
export async function CreatePost(formData: FormData): Promise<void> {
      return apiFetch('/posts', {
            method: 'POST',
            body: formData
      })
}