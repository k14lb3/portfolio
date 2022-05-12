import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:url" content="https://k14lb3.vercel.app" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://k14lb3.vercel.app/static/images/me.jpg"
        />
        <meta property="og:title" content="Karl Ivan Alberto" />
        <meta property="og:description" content="Software Developer" />
        <meta name="twitter:card" content="summary" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
