'use client'

import { useState } from 'react'

import { Message } from '@/interfaces/interfaces'
import styles from '@/styles/messages-list.module.css'

export default function MessagesList({ initialMessages }: { initialMessages: Message[] }) {
    const [messages, setMessages] = useState(initialMessages)

    const handleDelete = async (messageId: string) => {
        const confirmed = window.confirm('Are you sure you want to delete this message?')
        if (!confirmed) return

        try {
            const response = await fetch(`/api/messages/${messageId}`, {
                method: 'DELETE',
            })

            if (!response.ok) throw new Error('Failed to delete message')

            setMessages(messages.filter((msg) => msg._id !== messageId))
        } catch (error) {
            console.error('Delete error:', error)
            alert('Failed to delete message')
        }
    }

    return (
        <div className={styles.list}>
            {messages.map((message) => (
                <div key={message._id} className={styles.message}>
                    <div className={styles.content}>
                        <p>{message.message}</p>
                        <div className={styles.meta}>
                            <span>{message.name}</span>
                            <span>{message.email}</span>
                            <span>
                                {new Date(message.createdAt)
                                    .toLocaleString('en-US', {
                                        weekday: 'short',
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: false,
                                    })
                                    .replace(',', '')}
                            </span>
                        </div>
                    </div>
                    <button onClick={() => handleDelete(message._id)} className={styles.deleteButton}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    )
}
