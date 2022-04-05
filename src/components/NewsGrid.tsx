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
              type="grid"
              key={article.sys.id}
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
