import { ReactNode } from "react"

import MainNavigation from "./main-navigation"

interface LayoutProps {
    children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
    return (
        <>
            <MainNavigation />
            <main>{children}</main>
        </>
    )
}
