'use client'

import { signIn } from 'next-auth/react'

import { useRouter } from 'next/navigation'

import { useState, useRef } from 'react'

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

    const [isLogin, setIsLogin] = useState(true)

    const [error, setError] = useState<string | null>(null)

    const router = useRouter()

    function switchAuthModeHandler() {
        setIsLogin((prevState) => !prevState)
        setError(null)
    }

    async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setError(null)

        const enteredEmail = emailInputRef.current!.value
        const enteredPassword = passwordInputRef.current!.value

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

            console.log(result)
        } else {
            try {
                const result = await createUser(enteredEmail, enteredPassword)
                console.log(result)
            } catch (error) {
                console.log(error)
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
