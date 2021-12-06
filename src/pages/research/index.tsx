import { gql } from "graphql-request";
import Layout from "../../components/Layout";
import SecondaryHero from "../../components/SecondaryHero";
import BasicMeta from "../../components/meta/BasicMeta";
import layout from "../../styles/components/Layout.module.scss";
import { contentfulApi } from "../../lib/contentful";
import classnames from "classnames";
import Card from "../../components/Card";
import Row from "../../components/Row";
import React from "react";
import groupBy from "lodash.groupby";

import research from "../../styles/components/Research.module.scss";
export default function Research({ entry, heroEntry }) {
  const researchByType = groupBy(entry.researchCollection.items, (area) => {
    if (area.researchType == "Research Theme") {
      return "theme";
    } else {
      return "experiment";
    }
  });
  return (
    <Layout>
      <BasicMeta url={"/"} />
      <SecondaryHero heroEntry={heroEntry.hero} />

      <section
        className={classnames(
          layout.container__main,
          research.container,
          "container__flex container__flex--space-between"
        )}
      >
        {researchByType.theme.map((area) => (
          <Card
            key={area.title}
            title={area.title}
            image={area.image}
            slug={`/research/${area.slug}`}
          />
        ))}
      </section>

      <section className="container__main">
        <p className="text__headline__1">
          We also have major areas of experimentation.
        </p>
        <div
          className={classnames("container__flex container__flex--colstatic")}
        >
          {researchByType.experiment.map((area) => (
            <Row
              key={area.title}
              title={area.title}
              image={area.image}
              slug={`/research/${area.slug}`}
            />
          ))}
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps({ preview = false }) {
  const query = gql`
    query researchCollectionQuery($preview: Boolean!) {
      researchCollection(preview: $preview, order: order_ASC) {
        items {
          title
          abstract
          description
          image {
            url
          }
          researchType
          order
          slug
          team: teamCollection(limit: 10) {
            items {
              fullName
              slug
              omitProfile
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
  const entry = data;
  const heroEntry = heroData;
  return {
    props: {
      entry,
      heroEntry,
      preview,
    },
  };
}
