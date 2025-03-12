import ReactDOM from 'react-dom'

import { NotificationProps } from '@/interfaces/interfaces'

import styles from '@/styles/notification.module.css'

function Notification(props: NotificationProps) {
    const { title, message, status } = props

    let statusClasses = ''

    if (status === 'success') {
        statusClasses = styles.success
    }

    if (status === 'error') {
        statusClasses = styles.error
    }

    const cssClasses = `${styles.notification} ${statusClasses}`

    const notificationElement = document.getElementById('notifications')

    if (!notificationElement) {
        return null
    }

    return ReactDOM.createPortal(
        <div className={cssClasses}>
            <h2>{title}</h2>
            <p>{message}</p>
        </div>,
        notificationElement
    )
}

export default Notification
