import React from "react";
import Image from "next/image";
import layout from "../styles/components/Layout.module.scss";
import featured from "../styles/components/FeaturedNews.module.scss";
import ReactMarkdown from "react-markdown";
import { PrimaryCTA } from "../components/PrimaryCTA";

export function FeaturedNews({ news }) {
  return (
    <section className={featured.container}>
      <div className={layout.container__main}>
        {news.map((article) => (
          <div key={article.headline}>
            <h3>{article.headline}</h3>
            <PrimaryCTA href="/" ctaCopy="Test copy" />
          </div>
        ))}
      </div>
    </section>
  );
}
