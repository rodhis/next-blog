'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

import { useState } from 'react'

import styles from '@/styles/main-navigation.module.css'
import Logo from './logo'

export default function MainNavigationContent() {
    const { data: session, status } = useSession()

    const [menuIsOpen, setMenuIsOpen] = useState(false)

    function logoutHandler() {
        signOut({
            callbackUrl: `${window.location.origin}/`,
        })
    }

    return (
        <header className={styles.header}>
            <Link href="/">
                <Logo />
            </Link>

            <button
                className={`${styles.hamburgerButton} ${menuIsOpen ? styles.active : ''}`}
                onClick={() => setMenuIsOpen(!menuIsOpen)}
                aria-label="Menu"
            >
                <span className={styles.bar}></span>
                <span className={styles.bar}></span>
                <span className={styles.bar}></span>
            </button>

            <nav className={`${styles.nav} ${menuIsOpen ? styles.showMenu : ''}`}>
                <ul>
                    <li>
                        <Link href="/posts" onClick={() => setMenuIsOpen(false)}>
                            Posts
                        </Link>
                    </li>
                    <li>
                        <Link href="/contact" onClick={() => setMenuIsOpen(false)}>
                            Contact
                        </Link>
                    </li>
                    {!session && status !== 'loading' && (
                        <li>
                            <Link href="/auth" onClick={() => setMenuIsOpen(false)}>
                                Login/Register
                            </Link>
                        </li>
                    )}
                    {session && (
                        <li>
                            <Link href="/admin" onClick={() => setMenuIsOpen(false)}>
                                Admin
                            </Link>
                        </li>
                    )}
                    {session && (
                        <button onClick={logoutHandler} className={styles.logout}>
                            Logout
                        </button>
                    )}
                </ul>
            </nav>
        </header>
    )
}
