import { apiFetch } from "@/shared/api/api-client";
import { TagDto, TagLookupDto, TagPayload, TagTableDto } from "./tag.model";

// GET
export async function GetTableTags(): Promise<TagTableDto[]> {
      return apiFetch<TagTableDto[]>('/tags', {
            method: 'GET'
      })
}

export async function ListLookupTags(): Promise<TagLookupDto[]> {
      return apiFetch<TagLookupDto[]>('/tags/lookup', {
            method: 'GET'
      })
}

// POST
export async function CreateTag(payload: TagPayload): Promise<TagDto> {
      return apiFetch('/tags', {
            method: 'POST',
            body: JSON.stringify(payload)
      })
}