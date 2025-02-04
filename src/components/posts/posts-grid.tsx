import PostItem from "./post-item";

import { Post } from "@/interfaces/Post";

import styles from "@/styles/posts-grid.module.css";


interface PostsGridProps {
  posts: Post[];
}

export default function PostsGrid({ posts = [] }: PostsGridProps) {
  return (
    <ul className={styles.grid}>
      {posts.map(post => (
        <PostItem key={post.slug} post={post} />
      ))}
    </ul>
  );
}