'use client'

import { useState } from 'react'
import { signOut } from 'next-auth/react'
import { useNotification } from '@/contexts/notification-context'
import styles from '@/styles/delete-account.module.css'

export default function DeleteAccount() {
    const [isLoading, setIsLoading] = useState(false)
    const { showNotification } = useNotification()

    const handleDeleteAccount = async () => {
        const confirmation = window.confirm(
            'Are you sure you want to delete your account? This action cannot be undone.'
        )

        if (!confirmation) return

        setIsLoading(true)

        try {
            showNotification({
                status: 'pending',
                title: 'Processing...',
                message: 'Delete request is being processed...',
            })

            const response = await fetch('/api/delete-account', {
                method: 'DELETE',
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Account deletion failed')
            }

            showNotification({
                status: 'success',
                title: 'Success!',
                message: data.message || 'Account deleted successfully',
            })

            setTimeout(() => signOut({ callbackUrl: '/' }), 2000)
        } catch (error) {
            console.error('Error deleting account:', error)
            showNotification({
                status: 'error',
                title: 'Error!',
                message: error instanceof Error ? error.message : 'Account deletion failed',
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={styles.form}>
            <h2>Delete Account</h2>

            <div className={styles.control}>
                <p className={styles.warningText}>
                    WARNING: This action will permanently remove your account and all associated data.
                </p>
            </div>

            <div className={styles.action}>
                <button
                    onClick={handleDeleteAccount}
                    disabled={isLoading}
                    className={styles.destructiveButton}
                >
                    {isLoading ? 'Deleting' : 'Permanently Delete Account'}
                </button>
            </div>
        </div>
    )
}
