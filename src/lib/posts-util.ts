import fs from "fs"
import path from "path"
import matter from "gray-matter"

import { Post } from "../interfaces/Post"

const postsDirectory = path.join(process.cwd(), "postsDB")

export function getPostsFiles() {
    return fs.readdirSync(postsDirectory)
}

export function getPostData(postIdentifier: string): Post {
    const postSlug = postIdentifier.replace(/\.md$/, "")
    const filePath = path.join(postsDirectory, `${postSlug}.md`)
    const fileContent = fs.readFileSync(filePath, "utf-8")
    const { data, content } = matter(fileContent)

    

    const postData: Post = {
        slug: postSlug,
        title: data.title,
        date: data.date,
        image: data.image,
        excerpt: data.excerpt,
        content,
        isFeatured: data.isFeatured || false,
    }

    return postData
}

export function getAllPosts(): Post[] {
    const postFiles = getPostsFiles()

    const allPosts = postFiles.map((postFile) => {
        return getPostData(postFile)
    })

    const sortedPosts = allPosts.sort((postA, postB) => (postA.date > postB.date ? -1 : 1))

    return sortedPosts
}

export function getFeaturedPosts(): Post[] {
    const allPosts = getAllPosts()
    const featuredPosts = allPosts.filter((post) => post.isFeatured)

    return featuredPosts
}
