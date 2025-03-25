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

export interface Message {
  _id: string
  message: string
  email: string
  name: string
  createdAt: string
}

export type ParamsType = Promise<{ slug: string }>
