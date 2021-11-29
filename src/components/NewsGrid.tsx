import layout from "../styles/components/Layout.module.scss";
import NewsCard from "../components/NewsCard";
import classnames from "classnames";
import card from "../styles/components/Card.module.scss";

export default function NewsGrid({ news }) {
  return (
    <section
      className={classnames(
        layout.container__main,
        card.container,
        "container--flex"
      )}
    >
      {news.map((article) => (
        <NewsCard
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
