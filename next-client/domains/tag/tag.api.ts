import { apiFetch } from "@/shared/api/api-client";
import { TagDto, TagPayload, TagTableDto } from "./tag.model";

export async function GetTableTags(): Promise<TagTableDto[]> {
      return apiFetch<TagTableDto[]>('/tags', {
            method: 'GET'
      })
}

export async function CreateTag(payload: TagPayload): Promise<TagDto> {
      return apiFetch('/tags', {
            method: 'POST',
            body: JSON.stringify(payload)
      })
}