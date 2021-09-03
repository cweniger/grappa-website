import Layout from "../../components/Layout";
import BasicMeta from "../../components/meta/BasicMeta";
import layout from "../../styles/components/Layout.module.scss";
import { gql } from "@apollo/client";
import client from "../../../apollo-client";
import ReactMarkdown from "react-markdown";

export default function MScTrackOverview({ content }) {
  return (
    <Layout>
      <BasicMeta url={"/"} />
      <main className={layout.container__main}>
        <h1>{content.title}</h1>
        <ReactMarkdown>{content.text}</ReactMarkdown>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query MscTrackOverviewPage {
        textBlock(id: "3NIrQbEeQQBiJS9arJBjoq") {
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
