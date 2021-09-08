import Layout from "../../components/Layout";
import BasicMeta from "../../components/meta/BasicMeta";
import layout from "../../styles/components/Layout.module.scss";
import { fetchNews } from "../../lib/contentful";
import Card from "../../components/Card";
import classnames from "classnames";
import card from "../../styles/components/Card.module.scss";

export default function Index({ news }) {
  return (
    <Layout>
      <BasicMeta url={"/"} />
      <div className={layout.container__main}>
        <h1>News</h1>
        <div className={classnames(card.container, "container--flex")}>
          {news.map((article) => (
            <Card
              key={article.headline}
              title={article.headline}
              image={article.image}
              date={article.date}
              slug={`/news/${article.slug}`}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const [news] = await Promise.all([fetchNews()]);

  return {
    props: {
      news,
    },
  };
}
