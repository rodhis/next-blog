'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { useState, useEffect } from 'react'
import styles from '@/styles/admin-sidebar.module.css'

export default function AdminSidebar() {
    const pathname = usePathname()
    const [menuIsOpen, setMenuIsOpen] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setMenuIsOpen(false)
            }
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <>
            <button
                className={`${styles.hamburgerButton} ${menuIsOpen ? styles.active : ''}`}
                onClick={() => setMenuIsOpen(!menuIsOpen)}
                aria-label="Menu"
            >
                <span className={styles.bar}></span>
                <span className={styles.bar}></span>
                <span className={styles.bar}></span>
            </button>

            <div
                className={`${styles.sidebarOverlay} ${menuIsOpen ? 'active' : ''}`}
                onClick={() => setMenuIsOpen(false)}
            />

            <aside className={`${styles.sidebar} ${menuIsOpen ? styles.showMenu : ''}`}>
                <nav>
                    <ul>
                        <li className={pathname.startsWith('/admin/messages') ? styles.active : ''}>
                            <Link href="/admin/messages" onClick={() => setMenuIsOpen(false)}>
                                Messages
                            </Link>
                        </li>
                        <li className={pathname.startsWith('/admin/account') ? styles.active : ''}>
                            <Link href="/admin/account" onClick={() => setMenuIsOpen(false)}>
                                Account
                            </Link>
                        </li>
                        <li>
                            <button onClick={() => signOut({ callbackUrl: '/' })} className={styles.logout}>
                                Exit
                            </button>
                        </li>
                    </ul>
                </nav>
            </aside>
        </>
    )
}
