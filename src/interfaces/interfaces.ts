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

export interface AdminFormProps {
    onChangePassword: (passwordData: { oldPassword: string; newPassword: string }) => void
}

export type ParamsType = Promise<{ slug: string }>
