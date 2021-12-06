import React from "react";

import Layout from "../../components/Layout";
import BasicMeta from "../../components/meta/BasicMeta";
import { fetchNews } from "../../lib/contentful";
import NewsHero from "../../components/NewsHero";
import { fetchNewsEntry } from "../../lib/contentful";
import NewsRail from "../../components/NewsRail";
import NewsGrid from "../../components/NewsGrid";

export default function Index({ news, newsEntry }) {
  return (
    <Layout>
      <BasicMeta url={"/"} />
      <section className="container__main container__news">
        <div>
          {newsEntry.newsPage.title && (
            <h1 className="text__eyebrow__grey">{newsEntry.newsPage.title}</h1>
          )}
          <NewsHero featuredNewsEntry={newsEntry.newsPage.featuredArticle} />
          <NewsGrid news={news.newsCollection.items} />
        </div>
        <aside>
          <p className="text__underscore__sm">Highlights</p>
          <NewsRail news={newsEntry.newsPage.highlights.items} />
        </aside>
      </section>
    </Layout>
  );
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
