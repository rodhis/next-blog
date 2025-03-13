export interface Post {
    slug: string
    title: string
    date: string
    image: string
    excerpt: string
    content: string
    isFeatured: boolean
}

export interface NotificationProps {
    title: string
    message: string
    status: 'success' | 'error' | 'pending'
}

export interface NotificationContextType {
    notification: NotificationProps | null
    showNotification: (notificationData: NotificationProps) => void
    hideNotification: () => void
}

export interface AdminFormProps {
    onChangePassword: (passwordData: { oldPassword: string; newPassword: string }) => Promise<void>
}

export type ParamsType = Promise<{ slug: string }>
