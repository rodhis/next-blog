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

export type ParamsType = Promise<{ slug: string }>