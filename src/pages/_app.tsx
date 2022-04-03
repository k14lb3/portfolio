import "../styles/globals.css";
import { RecoilRoot } from "recoil";
import type { AppProps } from "next/app";
import Root from "@/components/root";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <Root>
        <Component {...pageProps} />
      </Root>
    </RecoilRoot>
  );
};

export default MyApp;
