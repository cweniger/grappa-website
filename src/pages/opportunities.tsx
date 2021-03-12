import Layout from "../components/Layout";
import Link from "next/link";
import BasicMeta from "../components/meta/BasicMeta";
import OpenGraphMeta from "../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../components/meta/TwitterCardMeta";
import layout from "../styles/components/Layout.module.scss";
import groupBy from "lodash.groupby";

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
      <OpenGraphMeta url={"/"} />
      <TwitterCardMeta url={"/"} />
      <div className={layout.container__main}>
        <p>
          We announce several PhD and postdoc positions at the GRAPPA institute,
          related to gravitational waves, fundamental physics and cosmology.
        </p>

        <Link href="/">
          <a>See independent post-doctoral fellowships</a>
        </Link>

        <h2>Current Opportunities</h2>
        <ul>
          {jobsByExpiration.current?.map((job) => {
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

        <h2>Expired Opportunities</h2>
        <ul>
          {jobsByExpiration.expired?.map((job) => {
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
