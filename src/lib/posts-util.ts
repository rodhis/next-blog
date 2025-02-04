import fs from "fs"
import path from "path"
import matter from "gray-matter"

import { Post } from "../interfaces/Post"

const postsDirectory = path.join(process.cwd(), "postsDB")

function getPostData(fileName: string): Post {
    const filePath = path.join(postsDirectory, fileName)
    const fileContent = fs.readFileSync(filePath, "utf-8")
    const { data, content } = matter(fileContent)

    const postSlug = fileName.replace(/\.md$/, "")

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
    const postFiles = fs.readdirSync(postsDirectory)

    const allPosts = postFiles.map((postFile) => {
        return getPostData(postFile)
    })

    return allPosts
}

export function getFeaturedPosts(): Post[] {
    const allPosts = getAllPosts()
    const featuredPosts = allPosts.filter((post) => post.isFeatured)

    return featuredPosts
}
