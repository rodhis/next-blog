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

## Project Structure

A typical Next.js project structure looks like this:

```
my-nextjs-app/
├── pages/
│   ├── index.js
│   └── _app.js
├── public/
├── styles/
│   └── globals.css
├── package.json
└── next.config.js
```

-   `pages/`: Contains the application's pages.
-   `public/`: Static files like images.
-   `styles/`: Global and component-specific styles.
-   `next.config.js`: Configuration file for Next.js.

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
