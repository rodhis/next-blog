'use client'

import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { useNotification } from '@/contexts/notification-context'
import styles from '@/styles/notification.module.css'

export default function Notification() {
    const { notification } = useNotification()
    const [isBrowser, setIsBrowser] = useState(false)

    useEffect(() => {
        setIsBrowser(true)
    }, [])

    if (!isBrowser || !notification) return null

    const statusClasses =
        notification.status === 'success'
            ? styles.success
            : notification.status === 'error'
            ? styles.error
            : ''

    const cssClasses = `${styles.notification} ${statusClasses}`
    const portalElement = document.getElementById('notifications')

    if (!portalElement) return null

    return ReactDOM.createPortal(
        <div className={cssClasses}>
            <h2>{notification.title}</h2>
            <p>{notification.message}</p>
        </div>,
        portalElement
    )
}
