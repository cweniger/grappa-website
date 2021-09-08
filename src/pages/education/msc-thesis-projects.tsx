import Layout from "../../components/Layout";
import BasicMeta from "../../components/meta/BasicMeta";
import layout from "../../styles/components/Layout.module.scss";
import { gql } from "@apollo/client";
import SecondaryHero from "../../components/SecondaryHero";
import { contentfulApi } from "../../lib/contentful";
import ResearchGrid from "../../components/ResearchGrid";
export default function MScTrackOverview({ entry, heroEntry }) {
  return (
    <Layout>
      <BasicMeta url={"/"} />
      <SecondaryHero heroEntry={heroEntry} />

      <section className={layout.container__main}>
        {entry.projects.items.map((project) => (
          <ResearchGrid area={project} />
        ))}
      </section>
    </Layout>
  );
}

export async function getStaticProps({ preview = false }) {
  const query = gql`
    query mScThesisProjects($preview: Boolean!) {
      mScThesisProjects(preview: $preview, id: "144HbgnCQuU6XINC4aH2FW") {
        title
        description
        slug
        projects: thesisProjectsCollection(limit: 20) {
          items {
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

  const data = await contentfulApi(query, { preview });
  const heroData = await contentfulApi(heroQuery);
  const entry = data?.mScThesisProjects ?? null;
  const heroEntry = heroData?.hero ?? null;

  return {
    props: {
      heroEntry,
      entry,
      preview,
    },
  };
}
