import Head from "next/head";
import Navigation from "./Navigation";
import header from '../styles/components/Header.module.scss';
import layout from '../styles/components/Layout.module.scss';

type Props = {
  children: React.ReactNode;
};
export default function Layout({ children }: Props) {
  return (
    <div className="root">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="theme-color" content="#fff" />
        <link rel="stylesheet" href="/fonts/style.css" />
      </Head>
      <div className={header.uva__bar}>
        <div className={layout.container__main}>
          <img src="images/uva-logo.svg" alt="University of Amsterdam" />
        </div>
      </div>
      <div className={layout.container__main}>
        <header className={header.horizontal}>
          <img className={header.logo} src="images/grappa-logo.svg" alt="GRAPPA" />
          <Navigation />
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}
