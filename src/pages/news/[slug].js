import Layout from "../../components/Layout";
import BasicMeta from "../../components/meta/BasicMeta";
import layout from "../../styles/components/Layout.module.scss";
import ReactMarkdown from "react-markdown";
export default function News({ article }) {
  return (
    <Layout>
      <BasicMeta url={"/"} />
      <div className={layout.container__main}>
        <h1>{article.headline}</h1>
        <p>{article.date}</p>
        <ReactMarkdown>{article.bodyCopy}</ReactMarkdown>
      </div>
    </Layout>
  );
}

const spaceId = process.env.CONTENTFUL_SPACE;
const environmentId = process.env.CONTENTFUL_ENV;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
const contentType = "news";

export async function getStaticPaths() {
  // Call an external API endpoint to get member posts
  const URL = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environmentId}/entries?access_token=${accessToken}&content_type=${contentType}`;
  const res = await fetch(URL);
  const articles = await res.json();

  // Get the paths we want to pre-render based on member posts
  const articlesWithSlug = articles.items.filter(
    (article) => article.fields.slug !== undefined
  );
  const paths = articlesWithSlug.map(
    (article) => `/news/${article.fields.slug}`
  );

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const URL = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environmentId}/entries?access_token=${accessToken}&fields.slug=${params.slug}&content_type=${contentType}`;

  const response = await fetch(URL);
  const articles = await response.json();
  const article = articles.items[0].fields;

  if (!article.image) {
    return {
      props: {
        article: {
          ...article,
        },
      },
    };
  }

  const asset = articles.includes.Asset[0];
  return {
    props: {
      article: {
        ...article,
        image: `https:${asset.fields.file.url}`,
      },
    },
  };
}
