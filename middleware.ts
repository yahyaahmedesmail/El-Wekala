import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

const securityHeaders: Record<string, string> = {
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
};

function withHeaders(response: NextResponse) {
  for (const [key, value] of Object.entries(securityHeaders)) {
    response.headers.set(key, value);
  }
  return response;
}

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;
    const role = token?.role as string | undefined;

    if (path.startsWith('/admin') && role !== 'ADMIN') {
      return withHeaders(NextResponse.redirect(new URL('/login?error=admin', req.url)));
    }

    if (path.startsWith('/buyer') && role !== 'BUYER') {
      return withHeaders(NextResponse.redirect(new URL('/login?error=buyer', req.url)));
    }

    if (path.startsWith('/onboarding') && role !== 'BUYER') {
      return withHeaders(NextResponse.redirect(new URL('/login?error=buyer', req.url)));
    }

    /* السلة لأصحاب المحلات فقط */
    if (path.startsWith('/cart')) {
      if (!token) {
        return withHeaders(
          NextResponse.redirect(new URL('/login?callbackUrl=/cart', req.url))
        );
      }
      if (role === 'ADMIN') {
        return withHeaders(NextResponse.redirect(new URL('/admin', req.url)));
      }
      if (role !== 'BUYER') {
        return withHeaders(NextResponse.redirect(new URL('/login?error=buyer', req.url)));
      }
    }

    /* التسجيل للزوار فقط — المسجّل يروح لصفحته */
    if (path.startsWith('/register') && token) {
      if (role === 'ADMIN') {
        return withHeaders(NextResponse.redirect(new URL('/admin', req.url)));
      }
      if (role === 'BUYER') {
        return withHeaders(NextResponse.redirect(new URL('/buyer', req.url)));
      }
      return withHeaders(NextResponse.redirect(new URL('/', req.url)));
    }

    return withHeaders(NextResponse.next());
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;
        if (
          path.startsWith('/admin') ||
          path.startsWith('/buyer') ||
          path.startsWith('/cart') ||
          path.startsWith('/onboarding')
        ) {
          return !!token;
        }
        /* /register متاح للزوار؛ المسجّل يُعاد توجيهه أعلاه */
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    '/admin/:path*',
    '/buyer/:path*',
    '/cart',
    '/onboarding',
    '/register',
    '/notifications',
    '/invoice/:path*',
    '/review/:path*',
  ],
};
