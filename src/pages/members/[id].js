import Layout from "../../components/Layout";
import BasicMeta from "../../components/meta/BasicMeta";
import OpenGraphMeta from "../../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../../components/meta/TwitterCardMeta";
import layout from "../../styles/components/Layout.module.scss";

export default function People({ member }) {
  return (
    <Layout>
      <BasicMeta url={"/"} />
      <OpenGraphMeta url={"/"} />
      <TwitterCardMeta url={"/"} />
      <div className={layout.container__main}>
        <h1>{member.fullName}</h1>
        {member.profilePicture ? <img src={member.profilePicture} alt={member.fullName} />
          : null}
        <p>{member.institution}</p>
        <p>{member.phoneNumber}</p>
        <p>{member.office}</p>
      </div>
    </Layout>
  );
}

const spaceId = process.env.CONTENTFUL_SPACE;
const environmentId = process.env.CONTENTFUL_ENV;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
const contentType = 'person';

export async function getStaticPaths() {
  // Call an external API endpoint to get member posts
  const URL = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environmentId}/entries?access_token=${accessToken}&content_type=${contentType}`;
  const res = await fetch(URL);
  const persons = await res.json();

  // Get the paths we want to pre-render based on member posts
  const paths = persons.items.map((person) => `/members/${person.fields.slug}`);

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const URL = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environmentId}/entries?access_token=${accessToken}&fields.slug=${params.id}&content_type=${contentType}`;
  
  const response = await fetch(URL);
  const members = await response.json();
  const member = members.items[0].fields;

  if (!member.profilePicture) {
    return { props: { member } }
  }

  const asset = members.includes.Asset[0];
  return {
    props: {
      member: {
        ...member,
        profilePicture: asset.fields.file.url
      }
    }
  }
}