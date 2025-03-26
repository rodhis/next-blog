import { NextRequest, NextResponse } from 'next/server'

import mongodbConnect from '@/lib/mongodb-connect'

import { hashPassword } from '@/lib/auth'

export async function POST(req: NextRequest) {
    const data = await req.json()

    const { email, password } = data

    if (!email || !email.includes('@') || !password) {
        return NextResponse.json({ message: 'Invalid input.' }, { status: 422 })
    }

    if (password.trim().length < 8) {
        return NextResponse.json({ message: 'Password must be at least 8 characters' }, { status: 422 })
    }

    const client = await mongodbConnect()

    if (!client) {
        throw new Error('Failed to connect to the database')
    }
    const db = client.db('next1')

    const existingUser = await db.collection('blog-admin').findOne({ email: email })

    if (existingUser) {
        return NextResponse.json({ message: 'User exists already!' }, { status: 422 })
    }

    const hashedPassword = await hashPassword(password)

    await db.collection('blog-admin').insertOne({ email, hashedPassword })

    return NextResponse.json({ message: 'Created User!' }, { status: 201 })
}
