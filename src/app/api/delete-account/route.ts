import {  NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'
import mongodbConnect from '@/lib/mongodb-connect'

export async function DELETE() {
    try {
        const session = await getServerSession(authOptions)

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const userEmail = session.user?.email

        if (!userEmail) {
            return NextResponse.json({ error: 'User email not found' }, { status: 400 })
        }

        const client = await mongodbConnect()
        
        if (!client) {
            return NextResponse.json({ error: 'Database connection failed' }, { status: 500 })
        }

        try {
            const db = client.db('next1')
            const result = await db.collection('blog-admin').deleteOne({ email: userEmail })

            if (result.deletedCount === 0) {
                return NextResponse.json({ error: 'User not found' }, { status: 404 })
            }

            return NextResponse.json({ message: 'Account deleted successfully' }, { status: 200 })
        } finally {
            await client.close()
        }
    } catch (error: unknown) {
        console.error('Delete account error:', error)
        const errorMessage = error instanceof Error ? error.message : 'Internal server error'
        return NextResponse.json({ error: errorMessage }, { status: 500 })
    }
}