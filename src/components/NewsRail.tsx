import NewsCard from "../components/NewsCard";
import React from "react";

export default function NewsRail({ news }) {
  return (
    <section className="container__flex container__flex--colstatic">
      {news.map((article) => (
        <NewsCard
          type="rail"
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
