import Head from "next/head";
import Navigation from "./Navigation";
import header from "../styles/components/Header.module.scss";

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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Azeret+Mono:wght@200&display=swap"
          rel="stylesheet"
        />
      </Head>
      {/* <div className={header.uva__bar}>
        <div className={layout.container__main}>
          <img src="images/uva-logo.svg" alt="University of Amsterdam" />
        </div>
      </div> */}
      <header className={header.container__main}>
        <Navigation />
      </header>
      <main className={header.container__full}>{children}</main>
    </div>
  );
}
