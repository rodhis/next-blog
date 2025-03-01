'use client'

import { useState } from 'react'

import AdminForm from './admin-form'

import styles from '@/styles/admin-profile.module.css'

export default function AdminProfile() {
    const [message, setMessage] = useState<string | null>(null)
    const changePasswordHandler = async(passwordData: { oldPassword: string; newPassword: string }) => {
        try {
            const response = await fetch('/api/change-password', {
                method: 'PATCH',
                body: JSON.stringify(passwordData),
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Failed to change password')
            }

            setMessage('Password changed successfully!')
            console.log('Success:', data)
        } catch (error) {
            console.error('Error:', error)
            if (error instanceof Error) {
                setMessage(error.message || 'Failed to change password')
            } else {
                setMessage('Failed to change password')
            }
        }
    }

    return (
        <section className={styles.profile}>
            <h1>Your User Profile</h1>
            <AdminForm onChangePassword={changePasswordHandler} />
            {message && <div className={styles.message}>{message}</div>}
        </section>
    )
}
