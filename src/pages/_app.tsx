import { AppProps } from "next/app";
import "../styles/index.css";
import Head from "next/head";

if (typeof window !== "undefined") {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  window.scrollTo(0, 1);
}

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
