import Layout from "../components/Layout";
import Link from "next/link";
import BasicMeta from "../components/meta/BasicMeta";
import layout from "../styles/components/Layout.module.scss";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import HeaderText from "../components/HeaderText";

import groupBy from "lodash.groupby";
import React from "react";
import { gql } from "graphql-request";
import { contentfulApi } from "../lib/contentful";

export default function Opportunities({ entry }) {
  const jobsByExpiration = groupBy(entry.jobs.items, (job) => {
    const expiryDate = new Date(job.closingDate);
    const today = new Date();

    if (expiryDate > today) {
      return "current";
    } else {
      return "expired";
    }
  });

  return (
    <Layout>
      <BasicMeta url={"/opportunities"} />
      <section className="container__main">
        <HeaderText header={entry.hero} image={false} sideLayout={false} />
      </section>
      <section className="container__main">
        {jobsByExpiration.current ? (
          <ul className="card__container">
            {jobsByExpiration.current.map((job) => {
              const formattedDate = new Date(
                job.closingDate
              ).toLocaleDateString("en-GB", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
              });

              return (
                <li key={job.sys.id} className="list__none link__none">
                  <Link href={job.listingUrl}>
                    <a>
                      <p className="text__accent__sm card__job__banner">
                        {job.position}
                      </p>
                      <div className="card__job">
                        <span className="text__news">{job.subject}</span>
                        <p className="text__detail__job">
                          Apply by
                          <span className="text__heavy">{formattedDate}</span>
                        </p>
                      </div>
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text__subheader">{entry.noOpportunitiesDescription}</p>
        )}
      </section>
      {/* <section className="container__main">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {entry.postdoctoralDescription}
        </ReactMarkdown>
      </section> */}
    </Layout>
  );
}

export async function getStaticProps({ preview = false }) {
  const pageQuery = gql`
    query opportunitiesPageEntryQuery {
      opportunitiesPage(id: "wT6iu1KZkHEcZomURzOmJ") {
        title
        metadata {
          title
          description
        }
        hero {
          headline
          subheader
          backgroundImage {
            url
          }
        }
        postdoctoralDescription
        noOpportunitiesDescription
        jobs: jobsCollection {
          items {
            sys {
              id
            }
            subject
            position
            closingDate
            listingUrl
          }
        }
      }
    }
  `;

  const pageData = await contentfulApi(pageQuery, { preview });

  const entry = pageData.opportunitiesPage;
  return {
    props: {
      entry,
      preview,
    },
  };
}
