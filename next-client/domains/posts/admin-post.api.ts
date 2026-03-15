import { apiFetch } from "@/shared/api/api-client";
import { PostTableDto } from "./post.dto";
import { AdminPostDetailDto } from "./admin-post.dto";

// GET
export async function AdminGetTablePosts(): Promise<PostTableDto[]> {
      return apiFetch<PostTableDto[]>('/admin/posts/table', {
            method: 'GET',
      });
}

export async function AdminGetPostDetail(id: string): Promise<AdminPostDetailDto | null> {
      console.log("id: ", id);
      return apiFetch<AdminPostDetailDto | null>(`/admin/posts/${id}/detail`, {
            method: 'GET',
      });
}

// POST
export async function AdminCreatePost(formData: FormData): Promise<void> {
      return apiFetch('/admin/posts', {
            method: 'POST',
            body: formData
      })
}