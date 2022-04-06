import Layout from "../../components/Layout";
import BasicMeta from "../../components/meta/BasicMeta";
import { gql } from "@apollo/client";
import ReactMarkdown from "react-markdown";
import React from "react";
import { contentfulApi } from "../../lib/contentful";
import remarkGfm from "remark-gfm";
import Sidebar from "../../components/Sidebar";

export default function MScTrackOverview({ entry, sidebar }) {
  return (
    <Layout>
      <BasicMeta url={"/"} />
      <section className="container__main container__sidebar">
        <div>
          <h1 className="text__eyebrow__grey">{entry.title}</h1>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            className="details__directions text__subheader"
          >
            {entry.description}
          </ReactMarkdown>
        </div>
        <Sidebar contact={false} items={sidebar.sidebarCollection.items} />
      </section>
    </Layout>
  );
}

export async function getStaticProps({ preview = false }) {
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

  const query = gql`
    query mScCurriculumPageEntryQuery($preview: Boolean!) {
      mScCurriculumPage(preview: $preview, id: "5AAsb6egIisMk4DUXRZgtX") {
        sys {
          id
        }
        title
        description
      }
    }
  `;

  const data = await contentfulApi(query, { preview });
  const entry = data.mScCurriculumPage;

  return {
    props: {
      sidebar,
      entry,
      preview,
    },
  };
}
