import { gql } from "graphql-request";
import layout from "../../styles/components/Layout.module.scss";
import classnames from "classnames";
import React from "react";

import Layout from "../../components/Layout";
import BasicMeta from "../../components/meta/BasicMeta";
import { fetchNews } from "../../lib/contentful";
import NewsHero from "../../components/NewsHero";
import { contentfulApi } from "../../lib/contentful";
import NewsRail from "../../components/NewsRail";
import NewsGrid from "../../components/NewsGrid";

export default function Index({ news, newsEntry }) {
  return (
    <Layout>
      <BasicMeta url={"/"} />
      <section
        className={classnames(
          layout.container__main,
          layout.container__news,
          "container--flex"
        )}
      >
        <div>
          {newsEntry.title && (
            <h1 className="text--eyebrow__grey">{newsEntry?.newsPage.title}</h1>
          )}
          <NewsHero featuredNewsEntry={newsEntry?.newsPage.featuredArticle} />
          <NewsGrid news={news?.newsCollection?.items} />
        </div>
        <aside>
          <p className="text--underscore--sm">Highlights</p>
          <NewsRail news={newsEntry?.newsPage.highlights.items} />
        </aside>
      </section>
    </Layout>
  );
}

export async function fetchNewsEntry() {
  const newsQuery = gql`
    query newsPageEntryQuery {
      newsPage(id: "3KdcDIWELV45lOUp4IYusR") {
        sys {
          id
        }
        title
        featuredArticle {
          headline
          date
          slug
          summary
          image {
            url
          }
        }
        highlights: highlightArticlesCollection(limit: 3) {
          items {
            headline
            date
            slug
            summary
            image {
              url
            }
          }
        }
      }
    }
  `;

  const newsData = await contentfulApi(newsQuery);

  return newsData;
}

export async function getStaticProps({ preview = false }) {
  const [news, newsEntry] = await Promise.all([fetchNews(), fetchNewsEntry()]);
  return {
    props: {
      news,
      newsEntry,
      preview,
    },
  };
}
