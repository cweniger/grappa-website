import React from "react";
import Image from "next/image";
import layout from "../styles/components/Layout.module.scss";
import featured from "../styles/components/FeaturedNews.module.scss";
import ReactMarkdown from "react-markdown";
import { PrimaryCTA } from "../components/PrimaryCTA";
import Link from "next/link";

export function FeaturedNews({ news }) {
  return (
    <section className={featured.container}>
      <div className={layout.container__main}>
        {news.map((article) => (
          <div key={article.headline} className={featured.teaser}>
            {article.image && <img src={article.image} />}

            <h3>
              <Link href={`/news/${article.slug}`}>{article.headline}</Link>
            </h3>
            {article.summary && <p>{article.summary}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
