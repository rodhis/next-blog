import HomePage from '.'

import '../styles/globals.css'

import { AppProps } from 'next/app'

export default function MyApp({ pageProps }: AppProps) {
    return <HomePage {...pageProps} />
}
