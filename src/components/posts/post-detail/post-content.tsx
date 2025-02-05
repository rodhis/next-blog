import Image from "next/image"
import { ImgHTMLAttributes } from "react"

import ReactMarkdown from "react-markdown"

import PostHeader from "@/components/posts/post-detail/post-header"
import { Post } from "@/interfaces/Post"

import styles from "@/styles/post-content.module.css"



export default function PostContent({ post }: { post: Post }) {
    const imagePath = `/images/posts/${post.slug}/${post.image}`

    const customRenderers = {
        img: (props: ImgHTMLAttributes<HTMLImageElement>) => {
          const { src, alt } = props;
          const imageSrc = src?.startsWith('/')
            ? src
            : `/images/posts/${post.slug}/${src}`;
            
          return (
            <Image
              src={imageSrc}
              alt={alt || ""}
              width={600}
              height={300}
            />
          );
        },
      };
      

    return (
        <article className={styles.content}>
            <PostHeader title={post.title} image={imagePath} />
            <ReactMarkdown components={customRenderers}>{post.content}</ReactMarkdown>
        </article>
    )
}
