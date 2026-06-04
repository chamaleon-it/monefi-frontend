import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // 1. Check if we're already on the forbidden page
  if (request.nextUrl.pathname.startsWith('/forbidden')) {
    return NextResponse.next()
  }

  // 2. See if we already stored the city in a cookie
  let city = request.cookies.get('user_city')?.value

  if (!city) {
    // Try Vercel's edge headers
    city = request.headers.get('x-vercel-ip-city') || request.headers.get('x-real-ip-city') || '';

    // If still no city, try to look it up via IP
    if (!city) {
      try {
        const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '';
        const firstIp = ip.split(',')[0].trim();

        if (firstIp && firstIp !== '::1' && firstIp !== '127.0.0.1') {
          // Fetch from ipapi.co
          const geoRes = await fetch(`https://ipapi.co/${firstIp}/json/`, {
            // add a short timeout so we don't hang requests
            signal: AbortSignal.timeout(1500)
          });
          const geoData = await geoRes.json();
          city = geoData.city || '';
        } else {
          // Localhost
          city = 'Local';
        }
      } catch (e) {
        console.error('Geo fetch failed:', e);
        city = 'Unknown';
      }
    }
  }

  // ✏️ Add more blocked cities here (all lowercase). Example: ['reading', 'slough', 'bracknell']
  const BLOCKED_CITIES = ['reading', "local"];
  const userCity = city?.toLowerCase() || '';
  const isBlocked = BLOCKED_CITIES.includes(userCity);

  console.log(userCity)

  if (isBlocked) {
    const url = request.nextUrl.clone()
    url.pathname = '/forbidden'
    return NextResponse.redirect(url)
  }

  // If safe, allow the request but set the cookie so we don't query the API again
  const response = NextResponse.next();
  if (!request.cookies.has('user_city') && city) {
    response.cookies.set('user_city', city, {
      maxAge: 60 * 60 * 24, // Cache for 24 hours
      path: '/',
      sameSite: 'lax',
      httpOnly: true,
    });
  }

  return response;
}

export const config = {
  matcher: [
    // Apply to all routes except API, static files, images, etc.
    '/((?!api|_next/static|_next/image|favicon.ico|images|assets).*)',
  ],
}
