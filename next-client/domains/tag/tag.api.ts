import { apiFetch } from "@/shared/api/api-client";
import { TagPayload } from "./tag.model";

export async function CreateTag(payload: TagPayload) {
      return apiFetch('/tags', {
            method: 'POST',
            body: JSON.stringify(payload)
      })
}