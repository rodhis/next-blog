import FeaturedPosts from "@/components/home-page/featured-posts";
import Hero from "@/components/home-page/hero";
import { getFeaturedPosts } from '@/lib/posts-util'; // Adjust the import path

export default function HomePage() {
  const featuredPosts = getFeaturedPosts();
  
  return (
    <>
      <Hero />
      <FeaturedPosts posts={featuredPosts} />
    </>
  );
}