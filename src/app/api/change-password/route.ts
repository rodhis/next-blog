import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import { authOptions, hashPassword, verifyPassword } from '@/lib/auth'
import mongodbConnect from '@/lib/mongodb-connect'

export default async function PATCH(req: NextRequest) {
    if (req.method !== 'PATCH') {
        return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 })
    }

    const session = await getServerSession(authOptions)

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userEmail = session.user?.email

    if (!userEmail) {
        return NextResponse.json({ error: 'User email not found' }, { status: 400 })
    }

    const body = await req.json()

    if (!body) {
        return NextResponse.json({ error: 'Request body is missing' }, { status: 400 })
    }

    const oldPassword = body.oldPassword
    const newPassword = body.newPassword

    const client = await mongodbConnect()

    if (!client) {
        return NextResponse.json({ error: 'Failed to connect to the database' }, { status: 500 })
    }

    const adminCollection = client.db('next1').collection('blog-admin')

    const user = await adminCollection.findOne({ email: userEmail })

    if (!user) {
        client.close()
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const currentPassword = user.hashedPassword

    const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword)

    if (!passwordsAreEqual) {
        client.close()
        return NextResponse.json({ error: 'Incorrect password' }, { status: 403 })
    }

    const hashedPassword = await hashPassword(newPassword)

    await adminCollection.updateOne({ email: userEmail }, { $set: { password: hashedPassword } })

    client.close()

    return NextResponse.json({ message: 'Password updated' }, { status: 200 })
}
