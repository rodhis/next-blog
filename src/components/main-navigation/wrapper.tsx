'use client'

import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'

const MainNavigationContent = dynamic(() => import('./main-navigation-content'), { ssr: false })

export default function DynamicMainNavigation() {
    const pathname = usePathname()
    const isAdminRoute = pathname?.startsWith('/admin')

    if (isAdminRoute) return null

    return <MainNavigationContent />
}
