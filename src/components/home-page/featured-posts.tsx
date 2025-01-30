import PostsGrid from "../posts/posts-grid"

import { Post } from "@/interfaces/Post"

import styles from "@/styles/featured-posts.module.css"

export default function FeaturedPosts({ posts }: { posts: Post[] }) {
    return (
        <section className={styles.latest}>
            <h2>Featured Posts</h2>
            <PostsGrid posts={posts} />
        </section>
    )
}
