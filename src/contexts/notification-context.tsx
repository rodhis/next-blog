'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { NotificationContextType, NotificationProps } from '@/interfaces/interfaces'

const NotificationContext = createContext<NotificationContextType | null>(null)

export function NotificationProvider({ children }: { children: ReactNode }) {
    const [notification, setNotification] = useState<NotificationProps | null>(null)
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

    const hideNotification = useCallback(() => {
        setNotification(null)
        if (timeoutId) {
            clearTimeout(timeoutId)
            setTimeoutId(null)
        }
    }, [timeoutId])

    const showNotification = useCallback(
        (notificationData: NotificationProps) => {
            setNotification(notificationData)

            if (timeoutId) clearTimeout(timeoutId)

            const newTimeoutId = setTimeout(
                () => {
                    hideNotification()
                },
                notificationData.status === 'pending' ? 3000 : 6000
            )

            setTimeoutId(newTimeoutId)
        },
        [hideNotification, timeoutId]
    )

    return (
        <NotificationContext.Provider value={{ notification, showNotification, hideNotification }}>
            {children}
        </NotificationContext.Provider>
    )
}

export const useNotification = () => {
    const context = useContext(NotificationContext)
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider')
    }
    return context
}
