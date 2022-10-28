import Layout from "../../components/Layout";
import BasicMeta from "../../components/meta/BasicMeta";
import layout from "../../styles/components/Layout.module.scss";
import { gql } from "@apollo/client";
import HeaderText from "../../components/HeaderText";
import { contentfulApi } from "../../lib/contentful";
import React from "react";
import Sidebar from "../../components/Sidebar";

import ResearchGrid from "../../components/ResearchGrid";
export default function MScTrackOverview({
  pageEntry,
  sidebarEntry,
  heroEntry,
  entry,
}) {
  return (
    <Layout>
      <BasicMeta url={"/"} />
      <section className="container__main container__sidebar">
        <HeaderText header={pageEntry.hero} sideLayout={false} />
        <Sidebar contact={false} items={sidebarEntry.sidebarCollection.items} />
      </section>
      {entry.mScThesisProjects.projects.items.map((project) => (
        <ResearchGrid nested={false} area={project} key={project?.sys?.id} />
      ))}
    </Layout>
  );
}

export async function getStaticProps({ preview = false }) {
  const pageQuery = gql`
    query mScThesisProjectsPageEntryQuery {
      mScThesisProjectsPage(id: "51B9BIKNgrIzRqfhba3b2p") {
        sys {
          id
        }
        hero {
          headline
          subheader
          description
        }
      }
    }
  `;

  const pageData = await contentfulApi(pageQuery, { preview });

  const pageEntry = pageData.mScThesisProjectsPage;

  const query = gql`
    query mScThesisProjects($preview: Boolean!) {
      mScThesisProjects(preview: $preview, id: "144HbgnCQuU6XINC4aH2FW") {
        sys {
          id
        }
        title
        description
        slug
        projects: thesisProjectsCollection(limit: 20) {
          items {
            sys {
              id
            }
            title
            slug
            description
            team: teamCollection(limit: 10) {
              items {
                fullName
                slug
                profilePicture {
                  url
                }
              }
            }
          }
        }
      }
    }
  `;

  const heroQuery = gql`
    query peopleHero {
      hero(id: "2HCYadT2ODRVyrRuWHSmLP") {
        headline
        subheader
      }
    }
  `;

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
  const data = await contentfulApi(query, { preview });
  const heroData = await contentfulApi(heroQuery);
  const entry = data;
  const heroEntry = heroData;
  const sidebarEntry = sidebarData.educationMainPage;

  return {
    props: {
      heroEntry,
      entry,
      pageEntry,
      sidebarEntry,
      preview,
    },
  };
}
