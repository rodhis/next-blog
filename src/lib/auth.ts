import { NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import { hash, compare } from 'bcryptjs'

import mongodbConnect from '@/lib/mongodb-connect'

//password hashing and verification
export async function hashPassword(password: string): Promise<string> {
    const hashedPassword = await hash(password, 10)
    return hashedPassword
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    const isValid = await compare(password, hashedPassword)
    return isValid
}

// next-auth configuration
export const authOptions: NextAuthOptions = {
  secret: process.env.SECRET,
    session: {
        strategy: 'jwt',
        maxAge: 20 * 60,
        updateAge: 15 * 60,
    },
    providers: [
        Credentials({
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            authorize: async (credentials) => {
                try {
                    if (!credentials?.email || !credentials?.password) {
                        throw new Error('Credenciais inválidas')
                    }

                    const client = await mongodbConnect()
                    if (!client) {
                        throw new Error('Failed to connect to the database')
                    }
                    const db = client.db('next1')

                    const user = await db.collection('blog-admin').findOne({
                        email: credentials.email,
                    })

                    if (!user) {
                        console.error('No user matching:', credentials.email)
                        return null
                    }

                    const isValid = await verifyPassword(credentials.password, user.hashedPassword)

                    if (!isValid) {
                        console.error('Incorrect password', credentials.email)
                        throw new Error('Incorrect password')
                    }

                    return {
                        id: user._id.toString(),
                        email: user.email,
                    }
                } catch (error) {
                    console.error('Authentication failed:', error)
                    throw error
                }
            },
        }),
    ],
    pages: {
        signIn: '/auth',
        error: '/auth',
    },
}
