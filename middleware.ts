import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { updateSession } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const session = await updateSession(request);

  // Protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!session || session.role !== 'admin') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Protect authenticated routes
  if (
    request.nextUrl.pathname.startsWith('/profile') ||
    request.nextUrl.pathname.startsWith('/bookmarks')
  ) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/profile/:path*', '/bookmarks/:path*'],
};