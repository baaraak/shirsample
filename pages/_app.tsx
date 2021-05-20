import { AppProps } from "next/app";
import { Provider } from "next-auth/client";
import "../styles/index.css";
import useUser from "../hooks/useUser";
import Header from "../components/Header";
import Banner from "../components/Banner";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <Header />
      <div className="flex flex-col max-w-screen-lg w-full m-auto ">
        <Banner />
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}
