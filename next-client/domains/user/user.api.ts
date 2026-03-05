import { apiFetch } from "@/shared/api/api-client";
import { UserRequestPayload } from "./user.model";

export async function CreateUser(payload: UserRequestPayload) {
      return apiFetch('/user', {
            method: 'POST',
            body: JSON.stringify(payload)
      })
}     