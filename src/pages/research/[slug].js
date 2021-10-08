import Layout from "../../components/Layout";
import BasicMeta from "../../components/meta/BasicMeta";
import layout from "../../styles/components/Layout.module.scss";
import ReactMarkdown from "react-markdown";
import ResearchGrid from "../../components/ResearchGrid";
import { getAllResearchSlugs } from "../../lib/contentful";
import { contentfulApi } from "../../lib/contentful";
import { gql } from "graphql-request";

export default function ResearchTemplate({ entry }) {
  return (
    <Layout>
      <BasicMeta url={"/"} />
      <ResearchGrid area={entry} />
    </Layout>
  );
}
export async function getStaticProps({ params, preview = false }) {
  const researchData = await contentfulApi(
    gql`
      query researchCollectionQuery($preview: Boolean!) {
        researchCollection(preview: $preview, order: order_ASC) {
          items {
            title
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

  const entry = researchData?.researchCollection.items[0] ?? [];

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
