import layout from "../styles/components/Layout.module.scss";
import NewsCard from "../components/NewsCard";
import classnames from "classnames";
import card from "../styles/components/Card.module.scss";
import React from "react";

export default function NewsGrid({ news }) {
  return (
    <section className={classnames(layout.container__main, card.container)}>
      {news.map((article) => {
        if (article.hideFromList) {
          return null;
        } else {
          return (
            <NewsCard
              grid
              key={article.headline}
              title={article.headline}
              image={article.image}
              date={article.date}
              slug={`/news/${article.slug}`}
            />
          );
        }
      })}
    </section>
  );
}
