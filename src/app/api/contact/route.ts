import { NextResponse } from 'next/server'

import mongodbConnect from '@/lib/mongodb-connect'

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { email, name, message } = body

        if (!email || !email.includes('@') || !name || name.trim() === '' || !message || message.trim() === '') {
            return NextResponse.json({ message: 'Invalid input.' }, { status: 422 })
        }

        const newMessage = { email, name, message, createdAt: new Date() }

        const client = await mongodbConnect()

        if (!client) {
            return NextResponse.json({ message: 'Database connection failed.' }, { status: 500 })
        }
        const db = client.db('next1')

        try {
            await db.collection('next-blog-messages').insertOne(newMessage)
        } catch (error) {
            client.close()
            NextResponse.json({ message: `Storing message failed: ${error}` }, { status: 500 })
            return
        }

        client.close()

        return NextResponse.json({ message: 'Success!' }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: (error as Error).message }, { status: 500 })
    }
}
