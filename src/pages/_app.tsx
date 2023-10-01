import type { AppProps } from 'next/app'
import '../styles/global.css'
import '../styles/scss/main.scss';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
