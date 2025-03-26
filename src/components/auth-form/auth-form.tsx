'use client'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import { useState, useRef } from 'react'
import { useNotification } from '@/contexts/notification-context'

import styles from '@/styles/auth-form.module.css'

async function createUser(email: string, password: string) {
    const response = await fetch('/api/auth', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const data = await response.json()

    if (!response.ok) {
        const genericError = response.status === 409 ? 'Registration conflict' : 'Operation failed'
        throw new Error(genericError)
    }

    return data
}

export default function AuthForm() {
    const emailInputRef = useRef<HTMLInputElement>(null)
    const passwordInputRef = useRef<HTMLInputElement>(null)
    const adminKeyRef = useRef<HTMLInputElement>(null)

    const [isLogin, setIsLogin] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    const { showNotification } = useNotification()

    const router = useRouter()

    function resetSensitiveFields() {
        if (emailInputRef.current) emailInputRef.current.value = ''
        if (passwordInputRef.current) passwordInputRef.current.value = ''
        if (adminKeyRef.current) adminKeyRef.current.value = ''
    }

    function switchAuthModeHandler() {
        setIsLogin((prevState) => !prevState)
        resetSensitiveFields()
    }

    async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)

        try {
            const enteredEmail = emailInputRef.current!.value
            const enteredPassword = passwordInputRef.current!.value
            const adminKeyInput = !isLogin ? adminKeyRef.current!.value : ''

            if (!isLogin) {
                try {
                    const validation = await fetch('/api/validate-admin', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ adminKey: adminKeyInput }),
                    })

                    const data = await validation.json()

                    if (!validation.ok || !data.valid) {
                        showNotification({
                            title: 'Error',
                            message: 'Invalid Admin Authorization Key',
                            status: 'error',
                        })
                        resetSensitiveFields()
                        return
                    }
                } catch (error) {
                    console.error('Validation error:', error)
                    showNotification({
                        title: 'Error',
                        message: 'Failed to validate admin key',
                        status: 'error',
                    })
                    resetSensitiveFields()
                    return
                }
            }

            if (enteredPassword.trim().length < 8) {
                showNotification({
                    title: 'Error',
                    message: 'Password must be at least 8 characters long',
                    status: 'error',
                })
                resetSensitiveFields()
                return
            }

            showNotification({
                title: isLogin ? 'Authenticating...' : 'Creating Account...',
                message: isLogin ? 'Verifying your credentials' : 'Setting up your admin account',
                status: 'pending',
            })

            if (isLogin) {
                const result = await signIn('credentials', {
                    email: enteredEmail,
                    password: enteredPassword,
                    redirect: false,
                })

                if (result?.error) {
                    const errorMessage = result.error.includes('Incorrect password')
                        ? 'Incorrect password'
                        : 'Authentication failed'
                    showNotification({
                        title: 'Error',
                        message: errorMessage,
                        status: 'error',
                    })
                    resetSensitiveFields()
                } else {
                    showNotification({
                        title: 'Success!',
                        message: 'Login successful! Redirecting...',
                        status: 'success',
                    })
                    setTimeout(() => {
                        router.replace('/admin')
                    }, 1500)
                }
            } else {
                await createUser(enteredEmail, enteredPassword)
                showNotification({
                    title: 'Success!',
                    message: 'User created successfully! Login to continue.',
                    status: 'success',
                })
                resetSensitiveFields()

                setTimeout(() => {
                    setIsLogin(true)
                }, 3000)
            }
        } catch (error) {
            console.log(error)
            showNotification({
                title: 'Error',
                message: (error as Error).message || 'Operation failed',
                status: 'error',
            })
            resetSensitiveFields()
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section className={styles.auth}>
            <h1>{isLogin ? 'Login' : 'Admin Registration'}</h1>
            <form onSubmit={submitHandler}>
                <div className={styles.control}>
                    <label htmlFor="email">Your Email</label>
                    <input type="email" id="email" required ref={emailInputRef} autoComplete="username" disabled={isLoading} />
                </div>
                <div className={styles.control}>
                    <label htmlFor="password">Your Password</label>
                    <input
                        type="password"
                        id="password"
                        required
                        ref={passwordInputRef}
                        autoComplete="current-password"
                        disabled={isLoading}
                    />
                </div>

                {!isLogin && (
                    <div className={styles.control}>
                        <label htmlFor="admin-key">Admin Authorization Key</label>
                        <input
                            type="password"
                            id="admin-key"
                            required
                            ref={adminKeyRef}
                            autoComplete="admin-key"
                            disabled={isLoading}
                        />
                    </div>
                )}

                <div className={styles.actions}>
                    <button disabled={isLoading}>
                        {' '}
                        {isLogin ? (isLoading ? 'Logging in...' : 'Login') : isLoading ? 'Creating...' : 'Create Account'}
                    </button>
                    <button type="button" className={styles.toggle} disabled={isLoading} onClick={switchAuthModeHandler}>
                        {isLogin ? 'Admin Registration' : 'Login with existing account'}
                    </button>
                </div>
            </form>
        </section>
    )
}
