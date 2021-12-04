import Layout from "../../components/Layout";
import BasicMeta from "../../components/meta/BasicMeta";
import { gql } from "graphql-request";
import { contentfulApi } from "../../lib/contentful";

import FAQ from "../../components/FAQ";
import ReactMarkdown from "react-markdown";
import React from "react";
import HeaderText from "../../components/HeaderText";
import Sidebar from "../../components/Sidebar";
export default function Contact({ entry }) {
  return (
    <Layout>
      <BasicMeta url={"/"} />
      <section className="container__main container__sidebar">
        <div>
          <HeaderText header={entry.hero} />
          {entry.directions.title && <h2>{entry.directions.title}</h2>}
          {entry.directions.text && (
            <ReactMarkdown className="text--research">
              {entry.directions.text}
            </ReactMarkdown>
          )}
          {entry.campusDirectionsCollection.items.map((card) => (
            <FAQ summary={card.title} details={card.text} />
          ))}
        </div>
        <Sidebar contacts={entry.sidebarCollection.items} />
      </section>
      <section className="container__main "></section>
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
