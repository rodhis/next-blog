'use client'

import { useEffect, useState } from 'react'
import { useNotification } from '@/contexts/notification-context'

import mongodbConnect from '@/lib/mongodb-connect'

import { Message } from '@/interfaces/interfaces'

export function useMessages() {
    const [messages, setMessages] = useState<Message[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const { showNotification } = useNotification()

    useEffect(() => {
        const loadMessages = async () => {
            showNotification({
                title: 'Loading...',
                message: 'Fetching messages from database',
                status: 'pending',
            })

            let client
            try {
                client = await mongodbConnect()
                if (!client) throw new Error('Database connection failed')

                const db = client.db('next1')
                const result = await db.collection('next-blog-messages').find().sort({ createdAt: -1 }).toArray()

                const serializedMessages = result.map(serializeMessage)
                setMessages(serializedMessages)
                showNotification({
                    title: 'Success!',
                    message: `Loaded ${result.length} messages`,
                    status: 'success',
                })
            } catch (error) {
                console.error('Error fetching messages:', error)
                showNotification({
                    title: 'Error!',
                    message: (error as Error).message || 'Failed to load messages',
                    status: 'error',
                })
            } finally {
                setIsLoading(false)
                await client?.close()
            }
        }

        loadMessages()
    }, [showNotification])

    return { messages, isLoading }
}

import { ObjectId } from 'mongodb'

function serializeMessage(msg: { _id: ObjectId; message?: string; email?: string; name?: string; createdAt?: Date }): Message {
    return {
        _id: msg._id.toString(),
        message: msg.message || '',
        email: msg.email || '',
        name: msg.name || '',
        createdAt: msg.createdAt?.toISOString() || new Date().toISOString(),
    }
}
