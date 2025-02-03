import "@/styles/globals.css"

export const metadata = {
  title: 'Next Level Blog',
  description: "Rodhis' Tech Blog",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
