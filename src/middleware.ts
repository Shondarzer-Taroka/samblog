// middleware.ts (at project root)

import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('refreshToken')?.value;
  const protectedPaths = ['/news/dashboard'];
  const pathname = request.nextUrl.pathname;

  // If route is protected
  if (protectedPaths.some(path => pathname.startsWith(path))) {

    // No refresh token cookie? Redirect to login
    if (!token) {
      const dest = request.nextUrl.clone();
      dest.pathname = '/login';
      return NextResponse.redirect(dest);
    }

    // Verify token
    try {
      jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!);
      return NextResponse.next();
    } catch {
      const dest = request.nextUrl.clone();
      dest.pathname = '/login';
      return NextResponse.redirect(dest);
    }
  }

  return NextResponse.next();
}

// Use middleware on dashboard pages
export const config = {
  matcher: ['/news/dashboard/:path*'],
};
