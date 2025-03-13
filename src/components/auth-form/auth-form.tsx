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

    const [notice, setNotice] = useState<string | null>(null)
    const [isSuccess, setIsSuccess] = useState(false)

    const router = useRouter()

    function resetSensitiveFields() {
        if (emailInputRef.current) emailInputRef.current.value = ''
        if (passwordInputRef.current) passwordInputRef.current.value = ''
        if (adminKeyRef.current) adminKeyRef.current.value = ''
    }

    useEffect(() => {
        const clearError = () => setNotice(null)

        const inputs = [emailInputRef.current, passwordInputRef.current, ...(!isLogin ? [adminKeyRef.current] : [])].filter(
            Boolean
        ) as HTMLInputElement[]

        inputs.forEach((input) => input.addEventListener('input', clearError))

        return () => {
            inputs.forEach((input) => input.removeEventListener('input', clearError))
            resetSensitiveFields()
        }
    }, [isLogin])

    function switchAuthModeHandler() {
        setIsLogin((prevState) => !prevState)
        setNotice(null)
    }

    async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setNotice(null)
        setIsSuccess(false)

        const enteredEmail = emailInputRef.current!.value
        const enteredPassword = passwordInputRef.current!.value
        const adminKeyInput = adminKeyRef.current!.value

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
                    throw new Error('Admin key validation failed')
                }
            } catch (error) {
                console.error('Validation error:', error)
                setNotice('Invalid Admin Authorization Key')
                resetSensitiveFields()
                return
            }
        }

        if (enteredPassword.trim().length < 8) {
            setNotice('Password must be at least 8 characters long.')
            resetSensitiveFields()
            return
        }

        if (isLogin) {
            const result = await signIn('credentials', {
                email: enteredEmail,
                password: enteredPassword,
                redirect: false,
            })

            if (result?.error) {
                const errorMessage = result.error.includes('Incorrect password') ? 'Incorrect password' : 'Authentication failed'
                setNotice(errorMessage)
                resetSensitiveFields()
            } else {
                router.replace('/profile')
            }
        } else {
            try {
                await createUser(enteredEmail, enteredPassword)
                setNotice('User created successfully! Login to continue.')
                setIsSuccess(true)
                resetSensitiveFields()

                setTimeout(() => {
                    setIsLogin(true)
                    setNotice(null)
                    setIsSuccess(false)
                }, 3000)
            } catch (error) {
                console.log(error)
                setNotice('Operation failed. Please check your credentials.')
                resetSensitiveFields()
            }
        }
    }

    return (
        <section className={styles.auth}>
            <h1>{isLogin ? 'Login' : 'Admin Registration'}</h1>
            <form onSubmit={submitHandler}>
                <div className={styles.control}>
                    <label htmlFor="email">Your Email</label>
                    <input type="email" id="email" required ref={emailInputRef} autoComplete="username" />
                </div>
                <div className={styles.control}>
                    <label htmlFor="password">Your Password</label>
                    <input type="password" id="password" required ref={passwordInputRef} autoComplete="current-password" />
                </div>

                {!isLogin && (
                    <div className={styles.control}>
                        <label htmlFor="admin-key">Admin Authorization Key</label>
                        <input type="password" id="admin-key" required ref={adminKeyRef} autoComplete="admin-key" />
                    </div>
                )}

                {notice && <p className={`${styles.notice} ${isSuccess ? styles.success : ''}`}>{notice}</p>}
                <div className={styles.actions}>
                    <button>{isLogin ? 'Login' : 'Create Account'}</button>
                    <button type="button" className={styles.toggle} onClick={switchAuthModeHandler}>
                        {isLogin ? 'Admin Registration' : 'Login with existing account'}
                    </button>
                </div>
            </form>
        </section>
    )
}
