import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import { ObjectId } from 'mongodb'

import mongodbConnect from '@/lib/mongodb-connect'
import { authOptions } from '@/lib/auth'

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const session = await getServerSession(authOptions)

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    let client
    try {
        client = await mongodbConnect()
        if (!client) {
            return NextResponse.json({ error: 'Database error' }, { status: 500 })
        }

        const db = client.db('next1')
        const result = await db.collection('next-blog-messages').deleteOne({
            _id: new ObjectId(id),
        })

        if (result.deletedCount === 0) {
            return NextResponse.json({ error: 'Message not found' }, { status: 404 })
        }

        return NextResponse.json({ message: 'Message deleted successfully' }, { status: 200 })
    } catch (error) {
        console.error('Delete API error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    } finally {
        if (client) await client.close()
    }
}
