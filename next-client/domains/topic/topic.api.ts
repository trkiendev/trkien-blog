import { apiFetch } from "@/shared/api/api-client";
import { TopicDto } from "./topic.type";

export async function GetAllTopics() {
      return apiFetch<TopicDto[]>('/topic', {
            method: 'GET'
      })
}

export async function CreateTopic(formData: FormData) {
      return apiFetch('/topic', {
            method: 'POST',
            body: formData
      })
}