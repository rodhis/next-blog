import AllPosts from './all-posts'

import { getAllPosts } from '@/lib/posts-util'

export const metadata = {
    title: 'All Posts',
    description: 'All blog posts',
}

export const revalidate = 1800

export default function AllPostsPage() {
    const allPosts = getAllPosts()

    return <AllPosts posts={allPosts} />
}
