import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import 'server-only';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function getAuthUser() {
      const cookieStore = await cookies();
      const token = cookieStore.get('access_token')?.value;
      console.log('token: ', token);
      if(!token) 
            return null;

      try {
            const { payload } = await jwtVerify(token, secret);
            console.log('payload: ', payload);

            return {
                  id: payload.sub as string,
                  email: payload.email as string,
                  role: payload.role as string
            }
      } catch {
            return null
      }
}