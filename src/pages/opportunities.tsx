import Layout from "../components/Layout";
import Link from "next/link";
import BasicMeta from "../components/meta/BasicMeta";
import * as _ from "lodash";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import groupBy from "lodash.groupby";
import React from "react";
import { gql } from "graphql-request";
import { contentfulApi } from "../lib/contentful";
import HeaderText from "../components/HeaderText";

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
      <section className="container__main">
        <div className="container__grid__cols__2">
          <div>
            <HeaderText header={entry.hero} sideLayout={false} noImage />
            {/* <header className="">
              {entry.hero.headline && (
                <h1 className="text__eyebrow__grey">{entry.hero.headline}</h1>
              )}
              {entry.hero.subheader && (
                <p className="text__subheader">{entry.hero.subheader}</p>
              )}
            </header> */}
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
                              <span className="text__heavy">
                                {formattedDate}
                              </span>
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
                {entry?.noOpportunitiesDescription}
              </p>
            )}
          </div>
          <div>
            {image ? (
              <img
                alt={
                  entry.hero.backgroundImage.description ??
                  entry.hero.backgroundImage.title
                }
                className="image-secondary-hero"
                src={entry.hero.backgroundImage.url}
                width="500"
              />
            ) : undefined}
          </div>
        </div>

        <div className="container__small container__accent">
          {entry.postdoctoralHeadline ? (
            <h2 className="text__headline__4 space--mt--large-x">
              {entry.postdoctoralHeadline}
            </h2>
          ) : undefined}
          {entry?.postdoctoralDescription ? (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              className="text--teasers"
            >
              {entry.postdoctoralDescription}
            </ReactMarkdown>
          ) : null}
        </div>
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
          backgroundImage {
            title
            description
            url
          }
        }
        postdoctoralHeadline
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
