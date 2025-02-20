import { NextRequest, NextResponse } from 'next/server'

import mongodbConnect from '@/lib/mongodb-connect'

import { hashPassword } from '@/lib/auth'

export default async function handler(req: NextRequest, res: NextResponse) {
    const data = await res.json()

    const { email, password } = data

    if (!email || !email.includes('@') || !password || password.trim().length < 6) {
        return NextResponse.json({ message: 'Invalid input.' }, { status: 422 })
    }

    const client = await mongodbConnect()

    if (!client) {
        throw new Error('Failed to connect to the database')
    }
    const db = client.db('next1')

    const hashedPassword = hashPassword(password)

    const result = await db.collection('blog-admin').insertOne({ email, hashedPassword })

    NextResponse.json({ message: 'Created User!' }, { status: 201 })
}
