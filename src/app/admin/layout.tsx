// app/admin/layout.tsx
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import AdminSidebar from '@/components/admin-page/sidebar'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect('/auth')
    }

    return (
        <div className="admin-container">
            <AdminSidebar />
            <main className="admin-content">
                {children || <div className="empty-state">Selecione uma opção no menu</div>}
            </main>
        </div>
    )
}