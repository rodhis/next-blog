import PostItem from "./post-item";

import styles from "@/styles/posts-grid.module.css";

interface Post {
  slug: string;
  title: string;
  date: string;
  image: string;
  excerpt: string;
}

interface PostsGridProps {
  posts: Post[];
}

export default function PostsGrid({ posts }: PostsGridProps) {
  return (
    <ul className={styles.grid}>
      {posts.map(post => (
        <PostItem post={post} />
      ))}
    </ul>
  );
}