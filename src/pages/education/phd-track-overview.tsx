import Layout from "../../components/Layout";
import BasicMeta from "../../components/meta/BasicMeta";
import { contentfulApi } from "../../lib/contentful";

import { gql } from "@apollo/client";
import client from "../../../apollo-client";
import ReactMarkdown from "react-markdown";
import React from "react";
import remarkGfm from "remark-gfm";
import Sidebar from "../../components/Sidebar";

export default function PhDTrackOverview({ content, sidebar }) {
  return (
    <Layout>
      <BasicMeta url={"/"} />
      <section className="container__main container__sidebar">
        <div>
          <h1 className="text__eyebrow__grey">{content.title}</h1>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            className="details__directions text__subheader"
          >
            {content.text}
          </ReactMarkdown>
        </div>
        <Sidebar contact={false} items={sidebar.sidebarCollection.items} />
      </section>
    </Layout>
  );
}
export async function getStaticProps({ preview = false }) {
  const { data } = await client.query({
    query: gql`
      query PhdTrackOverviewPage {
        textBlock(id: "4CDK3lFZu3s96reSTDbSVd") {
          sys {
            id
          }
          title
          text
        }
      }
    `,
  });

  const sidebarQuery = gql`
    query educationMainPageEntryQuery {
      educationMainPage(id: "7eIBFLa5SMxR8ZCKqIXNCd") {
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
  const sidebarData = await contentfulApi(sidebarQuery, { preview });

  const sidebar = sidebarData.educationMainPage;

  return {
    props: {
      sidebar,
      preview,
      content: data.textBlock,
    },
  };
}
