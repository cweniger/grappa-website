import Layout from "../components/Layout";
import BasicMeta from "../components/meta/BasicMeta";
import OpenGraphMeta from "../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../components/meta/TwitterCardMeta";
import layout from "../styles/components/Layout.module.scss";
import ReactMarkdown from "react-markdown";
export default function Research({ researchAreas }) {
  return (
    <Layout>
      <BasicMeta url={"/"} />
      <OpenGraphMeta url={"/"} />
      <TwitterCardMeta url={"/"} />
      <div className={layout.container__main}>
        <h1>Research</h1>
        <p>
          The research at GRAPPA lies at the intersection of astrophysics,
          theoretical physics, particle/high-energy physics, and cosmology. We
          focus on four core research directions.
        </p>

        {researchAreas.map((area) => (
          <div key={area.title}>
            <h2>{area.title}</h2>
            <ReactMarkdown>{area.description}</ReactMarkdown>
          </div>
        ))}

        {/* <h3>Staff members:</h3>
        <ul>
          <li>Samaya Nissanke</li>
          <li>Philipp Moesta</li>
          <li>Daniel Baumann</li>
          <li>Gianfranco Bertone</li>
          <li>Christoph Weniger</li>
          <li>Silvia Toonen</li>
          <li>Frank Linde (Nikhef)</li>
          <li>Nikhef/UvA members add</li>
        </ul> */}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const spaceId = process.env.CONTENTFUL_SPACE;
  const environmentId = process.env.CONTENTFUL_ENV;
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
  const contentType = "research";

  const URL = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environmentId}/entries?access_token=${accessToken}&content_type=${contentType}`;
  const response = await fetch(URL);
  const researchAreas = await response.json();

  return {
    props: {
      researchAreas: researchAreas.items.map((item) => item.fields),
    },
  };
}
