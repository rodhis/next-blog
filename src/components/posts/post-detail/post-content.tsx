import Image from 'next/image'

import ReactMarkdown from 'react-markdown'

import PostHeader from '@/components/posts/post-detail/post-header'
import { Post } from '@/interfaces/Post'

import styles from '@/styles/post-content.module.css'

export default function PostContent({ post }: { post: Post }) {
    const imagePath = `/images/posts/${post.slug}/${post.image}`

    const customRenderers = {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        p(paragraph: any) {
            const { node } = paragraph
            if (node.children[0].tagName === 'img') {
                const image = node.children[0]

                const imageSrc = image.properties.src.startsWith('/') ? image.properties.src : `/images/posts/${post.slug}/${image.properties.src}`
                return (
                    <div className={styles.image}>
                        <Image src={imageSrc} alt={image.alt || ''} width={600} height={300} />
                    </div>
                )
            }

            return <p>{paragraph.children}</p>
        },
    }

    return (
        <article className={styles.content}>
            <PostHeader title={post.title} image={imagePath} />
            <ReactMarkdown components={customRenderers}>{post.content}</ReactMarkdown>
        </article>
    )
}
