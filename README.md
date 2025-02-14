# Next Blog

This next level blog will contain daily relevant information for you life!

## About

This was a Next.js 13 pages router training project that takes advantages of it's full stack features. I've ported it to Next 15.1 with App Router + TypeScript as an additional challenge. Also uses React Markdown lib to get and render markdown text as blog posts and MongoDB to store user messages.

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

Make sure to set up the necessary environment variables. You can create a `.env.local` file in the root of the project with the following content:

```
USERNAME=''
PASSWORD=''
```

Replace `USERNAME` and `PASSWORD` with your actual MongoDB username and password.
