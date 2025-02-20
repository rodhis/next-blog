import Link from 'next/link'

import styles from '@/styles/main-navigation.module.css'
import Logo from './logo'

export default function MainNavigation() {
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
                    <li>
                        <Link href="/profile">Profile</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
