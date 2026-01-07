import { apiFetch } from "@/shared/api/api-client";
import { UserRequestPayload } from "./user.type";

export async function CreateUser(payload: UserRequestPayload) {
      return apiFetch('/admin/user', {
            method: 'POST',
            body: JSON.stringify(payload)
      })
}     