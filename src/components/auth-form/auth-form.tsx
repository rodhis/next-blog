'use client'

import { signIn } from 'next-auth/react'

import { useRouter } from 'next/navigation'

import { useState, useRef, useEffect } from 'react'

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
        throw new Error(data.message || 'Something went wrong!')
    }

    return data
}

export default function AuthForm() {
    const emailInputRef = useRef<HTMLInputElement>(null)
    const passwordInputRef = useRef<HTMLInputElement>(null)
    const adminKeyRef = useRef<HTMLInputElement>(null)

    const [isLogin, setIsLogin] = useState(true)

    const [error, setError] = useState<string | null>(null)

    const router = useRouter()

    useEffect(() => {
        const clearError = () => setError(null)

        const inputs = [
            emailInputRef.current,
            passwordInputRef.current,
            ...(!isLogin ? [adminKeyRef.current] : []),
        ].filter(Boolean) as HTMLInputElement[]

        inputs.forEach((input) => input.addEventListener('input', clearError))

        return () => {
            inputs.forEach((input) => input.removeEventListener('input', clearError))
        }
    }, [isLogin])

    function switchAuthModeHandler() {
        setIsLogin((prevState) => !prevState)
        setError(null)
    }

    async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setError(null)

        const enteredEmail = emailInputRef.current!.value
        const enteredPassword = passwordInputRef.current!.value
        const adminKeyInput = adminKeyRef.current!.value

        const adminAuthKey = process.env.NEXT_PUBLIC_ADMIN_AUTH_KEY

        if (!isLogin && adminKeyInput !== adminAuthKey) {
            setError('Invalid Admin Authorization Key')
            return
        }

        if (enteredPassword.trim().length < 8) {
            setError('Password must be at least 6 characters long.')
            return
        }

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
                setError(errorMessage)
            } else {
                router.replace('/profile')
            }
        } else {
            try {
                await createUser(enteredEmail, enteredPassword)
                setError('User created successfully! Login to continue.')

                emailInputRef.current!.value = ''
                passwordInputRef.current!.value = ''
                adminKeyRef.current!.value = ''

                setTimeout(() => {
                    setIsLogin(true)
                    setError(null)
                }, 3000)
            } catch (error) {
                console.error('Registration error:', error)
                setError('Operation failed. Please check your credentials and try again.')
                
                emailInputRef.current!.value = ''
                passwordInputRef.current!.value = ''
                if (adminKeyRef.current) adminKeyRef.current.value = ''
            }
        }
    }

    return (
        <section className={styles.auth}>
            <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
            <form onSubmit={submitHandler}>
                <div className={styles.control}>
                    <label htmlFor="email">Your Email</label>
                    <input type="email" id="email" required ref={emailInputRef} autoComplete="username" />
                </div>
                <div className={styles.control}>
                    <label htmlFor="password">Your Password</label>
                    <input
                        type="password"
                        id="password"
                        required
                        ref={passwordInputRef}
                        autoComplete="current-password"
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
                        />
                    </div>
                )}

                {error && <p className={styles.error}>{error}</p>}
                <div className={styles.actions}>
                    <button>{isLogin ? 'Login' : 'Create Account'}</button>
                    <button type="button" className={styles.toggle} onClick={switchAuthModeHandler}>
                        {isLogin ? 'Create new account' : 'Login with existing account'}
                    </button>
                </div>
            </form>
        </section>
    )
}
