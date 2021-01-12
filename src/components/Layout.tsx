import Head from "next/head";
import Navigation from "./Navigation";
import header from '../styles/components/Header.module.scss';
import layout from '../styles/components/Layout.module.scss';
import Link from "next/link";

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
      {/* <div className={header.uva__bar}>
        <div className={layout.container__main}>
          <img src="images/uva-logo.svg" alt="University of Amsterdam" />
        </div>
      </div> */}
      <div className={header.container__main}>
        <header className={header.horizontal}>
          <Link href="/">
            {/* TO DO: Figure out why <a> linking doesn't work here */}
            <img className={header.logo} src="images/grappa-logo.svg" alt="GRAPPA" />
            {/* Image source: https://www.nasa.gov/sites/default/files/images/607025main_MSX_no_labels_full.jpg */}
          </Link>
          <Navigation />
        </header>
      </div>
      <main>{children}</main>      
    </div>
  );
}
