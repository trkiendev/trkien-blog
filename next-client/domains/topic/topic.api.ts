import { apiFetch } from "@/shared/api/api-client";
import { TopicDto, TopicLookupDto } from "./topic.model";

// GET
export async function GetAllTopics() {
      return apiFetch<TopicDto[]>('/topics', {
            method: 'GET'
      })
}

export async function GetTopicLookup() {
      return apiFetch<TopicLookupDto[]>('/topics/lookup', {
            method: 'GET'
      })
}

// POST
export async function CreateTopic(formData: FormData) {
      return apiFetch('/topics', {
            method: 'POST',
            body: formData
      })
}