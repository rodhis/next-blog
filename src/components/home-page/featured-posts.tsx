import PostsGrid from '../posts/posts-grid'
import { Post } from '@/interfaces/interfaces'

import styles from '@/styles/featured-posts.module.css'

interface FeaturedPostsProps {
    posts: Post[]
}

export default function FeaturedPosts({ posts }: FeaturedPostsProps) {
    return (
        <section className={styles.latest}>
            <h2>Featured Posts</h2>
            <PostsGrid posts={posts} />
        </section>
    )
}
