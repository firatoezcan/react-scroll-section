import Document, { Html, Head, Main, NextScript } from "next/document";

const MetaConfig = {
  title: "React Scroll Sections Example",
  description: "Quick example of sane scroll sections without viewport units",
  url: "https://react-scroll-section.vercel.app",
};

const isDevelopment = process.env.NODE_ENV === "development";

export default class MyDocument extends Document {
  render() {
    const faviconFolder = isDevelopment ? "/favicon" : `${MetaConfig.url}/favicon`;
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />

          {/* Favicons + PWA Tags */}
          <link rel="apple-touch-icon" sizes="180x180" href={`${faviconFolder}/apple-touch-icon.png`} />
          <link rel="icon" type="image/png" sizes="32x32" href={`${faviconFolder}/favicon-32x32.png`} />
          <link rel="icon" type="image/png" sizes="16x16" href={`${faviconFolder}/favicon-16x16.png`} />
          <link rel="manifest" href={`${faviconFolder}/site.webmanifest`} />
          <link rel="mask-icon" color="#5bbad5" href={`${faviconFolder}/safari-pinned-tab.svg`} />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
          {/* Primary Meta Tags */}

          <meta name="title" content={MetaConfig.title} />
          <meta name="description" content={MetaConfig.description} />

          {/* Open Graph / Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content={MetaConfig.url} />
          <meta property="og:title" content={MetaConfig.title} />
          <meta property="og:description" content={MetaConfig.description} />

          {/* Twitter */}
          <meta property="twitter:url" content={MetaConfig.url} />
          <meta property="twitter:title" content={MetaConfig.title} />
          <meta property="twitter:description" content={MetaConfig.description} />
          <script src="https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
