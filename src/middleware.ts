import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // Check if the path starts with /admin
    // Note: config.matcher handles this, but we double check or use logic here

    const path = request.nextUrl.pathname;

    // Protect /admin routes
    if (path.startsWith('/admin')) {
        // Allows access to login page
        if (path === '/admin/login') {
            // Optional: Redirect to dashboard if already logged in?
            const adminSession = request.cookies.get('admin_session');
            if (adminSession) {
                return NextResponse.redirect(new URL('/admin', request.url));
            }
            return NextResponse.next();
        }

        // Check for session cookie with correct value
        const adminSession = request.cookies.get('admin_session');

        if (!adminSession || adminSession.value !== 'authenticated') {
            // Redirect to login if no valid session
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/admin/:path*',
}
