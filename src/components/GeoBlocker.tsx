// components/GeoBlocker.tsx

'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const BLOCKED_CITIES = [
    'reading',
    'perintalmanna',
    'berlin',
    'ashburn',
    "berkshire"
]

export default function GeoBlocker() {
    const router = useRouter()

    useEffect(() => {
        const checkLocation = async () => {
            try {
                const cachedCity = localStorage.getItem('user_city')

                if (cachedCity) {
                    if (
                        BLOCKED_CITIES.includes(
                            cachedCity.toLowerCase()
                        )
                    ) {
                        router.replace('/forbidden')
                    }
                    return
                }

                const response = await fetch('https://ipapi.co/json/')
                const data = await response.json()

                const city = (data.city || 'unknown').toLowerCase()

                localStorage.setItem('user_city', city)

                if (BLOCKED_CITIES.includes(city)) {
                    router.replace('/forbidden')
                }
            } catch (error) {
                console.error('Geo check failed', error)
            }
        }

        checkLocation()
    }, [router])

    return null
}