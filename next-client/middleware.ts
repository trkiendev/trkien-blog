import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
      const isAdmin = Boolean(req.cookies.get("admin_token"));
}

export const config = {
      matcher: ["/admin/:path*"],
};