import Layout from "../../components/Layout";
import BasicMeta from "../../components/meta/BasicMeta";
import ReactMarkdown from "react-markdown";
import React from "react";

export default function News({ article }) {
  const formattedDate = new Date(article.date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  return (
    <Layout>
      <BasicMeta url={"/"} />
      <section className="container__main">
        <div className="container__research">
          <div className="container__aside">
            {/* <h2 className="text--eyebrow__grey">Team</h2> */}
          </div>

          <div className="container__small">
            <h1 className="text--research text__headline__2">
              {article.headline}
            </h1>
            <time className="text--detail">{formattedDate}</time>
            <ReactMarkdown>{article.bodyCopy}</ReactMarkdown>
            {/* {article.abstract && (
              <p className={research.blurb}>{article.abstract}</p>
            )} */}
          </div>
        </div>
      </section>
      {/* <section className="container__main container__right">
        <div className="container__medium">
          <h1 className="text--news">{article.headline}</h1>
          <time className="text--detail">{formattedDate}</time>
          <ReactMarkdown>{article.bodyCopy}</ReactMarkdown>
        </div>
      </section> */}
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
