import Layout from "../../components/Layout";
import BasicMeta from "../../components/meta/BasicMeta";
import OpenGraphMeta from "../../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../../components/meta/TwitterCardMeta";
import layout from "../../styles/components/Layout.module.scss";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

export default function Index({ articles }) {
  return (
    <Layout>
      <BasicMeta url={"/"} />
      <OpenGraphMeta url={"/"} />
      <TwitterCardMeta url={"/"} />
      <div className={layout.container__main}>
        <h1>News</h1>
        {articles.map((article) => (
          <div>
            <h2>
              <Link href={`/news/${article.slug}`}>{article.headline}</Link>
            </h2>
            <p>{article.date}</p>
            <ReactMarkdown>{article.bodyCopy}</ReactMarkdown>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const spaceId = process.env.CONTENTFUL_SPACE;
  const environmentId = process.env.CONTENTFUL_ENV;
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
  const contentType = "news";

  const URL = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environmentId}/entries?access_token=${accessToken}&content_type=${contentType}&order=-fields.date`;
  const response = await fetch(URL);
  const articles = await response.json();

  return {
    props: {
      articles: articles.items.map((item) => ({
        ...item.fields,
        id: item.sys.id,
      })),
    },
  };
}
