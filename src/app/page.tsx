import HomePage from "."
import Layout from "@/components/layout/layout"

import "../styles/globals.css"

import { AppProps } from "next/app"

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Layout>
            <HomePage {...pageProps} />
        </Layout>
    )
}
