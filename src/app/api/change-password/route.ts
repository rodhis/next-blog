import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import { authOptions, hashPassword, verifyPassword } from '@/lib/auth'
import mongodbConnect from '@/lib/mongodb-connect'

export async function PATCH(req: NextRequest) {
    if (req.method !== 'PATCH') {
        return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 })
    }

    try {
        const session = await getServerSession(authOptions)

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const userEmail = session.user?.email

        if (!userEmail) {
            return NextResponse.json({ error: 'User email not found' }, { status: 400 })
        }

        const body = await req.json()

        const oldPassword = body.oldPassword
        const newPassword = body.newPassword

        if (!oldPassword || !newPassword) {
            return NextResponse.json({ error: 'Missing password fields' }, { status: 400 })
        }

        const client = await mongodbConnect()

        if (!client) {
            return NextResponse.json({ error: 'Failed to connect to database' }, { status: 500 })
        }

        try {
            const adminCollection = client.db('next1').collection('blog-admin')
            const user = await adminCollection.findOne({ email: userEmail })

            if (!user) {
                return NextResponse.json({ error: 'User not found' }, { status: 404 })
            }

            const currentHashedPassword = user.hashedPassword

            const passwordsMatch = await verifyPassword(oldPassword, currentHashedPassword)

            if (!passwordsMatch) {
                return NextResponse.json({ error: 'Incorrect password' }, { status: 403 })
            }

            const newHashedPassword = await hashPassword(newPassword)

            const result = await adminCollection.updateOne(
                { email: userEmail },
                {
                    $set: {
                        hashedPassword: newHashedPassword,
                    },
                }
            )

            if (result.modifiedCount === 0) {
                throw new Error('No documents modified')
            }

            return NextResponse.json({ message: 'Password updated successfully' }, { status: 200 })
        } finally {
            await client.close()
        }
    } catch (error: unknown) {
        console.error('Full error:', error)
        const errorMessage = error instanceof Error ? error.message : 'Internal server error'
        return NextResponse.json({ error: errorMessage }, { status: 500 })
    }
}
