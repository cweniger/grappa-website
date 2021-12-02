import React from "react";
import NewsCard from "../components/NewsCard";
import classnames from "classnames";
import card from "../styles/components/Card.module.scss";
import layout from "../styles/components/Layout.module.scss";

export function FeaturedNews({ newsEntry }) {
  return (
    <section className={classnames(layout.container__main, card.container)}>
      {newsEntry.map((article) => (
        <NewsCard
          grid
          date={article.date}
          title={article.headline}
          image={article.image}
          slug={`/news/${article.slug}`}
          key={article.slug}
        />
      ))}
    </section>
  );
}
