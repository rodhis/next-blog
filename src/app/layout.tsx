
import "@/styles/globals.css"
import MainNavigation from "@/components/layout/main-navigation"

export const metadata = {
  title: "Next Level Blog",
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
