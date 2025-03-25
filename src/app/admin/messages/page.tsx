

import mongodbConnect from '@/lib/mongodb-connect'
import MessagesList from '@/components/admin-page/messages-list'

import styles from '@/styles/messages.module.css'

export default async function MessagesPage() {
  const client = await mongodbConnect()
  
  if (!client) {
    return (
      <div className={styles.container}>
        <h1>Database Connection Error</h1>
      </div>
    )
  }

  try {
    const db = client.db('next1')
    const messages = await db.collection('next-blog-messages')
      .find()
      .sort({ createdAt: -1 })
      .toArray()

    const serializedMessages = messages.map(msg => ({
      _id: msg._id.toString(),
      message: msg.message || '', // Fallback for undefined
      email: msg.email || '',
      name: msg.name || '',
      createdAt: msg.createdAt?.toISOString() || new Date().toISOString() // Fallback for missing dates
    }))

    return (
      <div className={styles.container}>
        <h1>Messages</h1>
        <MessagesList initialMessages={serializedMessages} />
      </div>
    )
  } catch (error) {
    console.error("Error fetching messages:", error)
    return (
      <div className={styles.container}>
        <h1>Error Loading Messages</h1>
        <p>{(error as Error).message}</p>
      </div>
    )
  } finally {
    await client.close()
  }
}