import Layout from "../components/Layout";
import Link from "next/link";
import BasicMeta from "../components/meta/BasicMeta";
import layout from "../styles/components/Layout.module.scss";
import groupBy from "lodash.groupby";
import React from "react";

export default function Opportunities({ jobs }) {
  const jobsByExpiration = groupBy(jobs, (job) => {
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
      <BasicMeta url={"/"} />
      <div className={layout.container__main}>
        <p>
          We announce several PhD and postdoc positions at the GRAPPA institute,
          related to gravitational waves, fundamental physics and cosmology.
        </p>

        <h2>Current Opportunities</h2>
        <ul>
          {jobsByExpiration.current.map((job) => {
            return (
              <li key={job.id}>
                <Link href={job.listingUrl}>
                  <a>
                    {job.position} in {job.subject}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
        <h2>Independent Postdoctoral Fellowships </h2>
        <p>
          Besides regular postdoctoral jobs, we have various other
          possibilities. There are postdocotral fellowships supported by the
          Netherlands and EU. We encourage strong candidates to apply for them
          with us. Please get in touch with one of the core faculty whom you are
          interested in working with!{" "}
        </p>
        <h3>
          <a href="https://www.nwo.nl/en/calls/nwo-talent-programme-veni-social-sciences-and-humanities-ssh">
            NWO Talent Program Veni
          </a>
        </h3>
        <p>
          Grant for researchers who have obtained their PhD within the last
          three years (extension might be possible). This fellowship is for
          three years. Next deadline: 20 May 2021{" "}
        </p>
        <h3>
          <a href="https://ec.europa.eu/research/mariecurieactions/actions/postdoctoral-fellowships">
            Marie Skłodowska-Curie Individual Fellowships
          </a>
        </h3>
        <p>
          Fellowship for an experienced junior researcher (of any nationality
          holding PhD or has at least four year full-time research experience)
          looking to give your career a boost by working at GRAPPA. It is up to
          two years with competitive salary. Call closed now. (re-opens yearly)
        </p>
        <h3>Nationality-dependent opportunities</h3>
        <p>
          <h4>Japan</h4>
          <p>
            <a href="https://www.jsps.go.jp/english/e-ab/index.html">
              JSPS Overseas Research Fellowships
            </a>
          </p>
          <h4>Sweden</h4>
          <a href="https://www.vr.se/english/applyingforfunding/calls/internationalpostdocgrant.5.2c821fd116dcb0e77cb2495.html">
            International postdoc grant
          </a>
          <h4>Switzerland</h4>{" "}
          <a href="https://www.snf.ch/en/XIZpfY3iVS5KRRoD/funding/careers/postdoc-mobility">
            Postdoc.Mobility
          </a>
        </p>

        <h2>Expired Opportunities</h2>
        <ul>
          {jobsByExpiration.expired.map((job) => {
            return (
              <li key={job.id}>
                {job.position} in {job.subject}
              </li>
            );
          })}
        </ul>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const spaceId = process.env.CONTENTFUL_SPACE;
  const environmentId = process.env.CONTENTFUL_ENV;
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
  const contentType = "job";

  const URL = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environmentId}/entries?access_token=${accessToken}&content_type=${contentType}`;
  const response = await fetch(URL);
  const jobs = await response.json();

  return {
    props: {
      jobs: jobs.items.map((item) => ({
        ...item.fields,
        id: item.sys.id,
      })),
    },
  };
}
