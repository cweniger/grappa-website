import Layout from "../../components/Layout";
import Card from "../../components/Card";
import BasicMeta from "../../components/meta/BasicMeta";
import { gql } from "graphql-request";
import layout from "../../styles/components/Layout.module.scss";
import people from "../../styles/components/PeopleGrid.module.scss";
import card from "../../styles/components/Card.module.scss";
import classnames from "classnames";

import { contentfulApi, getAllMembersSlugs } from "../../lib/contentful";
export default function Member({ entry }) {
  const researchAreas = entry.linkedFrom.researchCollection.items;
  return (
    <Layout>
      <BasicMeta url={"/"} />
      <section className={layout.container__main}>
        <p className="text--eyebrow__grey">{entry.jobTitle.title}</p>
        <h1>{entry.fullName}</h1>
        <div
          className={classnames(
            card.container,
            "container--flex container--flex--space-between container--medium"
          )}
        >
          <address className={people.address}>
            {entry.additionalInstitutions && (
              <p>
                <p>Additional Institutions: </p>
                <p>{entry.additionalInstitutions}</p>
              </p>
            )}
            {entry.phoneNumber && (
              <p>
                <a href={`tel:${entry.phoneNumber}`}>{entry.phoneNumber}</a>
              </p>
            )}
            {entry.emailAddress && (
              <p>
                <a href={`mailto:${entry.emailAddress}`}>
                  {entry.emailAddress}
                </a>
              </p>
            )}
            {entry.office && <p className={people.office}>{entry.office}</p>}
            {entry.websiteUrl && (
              <p>
                <a href={entry.websiteUrl}>Personal Website</a>
              </p>
            )}
            {entry.publicationUrl && (
              <p>
                <a href={entry.publicationUrl}>Published Papers</a>
              </p>
            )}
          </address>
          {entry.profilePicture ? (
            <figure>
              <img
                className={people.circleImg}
                src={entry.profilePicture.url}
                alt={entry.fullName}
              />
            </figure>
          ) : null}
        </div>
        <div>
          <h2 className="text--underscore text--underscore--small">
            Research Areas
          </h2>
          <div className={classnames(card.container, "container--flex")}>
            {researchAreas.map((area) => (
              <Card key={area.title} area={area}>
                <a href={`/research#${area.slug}`}>{area.title}</a>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const peopleData = await contentfulApi(
    gql`
      query personCollectionQuery($slug: String!) {
        personCollection(limit: 1, where: { slug: $slug }) {
          items {
            jobTitle {
              title
              order
            }
            endDate
            fullName
            office
            institution
            additionalInstitutions
            websiteUrl
            publicationUrl
            emailAddress
            phoneNumber
            slug
            profilePicture {
              url
            }
            linkedFrom {
              researchCollection {
                items {
                  title
                  slug
                  image {
                    url
                  }
                }
              }
            }
          }
        }
      }
    `,
    {
      slug: params.slug,
    }
  );

  const entry = peopleData?.personCollection.items[0] ?? [];

  if (!entry || !entry.linkedFrom?.researchCollection?.items?.length) {
    return { notFound: true };
  }

  return {
    props: {
      entry,
      preview,
    },
  };
}
export async function getStaticPaths() {
  const posts = await getAllMembersSlugs();
  const paths = posts?.map((page) => {
    return { params: { slug: page.slug } };
  });
  return {
    paths,
    fallback: false,
  };
}
