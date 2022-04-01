import type { NextPage } from "next";
import Head from "next/head";
import Background from "@/components/background";
import Taskbar from "@/components/taskbar";

const Home: NextPage = () => {
  return (
    <Background>
      <Head>
        <title>Karl Ivan Alberto | Portfolio</title>
      </Head>
      <Taskbar />
    </Background>
  );
};

export default Home;
