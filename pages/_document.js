import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.svg?v=2" type="image/svg+xml" />
        <link rel="shortcut icon" href="/favicon.svg?v=2" type="image/svg+xml" />
        <meta name="theme-color" content="#000000" />
        <meta name="robots" content="index,follow" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}


