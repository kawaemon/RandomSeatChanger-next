import { AppProps } from "next/app";
import { FC } from "react";
import "../components/Global.css";
import dynamic from "next/dynamic";

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});
