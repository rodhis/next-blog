import '@/styles/globals.css'
import MainNavigation from '@/components/main-navigation/main-navigation'

export const metadata = {
    name: 'viewport',
    content: 'width=device-width, initial-scale=1',
    title: 'Next Level Blog',
    description: "Rodhis' Tech Blog",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <MainNavigation />
                <main>{children}</main>
            </body>
        </html>
    )
}
