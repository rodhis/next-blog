import AllPosts from "./all-posts"

const DUMMY_POSTS = [
    {
        slug: "getting-started-with-nextjs1",
        title: "Getting Started with NextJs",
        image: "getting-started-nextjs.png",
        excerpt: "Nextjs is great! Framework for fullstack apps",
        date: "2025-01-30",
    },
    {
        slug: "getting-started-with-nextjs2",
        title: "Getting Started with NextJs",
        image: "getting-started-nextjs.png",
        excerpt: "Nextjs is awesome! lets gooo",
        date: "2025-01-30",
    },
]

export default function AllPostsPage() {
    return <AllPosts posts={DUMMY_POSTS} />
}
