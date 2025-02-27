import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

import AuthForm from '@/components/auth-form/auth-form'
import { authOptions } from '@/lib/auth'

export default async function AuthPage() {
    const session = await getServerSession(authOptions)

    if (session) {
        redirect('/')
    }

    return <AuthForm />
}
