import Layout from "../components/Layout";
import Link from "next/link";
import BasicMeta from "../components/meta/BasicMeta";
import OpenGraphMeta from "../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../components/meta/TwitterCardMeta";
import layout from "../styles/components/Layout.module.scss";

export default function Opportunities({ test }) {
  return (
    <Layout>
      <BasicMeta url={"/"} />
      <OpenGraphMeta url={"/"} />
      <TwitterCardMeta url={"/"} />
      <div className={layout.container__main}>
          <h1>{test.testText}</h1>
          <p>We announce several PhD and postdoc positions at the GRAPPA institute, related to gravitational waves, fundamental physics and cosmology.</p>

          <Link href="/"><a>See independent post-doctoral fellowships</a></Link>

          <h2>Expired Opportunities</h2>
          <ul>
            <li>
              <Link href="https://www.uva.nl/en/content/vacancies/2020/10/20-646-postdoctoral-research-positions-in-dark-universe-physics--machine-learning.html"><a>Postdoctoral research positions in Dark Universe Physics & Machine Learning</a></Link>
            </li>
            <li>
              <Link href="https://www.nikhef.nl/Peoplexs22/CandidatesPortalNoLogin/Vacancy.cfm?PortalID=13801&VacatureID=1130272"><a>PhD student in Dark Matter Research</a></Link>
            </li>
            <li>
              <Link href="https://www.nikhef.nl/Peoplexs22/CandidatesPortalNoLogin/Vacancy.cfm?PortalID=13649&VacatureID=1128971"><a>PhD studentship in Gravitational Waves and Cosmology</a></Link>
            </li>
          </ul>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const spaceId = process.env.CONTENTFUL_SPACE;
  const environmentId = process.env.CONTENTFUL_ENV;
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
  // const contentType = 'test';
  const entryId = '4O6lzaAxTKq7Y6JNEyK7YO';

  const URL = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environmentId}/entries/${entryId}?access_token=${accessToken}`;
  const response = await fetch(URL);
  const testData = await response.json();

  return { props: {
    test: testData.fields
  } };

}