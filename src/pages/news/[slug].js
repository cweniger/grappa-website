import Layout from "../../components/Layout";
import BasicMeta from "../../components/meta/BasicMeta";
import ReactMarkdown from "react-markdown";
import React from "react";
import { fetchArticle, getAllNewsSlugs } from "../../lib/contentful";
export default function News({ newsEntry }) {
  const formattedDate = new Date(newsEntry.date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  return (
    <Layout>
      <BasicMeta url={"/"} />
      <section className="container__main">
        <div>
          <p className="text__underscore__md">News</p>
          <h1 className="text--featured text__headline__2">
            {newsEntry.headline}
          </h1>
          <p>
            <time className="text__detail">{formattedDate}</time>
          </p>
          <img
            className="image"
            src={newsEntry.image.url}
            width="1024"
            height="542"
          />
        </div>
        {newsEntry.bodyCopy && (
          <ReactMarkdown className="container__small">
            {newsEntry.bodyCopy}
          </ReactMarkdown>
        )}
        {newsEntry.abstract && (
          <p className={research.blurb}>{newsEntry.abstract}</p>
        )}
      </section>
    </Layout>
  );
}

export async function getStaticPaths() {
  const posts = await getAllNewsSlugs();
  const paths = posts.newsCollection.items.map((page) => {
    return { params: { slug: page.slug } };
  });
  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params, preview = false }) {
  const [newsEntry] = await Promise.all([fetchArticle({ params })]);
  return {
    props: {
      newsEntry,
      preview,
    },
  };
}
