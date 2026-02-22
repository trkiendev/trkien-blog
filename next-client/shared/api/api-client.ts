const API_BASE = process.env.NEXT_PUBLIC_API_URL;
if (!API_BASE) {
      throw new Error('NEXT_PUBLIC_API_URL is not defined');
}

export async function apiFetch<T>(
      path: string,
      options: RequestInit = {}
): Promise<T> {
      const isFormData = options.body instanceof FormData;

      const headers = new Headers(options.headers);

      if (!isFormData && options.body) {
            headers.set('Content-Type', 'application/json');
      }

      const res = await fetch(`${API_BASE}${path}`, {
            ...options,
            headers,
            credentials: 'include', 
      });

      if (!res.ok) {
            const text = await res.text();
            let message = 'Request failed';

            try {
                  const err = JSON.parse(text);
                  message = err.message ?? message;
            } catch {
                  if (text) message = text;
            }

            throw new Error(message);
      }

      // Trường hợp 204 NoContent
      if (res.status === 204) {
            return null as T;
      }

      return res.json() as Promise<T>;
}