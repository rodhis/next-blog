import AdminForm from './admin-form';

import styles from '@/styles/admin-profile.module.css';

export default function AdminProfile() {
  // Redirect away if NOT auth

  return (
    <section className={styles.profile}>
      <h1>Your User Profile</h1>
      <AdminForm />
    </section>
  );
}

