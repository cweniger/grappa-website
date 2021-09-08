import Layout from "../../components/Layout";
import Card from "../../components/Card";
import BasicMeta from "../../components/meta/BasicMeta";
import { gql } from "graphql-request";
import layout from "../../styles/components/Layout.module.scss";
import people from "../../styles/components/PeopleGrid.module.scss";
import card from "../../styles/components/Card.module.scss";
import classnames from "classnames";

import { contentfulApi, getAllMembersSlugs } from "../../lib/contentful";
export default function Member({ entry, preview }) {
  const researchAreas = entry?.linkedFrom?.researchCollection?.items ?? [];
  const projects = entry.linkedFrom.thesisProjectCollection.items ?? [];
  return (
    <Layout preview={preview}>
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
        <div className={classnames(card.container, "container--flex")}>
          {researchAreas.length > 0 && (
            <div>
              <h2 className="text--underscore text--underscore--small">
                Research Areas
              </h2>
              <div className={classnames(card.container, "container--flex")}>
                {researchAreas.map((area) => (
                  <Card
                    title={area.title}
                    image={area.image}
                    slug={`/research#${area.slug}`}
                  />
                ))}
              </div>
            </div>
          )}
          {projects.length > 0 && (
            <div>
              <h2 className="text--underscore text--underscore--small">
                Masters Thesis Projects
              </h2>
              <div className="">
                {projects.map((area) => (
                  <p key={area.title} area={area}>
                    <a href={`/education/msc-thesis-projects#${area.slug}`}>
                      {area.title}
                    </a>
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const peopleData = await contentfulApi(
    gql`
      query personCollectionQuery($slug: String!, $preview: Boolean!) {
        personCollection(limit: 1, where: { slug: $slug }, preview: $preview) {
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
              researchCollection(limit: 10) {
                items {
                  title
                  slug
                  image {
                    url
                  }
                }
              }
              thesisProjectCollection(limit: 20) {
                items {
                  title
                  slug
                  description
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

  const entry = peopleData?.personCollection.items[0] ?? [];

  if (!entry) {
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
