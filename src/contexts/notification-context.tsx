'use client'

import { createContext, useContext, useState, useCallback, ReactNode, useRef, useEffect } from 'react'

import { NotificationContextType, NotificationProps } from '@/interfaces/interfaces'

const NotificationContext = createContext<NotificationContextType | null>(null)

export function NotificationProvider({ children }: { children: ReactNode }) {
    const [notification, setNotification] = useState<NotificationProps | null>(null)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    const hideNotification = useCallback(() => {
        setNotification(null)
    }, [])

    const showNotification = useCallback(
        (notificationData: NotificationProps) => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }

            setNotification(notificationData)

            timeoutRef.current = setTimeout(() => hideNotification(), notificationData.status === 'pending' ? 3000 : 6000)
        },
        [hideNotification]
    )

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [])

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
