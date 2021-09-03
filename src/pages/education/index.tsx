import Link from "next/link";
import Layout from "../../components/Layout";
import BasicMeta from "../../components/meta/BasicMeta";
import layout from "../../styles/components/Layout.module.scss";
import { gql } from "@apollo/client";
import client from "../../../apollo-client";
import ReactMarkdown from "react-markdown";

export default function Education({ content }) {
  return (
    <Layout>
      <BasicMeta url={"/"} />
      <main className={layout.container__main}>
        <h1>{content.title}</h1>
        <p>{content.text}</p>
        <h2>GRAPPA Msc</h2>
        <ul>
          <li>
            <Link href="/education/msc-track-overview">MSc Track Overview</Link>
          </li>
          <li>
            <Link href="/education/msc-faq">MSc FAQ</Link>
          </li>
          <li>
            <Link href="/education/msc-thesis-projects">
              MSc Thesis Projects
            </Link>
          </li>
        </ul>
        <h2>GRAPPA Ph.D. Program</h2>
        <p>
          <Link href="/education/phd-track-overview">Ph.D. Track Overview</Link>
        </p>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query EducationPage {
        textBlock(id: "74Q2vQC0Y2EGsgzM2Y1Onu") {
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
