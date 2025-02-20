import styles from '@/styles/admin-form.module.css';

export default function AdminForm() {
  return (
    <>
    <h2>Change Password?</h2>
    <form className={styles.form}>
      <div className={styles.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' />
      </div>
      <div className={styles.control}>
        <label htmlFor='old-password'>Old Password</label>
        <input type='password' id='old-password' />
      </div>
      <div className={styles.action}>
        <button>Change Password</button>
      </div>
    </form>
    </>
  );
}