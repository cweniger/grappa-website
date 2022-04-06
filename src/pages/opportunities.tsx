import Layout from "../components/Layout";
import Link from "next/link";
import BasicMeta from "../components/meta/BasicMeta";
import layout from "../styles/components/Layout.module.scss";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import HeaderText from "../components/HeaderText";
import * as _ from "lodash";

import groupBy from "lodash.groupby";
import React from "react";
import { gql } from "graphql-request";
import { contentfulApi } from "../lib/contentful";

export default function Opportunities({ entry }) {
  const jobsByExpiration = groupBy(entry.jobs.items, (job) => {
    const expiryDate = new Date(job.closingDate);
    const today = new Date();

    if (expiryDate > today) {
      _.orderBy(expiryDate);
      return "current";
    } else {
      return "expired";
    }
  });

  // Optional chaining isn't working so we have to do this ridiculous check.
  const image = entry.hero.backgroundImage
    ? entry.hero.backgroundImage.url
    : null;
  return (
    <Layout>
      <BasicMeta url={"/opportunities"} />
      <section className="container__main container__grid__cols__2">
        <div>
          <header>
            {entry.hero.headline && (
              <h1 className="text__eyebrow__grey">{entry.hero.headline}</h1>
            )}
            {entry.hero.subheader && (
              <p className="text__subheader">{entry.hero.subheader}</p>
            )}
          </header>
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
            <p className="text__subheader">
              {entry.noOpportunitiesDescription}
            </p>
          )}
        </div>
        {image && (
          <img
            className="image-secondary-hero"
            src={entry.hero.backgroundImage.url}
            width="500"
          />
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
