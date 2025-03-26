import { notFound } from 'next/navigation'

import { getPostData, getPostsFiles } from '@/lib/posts-util'
import PostContent from '@/components/posts/post-detail/post-content'
import { ParamsType } from '@/interfaces/interfaces'

export async function generateMetadata({ params }: { params: ParamsType }) {
    const { slug }: { slug: string } = await params
    const postData = await getPostData(slug)

    if (!postData) {
        return { title: 'Post not Found', description: 'Not found.' }
    }

    return { title: postData.title, description: postData.excerpt }
}

export async function generateStaticParams() {
    return getPostsFiles().map((fileName) => ({
        slug: fileName.replace(/\.md$/, ''),
    }))
}

export const revalidate = 600

export default async function Page({ params }: { params: ParamsType }) {
    const { slug }: { slug: string } = await params
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
