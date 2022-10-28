import Link from "next/link";
import Layout from "../../components/Layout";
import BasicMeta from "../../components/meta/BasicMeta";

import Sidebar from "../../components/Sidebar";
import { gql } from "@apollo/client";
import { contentfulApi } from "../../lib/contentful";
import React from "react";
import HeaderText from "../../components/HeaderText";
export default function Education({ entry }) {
  return (
    <Layout>
      <BasicMeta url={"/"} />
      <section className="container__main container__sidebar">
        <HeaderText header={entry.hero} sideLayout={false} />

        <Sidebar contact={false} items={entry.sidebarCollection.items} />
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

  const data = await contentfulApi(query, { preview });

  const entry = data.educationMainPage;

  return {
    props: {
      entry,
      preview,
    },
  };
}
