import Layout from "../components/Layout";
import Link from "next/link";
import BasicMeta from "../components/meta/BasicMeta";
import layout from "../styles/components/Layout.module.scss";
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
        {entry.hero.headline && (
          <h1 className="text__eyebrow__grey">{entry.hero.headline}</h1>
        )}
        {entry.hero.subheader && (
          <p className="text__subheader">{entry.hero.subheader}</p>
        )}
      </section>
      <section className="container__main">
        {jobsByExpiration.current && (
          <>
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
                  <li key={job.id} className="list__none">
                    <Link href={job.listingUrl}>
                      <>
                        <p className="text__accent__sm card__job__banner">
                          {job.position}
                        </p>
                        <div className="card__job">
                          <span className="text__news">{job.subject}</span>
                          <p className="text__detail__job">
                            Apply by{"  "}
                            <span className="text__heavy">{formattedDate}</span>
                          </p>
                        </div>
                      </>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </section>
      <section className="container__main">
        {/* <h2 className="text__underscore">
          Independent Postdoctoral Fellowships
        </h2>
        <p></p> */}
        {/* <h2>Expired Opportunities</h2>
        <ul>
          {jobsByExpiration.expired.map((job) => {
            return (
              <li key={job.id}>
                {job.position} in {job.subject}
              </li>
            );
          })}
        </ul> */}
      </section>
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
        }
        jobs: jobsCollection {
          items {
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
