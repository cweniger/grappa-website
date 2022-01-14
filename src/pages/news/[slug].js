import Layout from "../../components/Layout";
import { gql } from "graphql-request";
import { contentfulApi } from "../../lib/contentful";
import BasicMeta from "../../components/meta/BasicMeta";
import classNames from "classnames";
import ReactMarkdown from "react-markdown";
import React from "react";
import Avatar from "../../components/Avatar";
import { getAllNewsSlugs } from "../../lib/contentful";
import news from "../../styles/components/NewsHero.module.scss";
import people from "../../styles/components/PeopleGrid.module.scss";
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
        <div className="container__research">
          <div className="container__aside">
            <h2 className="text__eyebrow__grey">Featured</h2>
            <ul className={people.miniPeopleGrid}>
              {newsEntry.members.items.map((member) => (
                <Avatar small person={member} key={member.fullName} />
              ))}
            </ul>
          </div>

          <div className="container__small">
            <time className="text__detail">{formattedDate}</time>
            <h1 className="text--featured text__headline__3">
              {newsEntry.headline}
            </h1>

            <p className={classNames(news.blurb, "text__grey")}>
              {newsEntry.summary}
            </p>
            {newsEntry.image && (
              <img
                className={news.image}
                src={newsEntry.image.url}
                width="100%"
              />
            )}
            <ReactMarkdown>{newsEntry.bodyCopy}</ReactMarkdown>
          </div>
        </div>
      </section>
      {/* <section className="container__main container__right">
        <div className="container__medium">
          <h1 className="text__news">{article.headline}</h1>
          <time className="text__detail">{formattedDate}</time>
          <ReactMarkdown>{article.bodyCopy}</ReactMarkdown>
        </div>
      </section> */}
    </Layout>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const query = gql`
    query newsCollectionQuery($slug: String!) {
      newsCollection(limit: 1, where: { slug: $slug }) {
        items {
          headline
          bodyCopy
          slug
          summary
          date
          image {
            url
          }
          members: membersCollection(limit: 4) {
            items {
              sys {
                id
              }
              fullName
              slug
              profilePicture {
                url
                description
              }
            }
          }
        }
      }
    }
  `;

  const data = await contentfulApi(query, {
    slug: params.slug,
  });

  const newsEntry = data.newsCollection.items[0];

  if (!newsEntry) {
    return { notFound: true };
  }

  return {
    props: {
      newsEntry,
      preview,
    },
  };
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
