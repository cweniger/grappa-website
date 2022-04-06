import NewsCard from "../components/NewsCard";
import React from "react";
import groupBy from "lodash.groupby";
import Link from "next/link";

export default function NewsGrid({ news }) {
  const newsByDate = groupBy(news, (article) => {
    let archiveDate = new Date("2019-12-31");
    const date = archiveDate.toISOString();

    if (article.date > date || article.date == null) {
      return "current";
    } else if (article.date < date) {
      return "archive";
    }
  });

  return (
    <>
      <section className="container__grid__cols__3">
        {newsByDate.current.map((article) => {
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
      <section className="container__full">
        <details>
          <summary>Archived News (pre-2019)</summary>
          <ul className="list__tight">
            {newsByDate.archive.map((article) => {
              return (
                <li key={article.sys.id}>
                  <Link href={`/news/${article.slug}`}>
                    <a>{article.headline}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </details>
      </section>
    </>
  );
}
