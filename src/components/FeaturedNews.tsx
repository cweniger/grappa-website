import React from "react";
import featured from "../styles/components/FeaturedNews.module.scss";
import NewsCard from "../components/NewsCard";
import classnames from "classnames";
import card from "../styles/components/Card.module.scss";

export function FeaturedNews({ news }) {
  return (
    <section className={featured.container}>
      <div
        className={classnames(
          card.container,
          "container--flex container--flex--space-between container--medium"
        )}
      >
        {news.map((article) => (
          <NewsCard
            date={article.date}
            title={article.headline}
            image={article.image}
            slug={`/news/${article.slug}`}
          />
        ))}
      </div>
    </section>
  );
}
