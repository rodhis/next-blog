'use client'

import { useState } from 'react'
import { useNotification } from '@/contexts/notification-context'

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
    const { showNotification } = useNotification()

    const [isSubmitting, setIsSubmitting] = useState(false)

    const [formData, setFormData] = useState({
        email: '',
        name: '',
        message: '',
    })

    async function sendMessageHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsSubmitting(true)

        showNotification({
            title: 'Sending message...',
            message: 'Your message is on its way!',
            status: 'pending',
        })

        try {
            await sendContactData({
                email: formData.email,
                name: formData.name,
                message: formData.message,
            })

            showNotification({
                title: 'Success!',
                message: 'Message sent successfully!',
                status: 'success',
            })

            setFormData({ email: '', name: '', message: '' })
        } catch (error) {
            showNotification({
                title: 'Error!',
                message: (error as Error).message || 'Failed to send message',
                status: 'error',
            })
            console.error(`Error sending message: ${error}`)
        } finally {
            setIsSubmitting(false)
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
                            disabled={isSubmitting}
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
                            disabled={isSubmitting}
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
                        disabled={isSubmitting}
                    ></textarea>
                </div>
                <div className={styles.actions}>
                    <button disabled={isSubmitting}>{isSubmitting ? 'Sending...' : 'Send Message'}</button>
                </div>
            </form>
        </section>
    )
}
