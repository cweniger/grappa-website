import Layout from "../../components/Layout";
import BasicMeta from "../../components/meta/BasicMeta";
import layout from "../../styles/components/Layout.module.scss";
import { gql } from "@apollo/client";
import client from "../../../apollo-client";
import ReactMarkdown from "react-markdown";
import React from "react";
import remarkGfm from "remark-gfm";
import FAQ from "../../components/FAQ";
export default function MScFAQ({ content }) {
  return (
    <Layout>
      <BasicMeta url={"/"} />

      <main className="container__main">
        <h1>{content.title}</h1>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content.description}
        </ReactMarkdown>
        <ul>
          {content.faqSectionCollection.items.map((faq) => (
            <FAQ summary={faq.question} details={faq.answer} />
          ))}
        </ul>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query mScFaqPageEntryQuery {
        mScFaqPage(id: "5WvpK0Q4Jt4y8KFhCvcVZb") {
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

  return {
    props: {
      content: data.mScFaqPage,
    },
  };
}
