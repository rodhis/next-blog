import PostsGrid from "@/components/posts/posts-grid"
import { Post } from "@/interfaces/Post"
import styles from "@/styles/all-posts.module.css"

export default function AllPosts(props: { posts: Post[] }) {
    return (
        <section className={styles.posts}>
            <h1>All Posts</h1>
            <PostsGrid posts={props.posts}/>
        </section>
    )
} 