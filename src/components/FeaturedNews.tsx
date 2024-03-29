import React from "react";
import NewsCard from "../components/NewsCard";

export function FeaturedNews({ newsEntry }) {
  return (
    <section className="container__main">
      <h2 className="text__underscore__home">GRAPPA in the news</h2>
      <div className="container__grid__cols__3">
        {newsEntry.map((article) => (
          <NewsCard
            type="grid"
            date={article.date}
            title={article.headline}
            image={article.image}
            slug={`/news/${article.slug}`}
            key={article.slug}
          />
        ))}
      </div>
    </section>
  );
}
