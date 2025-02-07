import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { email, name, message } = body

        if (
            !email ||
            !email.includes('@') ||
            !name ||
            name.trim() === '' ||
            !message ||
            message.trim() === ''
        ) {
            return NextResponse.json({ message: 'Invalid input.' }, { status: 422 })
        }

        const newMessage = { email, name, message }
        console.log(newMessage)

        return NextResponse.json({ message: 'Success!' }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: (error as Error).message }, { status: 500 })
    }
}
