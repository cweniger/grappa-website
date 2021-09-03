import Layout from "../../components/Layout";
import BasicMeta from "../../components/meta/BasicMeta";
import layout from "../../styles/components/Layout.module.scss";
// import ReactMarkdown from "react-markdown";
import { gql } from "@apollo/client";
import client from "../../../apollo-client";
import ReactMarkdown from "react-markdown";

export default function Contact({ content }) {
  return (
    <Layout>
      <BasicMeta url={"/"} />
      <main className={layout.container__main}>
        <section>
          <h1>Contact</h1>
          <h2>{content.title}</h2>
          <ReactMarkdown>{content.text}</ReactMarkdown>
        </section>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query ContactPage {
        textBlock(id: "1j0QoaJxhq6z12pEvldYqY") {
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
