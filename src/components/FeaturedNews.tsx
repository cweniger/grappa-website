import React from "react";
import featured from "../styles/components/FeaturedNews.module.scss";
import NewsCard from "../components/NewsCard";
import classnames from "classnames";
import card from "../styles/components/Card.module.scss";
import layout from "../styles/components/Layout.module.scss";

export function FeaturedNews({ newsEntry }) {
  return (
    <section className={classnames(layout.container__main, card.container)}>
      {newsEntry.highlights.items.map((article) => (
        <NewsCard
          grid
          date={article.date}
          title={article.headline}
          image={article.image}
          slug={`/news/${article.slug}`}
        />
      ))}
    </section>
  );
}
