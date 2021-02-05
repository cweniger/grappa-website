import Link from "next/link";
import Layout from "../components/Layout";
import BasicMeta from "../components/meta/BasicMeta";
import OpenGraphMeta from "../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../components/meta/TwitterCardMeta";
import layout from "../styles/components/Layout.module.scss";
import groupBy from 'lodash.groupby'

export default function People({ persons }) {
  const personsByTitle = groupBy(persons, person => person.title);
  return (
    <Layout>
      <BasicMeta url={"/"} />
      <OpenGraphMeta url={"/"} />
      <TwitterCardMeta url={"/"} />
      <div className={layout.container__main}>
        <h1>People</h1>
        {Object.keys(personsByTitle).map(key => (
          <div key={key}>
            <h2>{key}</h2>
            {
              personsByTitle[key].map(fields => (
                <div key={fields.fullName}>
                  {fields.profilePicture ? <img src={fields.profilePicture} alt={fields.fullName} />
                    : null}
                  {fields.slug ? (<Link href={`/members/${fields.slug}`}>
                    <h3>{fields.fullName}</h3>
                  </Link>) : (
                      <h3>{fields.fullName}</h3>
                    )}
                </div>
              ))
            }
          </div>
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const spaceId = process.env.CONTENTFUL_SPACE;
  const environmentId = process.env.CONTENTFUL_ENV;
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
  const contentType = 'person';
  // const entryId = '4O6lzaAxTKq7Y6JNEyK7YO';

  const URL = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environmentId}/entries?access_token=${accessToken}&content_type=${contentType}`;
  const response = await fetch(URL);
  const persons = await response.json();

  const items = persons.items.map(item => item.fields);
  const assets = persons.includes.Asset;

  const itemsWithAssets = items.map(item => {
    if (!item.profilePicture) {
      return item;
    }

    const asset = assets.find(asset => asset.sys.id === item.profilePicture.sys.id);
    return {
      ...item,
      profilePicture: asset.fields.file.url
    }
  });

  return {
    props: {
      persons: itemsWithAssets,
    }
  };
}