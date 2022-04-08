import Layout from "../../components/Layout";
import BasicMeta from "../../components/meta/BasicMeta";
import { gql } from "@apollo/client";
import client from "../../../apollo-client";
import ReactMarkdown from "react-markdown";
import React from "react";
import Sidebar from "../../components/Sidebar";
import { contentfulApi } from "../../lib/contentful";
import remarkGfm from "remark-gfm";

export default function MScTrackOverview({ pageEntry, content }) {
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
        <Sidebar contact={false} items={pageEntry.sidebarCollection.items} />
      </section>
    </Layout>
  );
}

export async function getStaticProps({ preview = false }) {
  const query = gql`
    query educationMainPageEntryQuery {
      educationMainPage(id: "7eIBFLa5SMxR8ZCKqIXNCd") {
        title
        hero {
          headline
          subheader
          backgroundImage {
            url
          }
        }
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
  const sidebarData = await contentfulApi(query, { preview });

  const entry = sidebarData.educationMainPage;

  const pageQuery = gql`
  query mScThesisProjectsPageEntryQuery {
  mScThesisProjectsPage(id: "51B9BIKNgrIzRqfhba3b2p") {
    sys {
      id
    }`;

  const pageData = await contentfulApi(pageQuery, { preview });

  const pageEntry = pageData.mScThesisProjectsPage;

  return {
    props: {
      entry,
      pageEntry,
      preview,
    },
  };
}
