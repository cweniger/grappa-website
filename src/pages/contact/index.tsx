import Layout from "../../components/Layout";
import BasicMeta from "../../components/meta/BasicMeta";
import layout from "../../styles/components/Layout.module.scss";
import { gql } from "@apollo/client";
import client from "../../../apollo-client";
import ReactMarkdown from "react-markdown";
import React from "react";

export default function Contact({ content }) {
  return (
    <Layout>
      <BasicMeta url={"/"} />
      <section className="container__main container__flex">
        <div>
          {/* {heroEntry.hero.headline && (
          <h1 className="text__eyebrow__grey">{heroEntry.hero.headline}</h1>
        )} */}
          <h2>{content.title}</h2>
          <ReactMarkdown>{content.text}</ReactMarkdown>
        </div>
        <aside className="container__aside">
          GRAPPA Contacts GRAPPA spokesperson: Samaya Nissanke GRAPPA MSc track
          coordinator: Shin'ichiro Ando Administrative contact: Jiřina Šálková
          See the people page to find all GRAPPA cohorts Please feel free to
          contact any of the staff members for questions!
        </aside>
      </section>
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
