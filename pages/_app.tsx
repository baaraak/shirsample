import { AppProps } from "next/app";
import { Provider } from "next-auth/client";
import "../styles/index.css";
import useUser from "../hooks/useUser";
import Header from "../components/Header";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <div className="flex flex-col py-8 max-w-6xl m-auto border border-t-0 border-gray-200 border-b-0 h-screen">
        <Header />
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}
