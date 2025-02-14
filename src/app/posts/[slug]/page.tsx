import { notFound } from 'next/navigation'

import PostContent from '@/components/posts/post-detail/post-content'
import { getPostData, getPostsFiles } from '@/lib/posts-util'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
    const { slug } = await params
    const postData = await getPostData(slug)

    if (!postData) {
        return {
            title: 'Post não encontrado',
            description: 'Não foi possível encontrar o post solicitado.',
        }
    }

    return {
        title: postData.title,
        description: postData.excerpt,
    }
}

export async function generateStaticParams() {
    const postFiles = getPostsFiles()

    return postFiles.map((fileName) => ({
        slug: fileName.replace(/\.md$/, ''),
    }))
}

export const revalidate = 600

export default async function PostDetailPage({
    params,
}: {
    params: Promise<{ slug: string }> | { slug: string }
}) {
    const { slug } = await params
    const postData = await getPostData(slug)

    if (!postData) {
        return notFound()
    }

    return (
        <article>
            <PostContent post={postData} />
        </article>
    )
}
