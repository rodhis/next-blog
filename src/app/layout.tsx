import { getServerSession } from 'next-auth'

import MainNavigation from '@/components/main-navigation/main-navigation'
import Providers from '@/components/providers/session-provider'
import { authOptions } from '@/lib/auth'

import '@/styles/globals.css'

export const metadata = {
    title: 'Next Level Blog',
    description: "Rodhis' Tech Blog",
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions)

    return (
        <html lang="en">
            <body>
                <Providers session={session}>
                    <MainNavigation />
                    <main>
                        {children}
                        <div id="notifications"></div>
                    </main>
                </Providers>
            </body>
        </html>
    )
}
