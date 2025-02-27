import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { authOptions } from "@/lib/auth"

import AdminProfile from '@/components/admin-page/admin-profile'



export default async function AdminPage() {
    const session = await getServerSession(authOptions)

    if (!session) {
      redirect("/auth?callbackUrl=/profile")
    }
    
    return <AdminProfile />
}
