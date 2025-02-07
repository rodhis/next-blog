import styles from '@/styles/contact-form.module.css'

export default function ContactForm() {
    return (
        <section className={styles.contact}>
            <h1>Need assistance? Have suggestions? Contact me!</h1>
            <form className={styles.form}>
                <div className={styles.controls}>
                    <div className={styles.control}>
                        <label htmlFor="email">Your Email</label>
                        <input type="email" id="email" required />
                    </div>
                    <div className={styles.control}>
                        <label htmlFor="name">Your Name</label>
                        <input type="text" id="name" required />
                    </div>
                </div>
                <div className={styles.control}>
                    <label htmlFor="message">Your Message</label>
                    <textarea id="message" rows={5} required></textarea>
                </div>
                <div className={styles.actions}>
                    <button>Send Message</button>
                </div>
            </form>
        </section>
    )
}
