import { AppProps } from "next/app";
import React from "react";

import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";

import "../styles/main.scss";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
