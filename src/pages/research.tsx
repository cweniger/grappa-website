import { gql } from "graphql-request";
import Layout from "../components/Layout";
import SecondaryHero from "../components/SecondaryHero";
import BasicMeta from "../components/meta/BasicMeta";
import layout from "../styles/components/Layout.module.scss";
import ReactMarkdown from "react-markdown";
import { contentfulApi } from "../lib/contentful";
import classnames from "classnames";
import Avatar from "../components/Avatar";
import people from "../styles/components/PeopleGrid.module.scss";
import sortBy from "lodash.sortby";
import Card from "../components/Card";

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
          <Card key={area.title} area={area} />
        ))}
      </section>
      {entry.map((area) => (
        <section
          id={`${area.slug}`}
          key={area.title}
          className={layout.container__main}
        >
          <div className={research.area}>
            <div className={research.summary}>
              <h2 className="text--research text__headline__2">{area.title}</h2>
              <p className={research.blurb}>
                The early universe was hot and dense. Interactions between
                particles were very frequent and energetic. Matter was in the
                form of free electrons and atomic nuclei with light bouncing
                between them.{" "}
              </p>
              <h3 className="text--eyebrow__grey">Team</h3>
              <ul className={people.miniPeopleGrid}>
                {area.team.items.map((member) => (
                  <Avatar small person={member} />
                ))}
              </ul>
            </div>

            <div>
              <ReactMarkdown>{area.description}</ReactMarkdown>
            </div>
          </div>
        </section>
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
