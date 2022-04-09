import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import '../styles/index.css';
import useUser from '../hooks/useUser';
import Header from '../components/Header';
import Banner from '../components/Banner';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Header />
      <div className="flex flex-col max-w-screen-lg w-full m-auto pb-6">
        <Banner />
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}
