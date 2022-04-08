import { gql } from "graphql-request";
import Layout from "../../components/Layout";
import SecondaryHero from "../../components/SecondaryHero";
import BasicMeta from "../../components/meta/BasicMeta";
import { contentfulApi } from "../../lib/contentful";
import classnames from "classnames";
import Card from "../../components/Card";
import React from "react";

import research from "../../styles/components/Research.module.scss";
export default function Research({ pageEntry }) {
  return (
    <Layout>
      <BasicMeta
        title={pageEntry.pageMetadata.title}
        url={`/${pageEntry.pageMetadata.slug}`}
      />
      <SecondaryHero
        className="container__research__black"
        heroEntry={pageEntry.hero}
        innerClassName="container__main__research"
      />
      <section className={research.wrapper}>
        <div
          className={classnames(
            research.container,
            "container__main__research"
          )}
        >
          {pageEntry.researchAreasCollection.items.map((area) => (
            <Card
              key={area.title}
              title={area.title}
              image={area.image}
              slug={`/research/${area.slug}`}
            />
          ))}
        </div>
      </section>
      <section className="container__main">
        <h2 className="text__headline__1">{pageEntry.experimentTitle}</h2>
        <div className={research.container}>
          {pageEntry.experimentAreasCollection.items.map((area) => (
            <Card
              key={area.sys.id}
              title={area.title}
              image={area.image}
              slug={`/research/${area.slug}`}
            />
          ))}
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps({ preview = false }) {
  const pageQuery = gql`
    query researchPageEntryQuery {
      researchPage(id: "5iAwAOp78HiQV0mfCTr8dX") {
        sys {
          id
        }
        hero {
          headline
          subheader
        }
        pageMetadata {
          title
          slug
          description
        }
        researchAreasCollection {
          items {
            sys {
              id
            }
            title
            abstract
            description
            image {
              url
            }
            researchType
            order
            slug
            team: teamCollection(limit: 10) {
              items {
                fullName
                slug
                omitProfile
                profilePicture {
                  url
                }
              }
            }
          }
        }
        experimentTitle
        experimentAreasCollection {
          items {
            sys {
              id
            }
            title
            abstract
            description
            image {
              url
            }
            researchType
            order
            slug
            team: teamCollection(limit: 10) {
              items {
                fullName
                slug
                omitProfile
                profilePicture {
                  url
                }
              }
            }
          }
        }
      }
    }
  `;

  const query = gql`
    query researchCollectionQuery($preview: Boolean!) {
      researchCollection(preview: $preview, order: order_ASC) {
        items {
          title
          abstract
          description
          image {
            url
          }
          researchType
          order
          slug
          team: teamCollection(limit: 10) {
            items {
              fullName
              slug
              omitProfile
              profilePicture {
                url
              }
            }
          }
        }
      }
    }
  `;

  const pageData = await contentfulApi(pageQuery, { preview });
  const data = await contentfulApi(query, { preview });
  const entry = data;
  const pageEntry = pageData.researchPage;
  return {
    props: {
      entry,
      pageEntry,
      preview,
    },
  };
}
