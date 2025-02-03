import Link from "next/link"
import Image from "next/image"

import styles from "@/styles/post-item.module.css"

import { Post } from "@/interfaces/Post"

interface PostItemProps {
    post: Post
}

export default function PostItem(props: PostItemProps) {
    const { title, image, excerpt, date, slug } = props.post

    const formattedDate = new Date(date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    })

    const imagePath = `/images/posts/${slug}/${image}`
    const linkPath = `/posts/${slug}`

    return (
        <li className={styles.post}>
            <Link href={linkPath}>
                <div className={styles.image}>
                    <Image
                        src={imagePath}
                        alt={title}
                        width={300}
                        height={200}
                        style={{ width: "100%", height: "auto" }}
                    />
                </div>
                <div className={styles.content}>
                    <h3>{title}</h3>
                    <time>{formattedDate}</time>
                    <p>{excerpt}</p>
                </div>
            </Link>
            <p>Post Excerpt</p>
        </li>
    )
}
