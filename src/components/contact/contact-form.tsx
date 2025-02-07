"use client"

import styles from '@/styles/contact-form.module.css'
import { useState } from 'react'

export default function ContactForm() {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        message: '',
    })

    function sendMessageHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: formData.email,
                name: formData.name,
                message: formData.message,
            }),
        })
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
        </section>
    )
}
