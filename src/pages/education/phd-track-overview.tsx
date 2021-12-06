import Layout from "../../components/Layout";
import BasicMeta from "../../components/meta/BasicMeta";
import layout from "../../styles/components/Layout.module.scss";
import { gql } from "@apollo/client";
import client from "../../../apollo-client";
import ReactMarkdown from "react-markdown";
import React from "react";

export default function PhDTrackOverview({ content }) {
  return (
    <Layout>
      <BasicMeta url={"/"} />
      <main className="container__main">
        <h1>{content.title}</h1>
        <ReactMarkdown>{content.text}</ReactMarkdown>
      </main>
    </Layout>
  );
}
export async function getStaticProps() {
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

  return {
    props: {
      content: data.textBlock,
    },
  };
}
