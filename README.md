# Next Blog

In this blog, you can post about technology, host previews of your projects and have an interface to receive and view contact messages!

## About

This is a Next.js 13 Pages Router training project that takes advantage of its full-stack features. I've ported it to Next.js 15.1 with the App Router and TypeScript as an additional challenge. It also uses the React Context API for notifications (user feedback on various operations). Other features include using the React Markdown library to parse and render markdown text as blog posts and MongoDB to store user messages and admin account credentials. Finally, it takes full advantage of the Next-Auth library for user creation and authentication.

I've also included a dashboard where you can view contact messages, change your password, and delete your admin account if needed. It's a versatile project that you can use as your portfolio page.

## Live Site

The project is now hosted on Vercel! Check it out live:

https://next-blog-fawn-sigma.vercel.app/

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

-   Node.js (version 14 or higher)
-   npm (version 6 or higher)
-   MongoDB

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/next-blog.git
    ```
2. Navigate to the project directory:
    ```bash
    cd next-blog
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```

### Running the Project

1. Start the MongoDB server if it's not already running:
    ```bash
    mongod
    ```
2. Run the development server:
    ```bash
    npm run dev
    ```
3. Open your browser and navigate to `http://localhost:3000` to see the application running.

### Building for Production

To build the project for production, run:

```bash
npm run build
```

To start the production server, run:

```bash
npm start
```

### Environment Variables

Make sure to set up the necessary environment variables. You must create a `.env` file in the root of the project with the following content:

```
MONGODB_USERNAME=''
MONGODB_PASSWORD=''
MONGODB_CLUSTER=''
```

Set `MONGODB_USERNAME` and `MONGODB_PASSWORD` with your actual MongoDB account username and password. `MONGODB_CLUSTER` should be set with your cluster identifier. For example: `blogdb.abcd123`.

```
ADMIN_AUTH_KEY=''
NEXTAUTH_SECRET=''
NEXTAUTH_URL=''
```

`ADMIN_AUTH_KEY` works as an authorization key that the user will require to create an admin account. It's similar to how Project Managers grant admin privileges in real life so not everyone can create an admin account.

`NEXTAUTH_SECRET` is a key that Next-Auth will use to hash and encrypt the session cookies. You can generate a strong key using OpenSSL. On your terminal, type the following:
```
openssl rand -base64 32
```
Then set the result as the value for this variable in the `.env` file.

`NEXTAUTH_URL` is optional and should point to the actual URL where the project is hosted. For example: `NEXTAUTH_URL='http://your-site-sigma.vercel.app'`.
