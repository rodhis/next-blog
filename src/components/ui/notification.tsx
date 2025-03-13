import ReactDOM from 'react-dom'

import { useNotification } from '@/contexts/notification-context'

import styles from '@/styles/notification.module.css'

export default function Notification() {
    const { notification } = useNotification()

    if (!notification) return null

    let statusClasses = ''

    if (notification.status === 'success') {
        statusClasses = styles.success
    }

    if (notification.status === 'error') {
        statusClasses = styles.error
    }

    const cssClasses = `${styles.notification} ${statusClasses}`

    const notificationElement = document.getElementById('notifications')

    if (!notificationElement) return null

    return ReactDOM.createPortal(
        <div className={cssClasses}>
            <h2>{notification.title}</h2>
            <p>{notification.message}</p>
        </div>,
        notificationElement
    )
}
