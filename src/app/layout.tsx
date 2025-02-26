
import '@/styles/globals.css'
import MainNavigation from '@/components/main-navigation/main-navigation'
import Providers from '@/components/providers/session-provider'

export const metadata = {
    title: 'Next Level Blog',
    description: "Rodhis' Tech Blog",

}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Providers>
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
