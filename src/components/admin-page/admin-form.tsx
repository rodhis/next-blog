'use client'

import { useRef } from 'react'

import { AdminFormProps } from '@/interfaces/interfaces'

import styles from '@/styles/admin-form.module.css'

export default function AdminForm({ onChangePassword }: AdminFormProps) {
    const oldPasswordRef = useRef<HTMLInputElement>(null)
    const newPasswordRef = useRef<HTMLInputElement>(null)

    function changePasswordHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (!oldPasswordRef.current || !newPasswordRef.current) {
            alert('Please fill in all fields')
            return
        }

        const enteredOldPassword = oldPasswordRef.current.value
        const enteredNewPassword = newPasswordRef.current.value

        if (enteredNewPassword.length < 8) {
            alert('New password must be at least 8 characters')
            return
        }

        if (enteredOldPassword === enteredNewPassword) {
            alert('New password must be different from old password')
            return
        }

        onChangePassword({ oldPassword: enteredOldPassword, newPassword: enteredNewPassword })
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
                    />
                </div>
                <div className={styles.action}>
                    <button>Change Password</button>
                </div>
            </form>
        </>
    )
}
