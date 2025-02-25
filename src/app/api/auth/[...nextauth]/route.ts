import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import { verifyPassword } from '@/lib/auth'
import mongodbConnect from '@/lib/mongodb-connect'

const handler = NextAuth({
    session: {
        strategy: 'jwt',
    },
    providers: [
        Credentials({
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            authorize: async (credentials) => {
                if (!credentials) {
                    throw new Error('No credentials provided')
                }

                const client = await mongodbConnect()

                if (!client) {
                    throw new Error('Failed to connect to the database')
                }

                const usersCollection = client.db().collection('blog-admin')

                const user = await usersCollection.findOne({ email: credentials.email })

                if (!user) {
                    client.close()
                    throw new Error('No user found')
                }

                const isValid = await verifyPassword(credentials.password, user.hashedPassword)

                if (!isValid) {
                    client.close()
                    throw new Error('Could not log you in')
                }

                client.close()
                return { id: user._id.toString(), email: user.email }
            },
        }),
    ],
    pages: {
        signIn: '/auth',
        error: '/auth',
    },
})

export { handler as GET, handler as POST }