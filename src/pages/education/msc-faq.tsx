import Layout from "../../components/Layout";
import BasicMeta from "../../components/meta/BasicMeta";
import layout from "../../styles/components/Layout.module.scss";
import { gql } from "@apollo/client";
import client from "../../../apollo-client";
import ReactMarkdown from "react-markdown";
import { contentfulApi } from "../../lib/contentful";

import React from "react";
import remarkGfm from "remark-gfm";
import FAQ from "../../components/FAQ";
import Sidebar from "../../components/Sidebar";

export default function MScFAQ({ content, sidebar }) {
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
            {content.description}
          </ReactMarkdown>
          <ul>
            {content.faqSectionCollection.items.map((faq) => (
              <FAQ summary={faq.question} details={faq.answer} />
            ))}
          </ul>
        </div>
        <Sidebar contact={false} items={sidebar.sidebarCollection.items} />
      </section>
    </Layout>
  );
}

export async function getStaticProps({ preview = false }) {
  const { data } = await client.query({
    query: gql`
      query mScFaqPageEntryQuery($preview: Boolean!) {
        mScFaqPage(preview: $preview, id: "5WvpK0Q4Jt4y8KFhCvcVZb") {
          sys {
            id
          }
          title
          description
          faqSectionCollection {
            items {
              question
              answer
            }
          }
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
      content: data.mScFaqPage,
    },
  };
}
