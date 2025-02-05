import { notFound } from 'next/navigation'

import PostContent from "@/components/posts/post-detail/post-content"
import { getPostData, getPostsFiles } from '@/lib/posts-util'


export async function generateStaticParams() {
    const postFiles = getPostsFiles()
    
    return postFiles.map(fileName => ({
      slug: fileName.replace(/\.md$/, '')
    }))
  }

  

  export const revalidate = 600 


  export default async function PostDetailPage({ params }: { params: { slug: string } }) {
    const { slug } = await params
    const postData = getPostData(slug)

    if(!postData) {
      return notFound()
    }
  
    return (
      <article>
        <PostContent post={postData} />
      </article>
    )
  }
