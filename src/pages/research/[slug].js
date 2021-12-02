import Layout from "../../components/Layout";
import BasicMeta from "../../components/meta/BasicMeta";
import ResearchGrid from "../../components/ResearchGrid";
import { getAllResearchSlugs } from "../../lib/contentful";
import { contentfulApi } from "../../lib/contentful";
import { gql } from "graphql-request";
import React from "react";

export default function ResearchTemplate({ entry }) {
  return (
    <Layout>
      <BasicMeta url={"/"} />
      <ResearchGrid area={entry?.researchCollection.items[0]} />
    </Layout>
  );
}
export async function getStaticProps({ params, preview = false }) {
  const researchData = await contentfulApi(
    gql`
      query researchCollectionQuery($slug: String!, $preview: Boolean!) {
        researchCollection(
          limit: 1
          where: { slug: $slug }
          preview: $preview
        ) {
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
                omitProfile
                slug
                profilePicture {
                  url
                }
              }
            }
          }
        }
      }
    `,
    {
      slug: params.slug,
      preview,
    }
  );

  const entry = researchData;

  if (!entry) {
    return { notFound: true };
  }

  return {
    props: {
      entry,
      preview,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const posts = await getAllResearchSlugs();
  const paths = posts?.map((page) => {
    return { params: { slug: page.slug } };
  });
  return {
    paths,
    fallback: "blocking",
  };
}
