'use client'

import { useRef, useState } from 'react'
import { useNotification } from '@/contexts/notification-context'

import { AdminFormProps } from '@/interfaces/interfaces'

import styles from '@/styles/admin-form.module.css'

export default function AdminForm({ onChangePassword }: AdminFormProps) {
    const { showNotification } = useNotification()
    const oldPasswordRef = useRef<HTMLInputElement>(null)
    const newPasswordRef = useRef<HTMLInputElement>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    async function changePasswordHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsSubmitting(true)

        try {
            if (!oldPasswordRef.current || !newPasswordRef.current) {
                showNotification({
                    title: 'Error',
                    message: 'Please fill in all fields',
                    status: 'error',
                })
                return
            }

            const enteredOldPassword = oldPasswordRef.current.value
            const enteredNewPassword = newPasswordRef.current.value

            if (enteredNewPassword.length < 8) {
                showNotification({
                    title: 'Error',
                    message: 'New password must be at least 8 characters',
                    status: 'error',
                })
                return
            }

            if (enteredOldPassword === enteredNewPassword) {
                showNotification({
                    title: 'Error',
                    message: 'New password must be different from old password',
                    status: 'error',
                })
                return
            }

            await onChangePassword({
                oldPassword: enteredOldPassword,
                newPassword: enteredNewPassword,
            })

            oldPasswordRef.current.value = ''
            newPasswordRef.current.value = ''

            showNotification({
                title: 'Success',
                message: 'Password changed successfully!',
                status: 'success',
            })
        } catch (error) {
            showNotification({
                title: 'Error',
                message: (error as Error).message || 'Failed to change password',
                status: 'error',
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <h2>Change Password?</h2>
            <form className={styles.form} onSubmit={changePasswordHandler}>
                <div className={styles.control}>
                    <label htmlFor="old-password">Old Password</label>
                    <input
                        type="password"
                        id="old-password"
                        ref={oldPasswordRef}
                        autoComplete="current-password"
                        required
                        disabled={isSubmitting}
                    />
                </div>
                <div className={styles.control}>
                    <label htmlFor="new-password">New Password</label>
                    <input
                        type="password"
                        id="new-password"
                        ref={newPasswordRef}
                        minLength={8}
                        autoComplete="new-password"
                        required
                        disabled={isSubmitting}
                    />
                </div>
                <div className={styles.action}>
                    <button disabled={isSubmitting}>{isSubmitting ? 'Changing...' : 'Change Password'}</button>
                </div>
            </form>
        </>
    )
}
