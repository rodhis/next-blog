# Next Blog

This next level blog will contain daily relevant information for you life!

## About

This was a Next.js 13 pages router training project that takes advantages of it's full stack features. I've ported it to Next 15.1 with App Router + TypeScript as an additional challenge. It also uses React Context API for notifications (user feedback on various operations). Ogther features includes using React Markdown lib to get and render markdown text as blog posts and MongoDB to store user messages and admin accounts credentials. Finally, it takes full advange of the Next-Auth lib for user creation and authentication.

## Live site

Project is now hosted in vercel! Take a look at it running live:

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

Set `MONGODB_USERNAME` and `MONGODB_PASSWORD` with your actual MongoDB account username and password. `MONGODB_CLUSTER` should be setted with your cluster identifier. E.g.: `blogdb.abcd123`.

```
ADMIN_AUTH_KEY=''
NEXTAUTH_SECRET=
NEXTAUTH_URL=''
```

`ADMIN_AUTH_KEY` works like an authorization key that the user will require to create an admin account. It's kind of how it works in real life when Project Managers have to grant you admin privileges so not everyone can create an admin account.

`NEXTAUTH_SECRET` is a key Next-Auth will use to hash and encrypt the session cookies. I getting a strong key using openssl. On your terminal, type the following:
```
openssl rand -base64 32
```
Then set the result as the value for this variable on the `.env` file.

`NEXTAUTH_URL` is optional and should point to the actual url of where the project is hosted. E.g.: `NEXTAUTH_URL='http://your-site-sigma.vercel.app`.
