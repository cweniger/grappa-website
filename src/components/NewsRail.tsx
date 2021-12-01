import NewsCard from "../components/NewsCard";
import React from "react";

export default function NewsRail({ news }) {
  return (
    <section className="container--flex container--flex--colstatic">
      {news.map((article) => (
        <NewsCard
          rail
          key={article.headline}
          title={article.headline}
          image={article.image}
          date={article.date}
          slug={`/news/${article.slug}`}
        />
      ))}
    </section>
  );
}
