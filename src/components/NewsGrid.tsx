import NewsCard from "../components/NewsCard";
import React from "react";

export default function NewsGrid({ news }) {
  return (
    <section className="container__grid__cols__3">
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
