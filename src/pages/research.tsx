import { gql } from "graphql-request";
import Layout from "../components/Layout";
import SecondaryHero from "../components/SecondaryHero";
import BasicMeta from "../components/meta/BasicMeta";
import layout from "../styles/components/Layout.module.scss";
import { contentfulApi } from "../lib/contentful";
import classnames from "classnames";
import Card from "../components/Card";
import ResearchGrid from "../components/ResearchGrid";

import research from "../styles/components/Research.module.scss";
export default function Research({ entry, heroEntry }) {
  return (
    <Layout>
      <BasicMeta url={"/"} />
      <SecondaryHero heroEntry={heroEntry} />

      <section
        className={classnames(
          layout.container__main,
          research.container,
          "container--flex"
        )}
      >
        {entry.map((area) => (
          <Card
            key={area.title}
            title={area.title}
            image={area.image}
            slug={`/research#${area.slug}`}
          />
        ))}
      </section>
      {entry.map((area) => (
        <ResearchGrid area={area} />
      ))}
    </Layout>
  );
}

export async function getStaticProps({ preview = false }) {
  const query = gql`
    query researchCollectionQuery($preview: Boolean!) {
      researchCollection(preview: $preview) {
        items {
          title
          description
          image {
            url
          }
          slug
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
  `;

  const heroQuery = gql`
    query researchHero {
      hero(id: "5ABoPmLRoL8Zznw6CMhkOA") {
        headline
        subheader
      }
    }
  `;

  const data = await contentfulApi(query, { preview });
  const heroData = await contentfulApi(heroQuery, { preview });
  const entry = data?.researchCollection?.items ?? null;
  const heroEntry = heroData?.hero ?? null;
  return {
    props: {
      entry,
      heroEntry,
      preview,
    },
  };
}
