import { getServerSession } from 'next-auth'
import { Viewport } from 'next'

import Providers from '@/components/providers/session-provider'
import Notification from '@/components/ui/notification'
import { NotificationProvider } from '@/contexts/notification-context'
import { authOptions } from '@/lib/auth'
import DynamicMainNavigation from '@/components/main-navigation/wrapper'

import '@/styles/globals.css'

export const metadata = {
    title: 'Next Level Blog',
    description: "Rodhis' Tech Blog",
}

export const viewport: Viewport = {
    initialScale: 1,
    width: 'device-width',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions)

    return (
        <html lang="en">
            <body>
                <Providers session={session}>
                    <NotificationProvider>
                        <DynamicMainNavigation />
                        <main>{children}</main>
                        <div id="notifications"></div>
                        <Notification />
                    </NotificationProvider>
                </Providers>
            </body>
        </html>
    )
}
