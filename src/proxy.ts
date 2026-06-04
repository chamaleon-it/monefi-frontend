import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
    // Allow access to the forbidden page itself
    if (request.nextUrl.pathname.startsWith('/forbidden')) {
        return NextResponse.next()
    }

    // Try cookie first
    let city: string = request.cookies.get('user_city')?.value || ''

    if (!city) {
        // Cloudflare / Vercel geolocation headers
        city =
            request.headers.get('cf-ipcity') ||
            request.headers.get('x-vercel-ip-city') ||
            request.headers.get('x-real-ip-city') ||
            ''

        // Fallback to IP lookup
        if (!city) {
            try {
                const ip =
                    request.headers.get('cf-connecting-ip') ||
                    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
                    request.headers.get('x-real-ip') ||
                    ''

                if (
                    ip &&
                    ip !== '::1' &&
                    ip !== '127.0.0.1' &&
                    ip !== 'localhost'
                ) {
                    const geoRes = await fetch(
                        `https://ipapi.co/${ip}/json/`,
                        {
                            signal: AbortSignal.timeout(1500),
                            headers: {
                                Accept: 'application/json',
                            },
                        }
                    )

                    if (geoRes.ok) {
                        const contentType = geoRes.headers.get('content-type') || ''

                        if (contentType.includes('application/json')) {
                            const geoData = await geoRes.json()
                            city = geoData?.city || ''
                        } else {
                            const text = await geoRes.text()
                            console.error(
                                'IPAPI returned non-JSON:',
                                text.substring(0, 200)
                            )
                        }
                    } else {
                        console.error(
                            `IPAPI error: ${geoRes.status} ${geoRes.statusText}`
                        )
                    }
                } else {
                    city = 'Local'
                }
            } catch (error) {
                console.error('Geo lookup failed:', error)
            }
        }
    }

    const userCity = city.trim().toLowerCase()

    // Add cities you want to block
    const BLOCKED_CITIES = [
        'reading',
        'perintalmanna',
        'berlin',
        'ashburn',
    ]

    console.log('Detected City:', userCity)

    if (BLOCKED_CITIES.includes(userCity)) {
        const url = request.nextUrl.clone()
        url.pathname = '/forbidden'
        return NextResponse.redirect(url)
    }

    const response = NextResponse.next()

    // Cache city for 24 hours
    if (!request.cookies.has('user_city') && city) {
        response.cookies.set('user_city', city, {
            maxAge: 60 * 60 * 24,
            path: '/',
            sameSite: 'lax',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
        })
    }

    return response
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|images|assets).*)',
    ],
}