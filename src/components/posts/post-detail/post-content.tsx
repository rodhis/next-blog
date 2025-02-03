import PostHeader from "@/components/posts/post-detail/post-header"

import ReactMarkdown from "react-markdown"

import styles from "@/styles/post-content.module.css"

const DUMMY_POST = {
    slug: "getting-started-with-nextjs1",
    title: "Getting Started with NextJs",
    image: "getting-started-nextjs.png",
    date: "2025-01-30",
    content: "# This is a first post",
}

export default function PostContent() {
    const imagePath = `/images/posts/${DUMMY_POST.slug}/${DUMMY_POST.image}`

    console.log("Rendering PostContent with imagePath:", imagePath)

    return (
        <article className={styles.content}>
            <PostHeader title={DUMMY_POST.title} image={imagePath} />
            <ReactMarkdown>{DUMMY_POST.content}</ReactMarkdown>
        </article>
    )
}
