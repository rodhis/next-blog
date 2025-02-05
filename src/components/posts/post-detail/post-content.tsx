import PostHeader from "@/components/posts/post-detail/post-header"

import ReactMarkdown from "react-markdown"

import styles from "@/styles/post-content.module.css"
import { Post } from "@/interfaces/Post"

export default function PostContent({ post }: { post: Post }) {
    const imagePath = `/images/posts/${post.slug}/${post.image}`

    console.log("Rendering PostContent with imagePath:", imagePath)

    return (
        <article className={styles.content}>
            <PostHeader title={post.title} image={imagePath} />
            <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>
    )
}
