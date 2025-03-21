'use client'

import AdminForm from './admin-form'

import styles from '@/styles/admin-profile.module.css'

export default function ChangePassword() {
    const changePasswordHandler = async (passwordData: { oldPassword: string; newPassword: string }) => {
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

        console.log('Success:', data)
    }

    return (
        <section className={styles.profile}>
            <h1>Your User Profile</h1>
            <AdminForm onChangePassword={changePasswordHandler} />
        </section>
    )
}
