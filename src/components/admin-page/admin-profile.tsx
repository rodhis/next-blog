// 'use client'

// import { getSession } from 'next-auth/react'
// import { Session } from 'next-auth'

// import { useState, useEffect } from 'react'

import AdminForm from './admin-form'

import styles from '@/styles/admin-profile.module.css'

export default function AdminProfile() {
    // const [isLoading, setIsLoading] = useState(true)
    // const [loadedSession, setLoadedSession] = useState<Session | null>(null)

    // useEffect(() => {
    //     getSession().then((session) => {
    //         if (!session) {
    //             window.location.href = '/auth'
    //         } else {
    //             setIsLoading(false)
    //             setLoadedSession(session)
    //         }
    //     })
    // }, [])

    // if (isLoading) {
    //     return <p className={styles.profile}>Loading...</p>
    // }

    return (
        <section className={styles.profile}>
            <h1>Your User Profile</h1>
            <AdminForm />
        </section>
    )
}
