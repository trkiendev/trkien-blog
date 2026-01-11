import { apiFetch } from "@/shared/api/api-client";
import { LoginPayload } from "./login.model";

export async function Login(payload: LoginPayload) {
      return apiFetch('/auth/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                  'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
      })
}