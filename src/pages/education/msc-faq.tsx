import Layout from "../../components/Layout";
import BasicMeta from "../../components/meta/BasicMeta";
import OpenGraphMeta from "../../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../../components/meta/TwitterCardMeta";
import layout from "../../styles/components/Layout.module.scss";
import { gql } from "@apollo/client";
import client from "../../../apollo-client";
import ReactMarkdown from "react-markdown";

export default function MScFAQ({ content }) {
  return (
    <Layout>
      <BasicMeta url={"/"} />
      <OpenGraphMeta url={"/"} />
      <TwitterCardMeta url={"/"} />

      <main className={layout.container__main}>
        <h1>{content.title}</h1>
        <ReactMarkdown>{content.description}</ReactMarkdown>
        <ul>
          {content.faqSectionCollection.items.map((faq) => (
            <li key={faq.question}>
              <h3>{faq.question}</h3>
              <ReactMarkdown>{faq.answer}</ReactMarkdown>
            </li>
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
