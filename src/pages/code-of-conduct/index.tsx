import Layout from "../../components/Layout";
import BasicMeta from "../../components/meta/BasicMeta";
import { gql } from "graphql-request";
import { contentfulApi } from "../../lib/contentful";
import remarkGfm from "remark-gfm";

import ReactMarkdown from "react-markdown";
import React from "react";
import HeaderText from "../../components/HeaderText";
import Sidebar from "../../components/Sidebar";
export default function CodeOfConduct({ entry }) {
  return (
    <Layout>
      <BasicMeta url={"/"} />
      <section className="container__main container__sidebar">
        <div className="container__flex container__flex--colstatic">
          <HeaderText header={entry.hero} sideLayout={false} />
          {entry.content && (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {entry.content}
            </ReactMarkdown>
          )}
        </div>

        <Sidebar contact={false} items={entry.sidebarCollection.items} />
      </section>
    </Layout>
  );
}

export async function getStaticProps({ preview = false }) {
  const query = gql`
    query codeOfConductEntryQuery {
      codeOfConduct(id: "5KwqzXjkSDo5wWJlTI4fkk") {
        metaData {
          title
          description
        }
        hero {
          headline
          subheader
          description
        }
        content
        sidebarCollection {
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
  const entry = data?.codeOfConduct;
  return {
    props: {
      entry,
      preview,
    },
  };
}
