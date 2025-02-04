import FeaturedPosts from "@/components/home-page/featured-posts";
import Hero from "@/components/home-page/hero";
import { Post } from "@/interfaces/Post";
import { getFeaturedPosts } from "@/lib/posts-util";

interface HomePageProps {
  posts: Post[];
}

export default function HomePage({ posts }: HomePageProps) {
  console.log("HomePage posts:", posts); 

  return (
    <>
      <Hero />
      <FeaturedPosts posts={posts} />
    </>
  );
}

export async function getStaticProps() {
  console.log("getStaticProps called"); 
  const featuredPosts = getFeaturedPosts();
  console.log("Featured posts in getStaticProps:", featuredPosts); // Debugging line

  return {
    props: {
      posts: featuredPosts,
    },
    revalidate: 1800,
  };
}