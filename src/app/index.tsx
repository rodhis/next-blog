import FeaturedPosts from "@/components/home-page/featured-posts"
import Hero from "@/components/home-page/hero"

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

export default function HomePage() {
    return (
        <>
            <Hero />
            <FeaturedPosts posts={DUMMY_POSTS} />
        </>
    )
}

//1 - Hero Page - Apresentação da página e seus criadores
// 2 - Posts em destaque
