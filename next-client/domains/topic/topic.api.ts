import { apiFetch } from "@/shared/api/api-client";
import { TopicDto } from "./topic.model";

export async function GetAllTopics() {
      return apiFetch<TopicDto[]>('/topics', {
            method: 'GET'
      })
}

export async function CreateTopic(formData: FormData) {
      return apiFetch('/topics', {
            method: 'POST',
            body: formData
      })
}