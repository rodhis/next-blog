'use client'

import { useState } from 'react'
import Notification from '../ui/notification'
import styles from '@/styles/contact-form.module.css'

async function sendContactData(contactDetails: { email: string; name: string; message: string }) {
    const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactDetails),
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!')
    }
}

export default function ContactForm() {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        message: '',
        requestStatus: '' as 'pending' | 'success' | 'error' | '',
        requestError: '',
    })

    async function sendMessageHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        setFormData((prev) => ({ ...prev, requestStatus: 'pending' }))

        try {
            await sendContactData({
                email: formData.email,
                name: formData.name,
                message: formData.message,
            })
            setFormData((prev) => ({ ...prev, requestStatus: 'success', requestError: '' }))
        } catch (error) {
            setFormData((prev) => ({
                ...prev,
                requestStatus: 'error',
                requestError: (error as Error).message,
            }))
            console.error(`Error sending message: ${error}`)
            return
        }
    }

    let notification
    if (formData.requestStatus) {
        notification = {
            status: formData.requestStatus,
            title:
                formData.requestStatus === 'success'
                    ? 'Success!'
                    : formData.requestStatus === 'error'
                    ? 'Error!'
                    : 'Sending message...',
            message:
                formData.requestStatus === 'success'
                    ? 'Message sent successfully!'
                    : formData.requestStatus === 'error'
                    ? formData.requestError
                    : 'Your message is on its way!',
        }
    }

    return (
        <section className={styles.contact}>
            <h1>Need assistance? Have suggestions? Contact me!</h1>
            <form className={styles.form} onSubmit={sendMessageHandler}>
                <div className={styles.controls}>
                    <div className={styles.control}>
                        <label htmlFor="email">Your Email</label>
                        <input
                            type="email"
                            id="email"
                            required
                            value={formData.email}
                            onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                        />
                    </div>
                    <div className={styles.control}>
                        <label htmlFor="name">Your Name</label>
                        <input
                            type="text"
                            id="name"
                            required
                            value={formData.name}
                            onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                        />
                    </div>
                </div>
                <div className={styles.control}>
                    <label htmlFor="message">Your Message</label>
                    <textarea
                        id="message"
                        rows={6}
                        required
                        value={formData.message}
                        onChange={(event) => setFormData({ ...formData, message: event.target.value })}
                    ></textarea>
                </div>
                <div className={styles.actions}>
                    <button>Send Message</button>
                </div>
            </form>
            {notification && (
                <Notification
                    status={notification.status}
                    title={notification.title}
                    message={notification.message}
                />
            )}
        </section>
    )
}
