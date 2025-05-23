import Image from 'next/image'

import styles from '@/styles/post-header.module.css'

export default function PostHeader(props: { title: string; image: string }) {
    const { title, image } = props

    return (
        <header className={styles.header}>
            <h1>{title}</h1>
            <Image src={image} alt={title} width={200} height={150} />
        </header>
    )
}
