---
title: "Getting started with NextJS"
date: "2025-02-03"
image: "getting-started-nextjs.png"
excerpt: "Nextjs is a framework for building fullstack React apps with SSR."
isFeatured: true
---

# Getting Started with Next.js 15

Next.js 15 is a powerful React framework that enables developers to build fast and user-friendly web applications. This guide will help you get started with Next.js 15.

## Prerequisites

Before you begin, ensure you have the following installed:

-   Node.js (version 14.0 or higher)
-   npm (version 6.0 or higher) or Yarn

## Setting Up a New Next.js Project

1. **Create a new Next.js application:**

    ```bash
    npx create-next-app@latest my-nextjs-app
    cd my-nextjs-app
    ```

2. **Start the development server:**

    ```bash
    npm run dev
    ```

    Your application will be available at `http://localhost:3000`.

## Project Structure with App Router

A typical Next.js project structure using App Router looks like this:

![App router folder structure](/images/posts/getting-started-with-nextjs/app-router-layout.jpg)

-   `app/`: Contains the application's pages. Each page.tsx correspond to a page.
-   `public/`: Static files like images.
-   `layout file`: Root layout that will appear on all your pages.
-   `[slug]/`: Folders with names with square brackets contains dynamic routes.

## Creating Your First Page

1. **Create a new file `about.js` in the `pages` directory:**

    ```jsx
    // pages/about.js
    export default function About() {
        return <h1>About Page</h1>
    }
    ```

2. **Navigate to `http://localhost:3000/about` to see your new page.**

## Learn More

To learn more about Next.js 15, visit the [official documentation](https://nextjs.org/docs).

Happy coding!
