import { NextResponse } from 'next/server'

import { MongoClient } from 'mongodb'

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { email, name, message, id } = body

        if (!email || !email.includes('@') || !name || name.trim() === '' || !message || message.trim() === '') {
            return NextResponse.json({ message: 'Invalid input.' }, { status: 422 })
        }

        const newMessage = { email, name, message, id }

        let client

        try {
            client = await MongoClient.connect(
                `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.mongodb.net/`
            )
        } catch (error) {
            NextResponse.json({ message: `Could not connect to database: ${error}` }, { status: 500 })
            return
        }
        const db = client.db('next1')

        try {
            const result = await db.collection('next-blog-messages').insertOne(newMessage)
            newMessage.id = result.insertedId
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
