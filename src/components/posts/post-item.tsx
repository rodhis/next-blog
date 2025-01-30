import Link from "next/link"
import Image from "next/image"

import styles from "@/styles/post-item.module.css"

interface Post {
    title: string;
    image: string;
    excerpt: string;
    date: string;
    slug: string;
}

interface PostItemProps {
    post: Post;
}

export default function PostItem(props: PostItemProps) {
    const { title, image, excerpt, date, slug } = props.post

    const formattedDate = new Date(date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    })

    const imagePath = `/images/posts/${slug}/${image}`
    
    return (
        <li className={styles.post}>
            <Link href="/posts/[slug]" as={`/posts/${slug}`}>
                <div className={styles.image}>
                    <Image src={imagePath} alt={title} width={300} height={200} />
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
