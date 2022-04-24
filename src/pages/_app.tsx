import "../styles/globals.css";
import Head from "next/head";
import { RecoilRoot } from "recoil";
import type { AppProps } from "next/app";
import Root from "@/components/root";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Karl Ivan Alberto | Software Developer</title>
      </Head>
      <RecoilRoot>
        <Root>
          <Component {...pageProps} />
        </Root>
      </RecoilRoot>
    </>
  );
};

export default MyApp;
