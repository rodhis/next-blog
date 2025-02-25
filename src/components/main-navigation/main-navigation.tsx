'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'

import styles from '@/styles/main-navigation.module.css'
import Logo from './logo'

export default function MainNavigation() {
    const { data: session, status } = useSession()

    console.log(session)
    console.log(status)

    return (
        <header className={styles.header}>
            <Link href="/">
                <Logo />
            </Link>
            <nav>
                <ul>
                    <li>
                        <Link href="/posts">Posts</Link>
                    </li>
                    <li>
                        <Link href="/contact">Contact</Link>
                    </li>
                    {!session && status !== 'loading' && (
                        <li>
                            <Link href="/auth">Login</Link>
                        </li>
                    )}
                    {session && (
                        <li>
                            <Link href="/profile">Profile</Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    )
}
