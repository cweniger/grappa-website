import Layout from "../components/Layout";
import Link from "next/link";
import BasicMeta from "../components/meta/BasicMeta";
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
        <h2>Independent Postdoctoral Fellowships </h2>
        <p>
          Besides regular postdoctoral jobs, we have various other
          possibilities. There are postdocotral fellowships supported by the
          Netherlands and EU. We encourage strong candidates to apply for them
          with us. Please get in touch with one of the core faculty whom you are
          interested in working with!{" "}
        </p>
        <p>
          NWO Talent Program Veni
          (www.nwo.nl/en/funding/our-funding-instruments/nwo/innovational-research-incentives-scheme/veni/ew/innovational-research-incentives-scheme-veni-enw.html)
          This is a grant for researchers who have obtained their PhD within the
          last three years (extension might be possible). This fellowship is for
          three years. Next deadline: 20 May 2021 Marie Skłodowska-Curie
          Individual Fellowships
          (ec.europa.eu/research/mariecurieactions/actions/individual-fellowships_en)
          This provides a great option if you are an experienced junior
          researcher (of any nationality holding PhD or has at least four year
          full-time research experience) looking to give your career a boost by
          working at GRAPPA. It is up to two years with competitive salary. Call
          closed now. (re-opens yearly) Bilateral opportunities There are also
          several nationality-dependent opportunities. See below. Japan: JSPS
          Overseas Research Fellowships (www.jsps.go.jp/english/e-ab/index.html)
          Sweden: International postdoc grant
          (www.vr.se/english/applyingforfunding/calls/internationalpostdocgrant.5.2c821fd116dcb0e77cb2495.html)
          Switzerland: Postdoc.Mobility
          (www.snf.ch/en/funding/careers/postdoc-mobility/Pages/default.aspx)
        </p>

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
