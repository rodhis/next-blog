'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import styles from '@/styles/admin-sidebar.module.css'

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className={styles.sidebar}>
      <nav>
        <ul>
          <li className={pathname === '/admin/messages' ? styles.active : ''}>
            <Link href="/admin/messages">Messages</Link>
          </li>
          <li className={pathname === '/admin/account' ? styles.active : ''}>
            <Link href="/admin/account">Account</Link>
          </li>
          <li>
            <button onClick={() => signOut({ callbackUrl: '/' })}>Exit</button>
          </li>
        </ul>
      </nav>
    </aside>
  )
}