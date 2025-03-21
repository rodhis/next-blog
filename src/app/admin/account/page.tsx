import ChangePassword from '@/components/admin-page/change-password'
import DeleteAccount from '@/components/admin-page/delete-account'

import styles from '@/styles/account.module.css'

export default function AccountPage() {
    return (
        <div className={styles.container}>
            <ChangePassword />
            <DeleteAccount />
        </div>
    )
}
