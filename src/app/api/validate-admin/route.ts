import { NextResponse } from 'next/server'

import crypto from 'crypto'

export async function POST(req: Request) {
    try {
        const { adminKey } = await req.json()

        if (!process.env.ADMIN_AUTH_KEY) {
            console.error('ADMIN_AUTH_KEY not configured')
            return NextResponse.json({ error: 'System configuration error' }, { status: 500 })
        }

        const validKey = Buffer.from(adminKey || '')
        const expectedKey = Buffer.from(process.env.ADMIN_AUTH_KEY)

        if (validKey.length !== expectedKey.length) {
            console.error('Key length mismatch')
            return NextResponse.json({ error: 'Invalid authorization' }, { status: 403 })
        }

        const isMatch = crypto.timingSafeEqual(validKey, expectedKey)

        return NextResponse.json({ valid: isMatch }, { status: isMatch ? 200 : 403 })
    } catch (error) {
        console.error('Validation error:', error)
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }
}
