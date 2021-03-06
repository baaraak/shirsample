import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import Header from 'components/Header';
import Banner from 'components/Banner';
import 'styles/index.css';
import { PlayerProvider } from '../context/player-context';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <SessionProvider session={pageProps.session}>
        <PlayerProvider>
          <Header />
          <div className="flex flex-col max-w-screen-lg w-full m-auto pb-6">
            <Banner />
            <Component {...pageProps} />
          </div>
        </PlayerProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
