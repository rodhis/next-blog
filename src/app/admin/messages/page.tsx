'use client'

import { useMessages } from '@/hooks/use-messages'
import MessagesList from '@/components/admin-page/messages-list'

import styles from '@/styles/messages.module.css'

export default function MessagesPage() {
    const { messages, isLoading } = useMessages()

    if (isLoading) {
        return (
            <div className={styles.container}>
                <h1>Messages</h1>
                <p>Loading messages...</p>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <h1>Messages</h1>
            <MessagesList initialMessages={messages} />
        </div>
    )
}
