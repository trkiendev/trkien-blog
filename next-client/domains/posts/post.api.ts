import { apiFetch } from "@/shared/api/api-client";
import { PostTableDto } from "./post.dto";

// GET
export async function GetTablePosts(): Promise<PostTableDto[]> {
      return apiFetch<PostTableDto[]>('/posts/table', {
            method: 'GET',
      });
}

// POST
export async function CreatePost(formData: FormData): Promise<void> {
      return apiFetch('/posts', {
            method: 'POST',
            body: formData
      })
}