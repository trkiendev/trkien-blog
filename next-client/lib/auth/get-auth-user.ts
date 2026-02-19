import { cookies } from "next/headers";
import 'server-only';

const API_BASE = process.env.NEXT_PUBLIC_API_URL!;
if (!API_BASE) {
      throw new Error('NEXT_PUBLIC_API_URL is not defined');
}

export async function getAuthUser() {
      try {
            const cookieStore = await cookies();

            const cookieHeader = cookieStore.getAll()
                  .map(c => `${c.name}=${c.value}`)
                  .join("; ");

            if (!cookieHeader) return null;

            const res = await fetch(`${API_BASE}/auth/me`, {
                  method: "GET",
                  headers: {
                        Cookie: cookieHeader,
                  },
                  cache: "no-store",
            });

            if (!res.ok) return null;

            const json = await res.json();
            return json.data ?? null;
      } catch (err) {
            console.error("getAuthUser error:", err);
            return null;
      }
}