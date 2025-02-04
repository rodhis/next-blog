import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'postsDB');
console.log("Posts directory path:", postsDirectory); 

if (!fs.existsSync(postsDirectory)) {
    console.error("Posts directory does not exist:", postsDirectory); 
  }

function getPostData(fileName: string) {
  const filePath = path.join(postsDirectory, fileName);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  const postSlug = fileName.replace(/\.md$/, '');

  const postData = {
    slug: postSlug,
    date: data.date,
    isFeatured: data.isFeatured || false,
    ...data,
    content,
  };

  return postData;
}

export function getAllPosts() {
  const postFiles = fs.readdirSync(postsDirectory);
  console.log("Post files:", postFiles);

  const allPosts = postFiles.map(postFile => {
    return getPostData(postFile);
  });

  console.log("All posts:", allPosts); 

  const sortedPosts = allPosts.sort((postA, postB) => (postA.date > postB.date ? -1 : 1));

  return sortedPosts;
}

export function getFeaturedPosts() {
  const allPosts = getAllPosts();
  console.log("All posts in getFeaturedPosts:", allPosts); 

  const featuredPosts = allPosts.filter(post => post.isFeatured);
  console.log("Featured posts:", featuredPosts); 

  return featuredPosts;
}