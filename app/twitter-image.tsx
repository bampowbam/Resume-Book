import { ImageResponse } from 'next/og'
import { headers } from 'next/headers'

export const runtime = 'edge'

export const size = {
    width: 1200,
    height: 675,
}

export const contentType = 'image/png'

const title = "Luke Balogun's Interactive Resume"

async function getOrigin() {
    const configured = process.env.NEXT_PUBLIC_SITE_URL
    if (configured) return configured

    const hdrs = headers()
    const host = (await hdrs).get('x-forwarded-host') ?? (await hdrs).get('host') ?? 'localhost:3000'
    const proto = (await hdrs).get('x-forwarded-proto') ?? 'http'
    return `${proto}://${host}`
}

export default async function Image() {
    const origin = getOrigin()
    const iconUrl = new URL('/favicon.png', await origin).toString()

    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#ffffff',
                    color: '#0f172a',
                    padding: 80,
                    textAlign: 'center',
                }}
            >
                <img
                    src={iconUrl}
                    width={140}
                    height={140}
                    style={{
                        borderRadius: 28,
                        marginBottom: 32,
                    }}
                />
                <div
                    style={{
                        fontSize: 64,
                        fontWeight: 700,
                        lineHeight: 1.1,
                        letterSpacing: -1,
                    }}
                >
                    {title}
                </div>
            </div>
        ),
        {
            ...size,
        },
    )
}
