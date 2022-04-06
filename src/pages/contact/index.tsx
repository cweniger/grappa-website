import Layout from "../../components/Layout";
import BasicMeta from "../../components/meta/BasicMeta";
import { gql } from "graphql-request";
import { contentfulApi } from "../../lib/contentful";
import remarkGfm from "remark-gfm";

import FAQ from "../../components/FAQ";
import ReactMarkdown from "react-markdown";
import React from "react";
import HeaderText from "../../components/HeaderText";
import Sidebar from "../../components/Sidebar";
export default function Contact({ entry }) {
  const image = entry.hero.backgroundImage
    ? entry.hero.backgroundImage.url
    : null;

  return (
    <Layout>
      <BasicMeta url={"/"} />
      <section className="container__main container__sidebar">
        <div className="container__flex container__flex--colstatic">
          <HeaderText header={entry.hero} sideLayout={false} image />
          {entry.directions.title && <h2>{entry.directions.title}</h2>}
          {entry.directions.text && (
            <ReactMarkdown
              className="text--research"
              remarkPlugins={[remarkGfm]}
            >
              {entry.directions.text}
            </ReactMarkdown>
          )}

          {entry.campusDirectionsCollection.items.map((card) => (
            <FAQ key={card.title} summary={card.title} details={card.text} />
          ))}
        </div>
        <Sidebar contact={true} items={entry.sidebarCollection.items} />
      </section>
    </Layout>
  );
}

export async function getStaticProps({ preview = false }) {
  const query = gql`
    query contactPageEntryQuery {
      contactPage(id: "35zoePxFOyuxRdUhdR52vw") {
        metaData {
          title
          description
        }
        hero {
          headline
          subheader
          backgroundImage {
            url
          }
        }
        directions {
          text
          title
        }
        sidebarCollection(limit: 10) {
          items {
            ... on Person {
              fullName
              slug
              contactTitle
            }
          }
        }
        campusDirectionsCollection {
          items {
            ... on TextBlock {
              title
              text
            }
          }
        }
      }
    }
  `;
  const data = await contentfulApi(query, { preview });
  const entry = data.contactPage;
  return {
    props: {
      entry,
    },
  };
}
