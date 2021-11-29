import { gql } from "graphql-request";
import layout from "../../styles/components/Layout.module.scss";
import classnames from "classnames";

import Layout from "../../components/Layout";
import BasicMeta from "../../components/meta/BasicMeta";
import { fetchNews } from "../../lib/contentful";
import NewsHero from "../../components/NewsHero";
import { contentfulApi } from "../../lib/contentful";
import NewsRail from "../../components/NewsRail";

export default function Index({ newsEntry }) {
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
        <NewsHero featuredNewsEntry={newsEntry.featuredArticle} />
        <aside>
          <p className="text--underscore--sm">Highlights</p>
          <NewsRail news={newsEntry.highlights.items} />
        </aside>
      </section>
    </Layout>
  );
}

export async function getStaticProps({ preview = false }) {
  const [news] = await Promise.all([fetchNews()]);

  const newsQuery = gql`
    query newsPageEntryQuery {
      newsPage(id: "3KdcDIWELV45lOUp4IYusR") {
        sys {
          id
        }
        featuredArticle {
          headline
          summary
          image {
            url
          }
        }
        highlights: highlightArticlesCollection(limit: 3) {
          items {
            headline
            summary
            image {
              url
            }
          }
        }
      }
    }
  `;

  const newsData = await contentfulApi(newsQuery, { preview });

  // const featuredNewsEntry = featuredNewsData?.news ?? null;
  const newsEntry = newsData?.newsPage ?? null;

  return {
    props: {
      news,
      newsEntry,
      // featuredNewsEntry,
      preview,
    },
  };
}
