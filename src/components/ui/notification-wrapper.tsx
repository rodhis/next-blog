'use client'

import { NotificationProvider } from '@/contexts/notification-context'
import Notification from '@/components/ui/notification'

export function NotificationWrapper({ children }: { children: React.ReactNode }) {
    return (
        <NotificationProvider>
            {children}
            <Notification />
        </NotificationProvider>
    )
}
