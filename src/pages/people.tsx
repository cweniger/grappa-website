import Link from "next/link";
import Layout from "../components/Layout";
import BasicMeta from "../components/meta/BasicMeta";
import OpenGraphMeta from "../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../components/meta/TwitterCardMeta";
import layout from "../styles/components/Layout.module.scss";
import groupBy from 'lodash.groupby'
import people from "../styles/components/PeopleGrid.module.scss";

export default function People({ persons }) {
  // get alumni and visitors, has end date
  const personsHasEndDate = groupBy(persons, person => {
    if (person.endDate) {
      return 'alumni'
    } else {
      return 'current'
    }
  });
  /*
  * { current: [{ title, startDate, endDate}, {...}], alumni: []}
  */

  // HOLD: Pending changing all titles to correct type: Linking to new content model (Job title)

  const currentPeopleByTitle = groupBy(personsHasEndDate.current, person => person.title);

  return (
    <Layout>
      <BasicMeta url={"/"} />
      <OpenGraphMeta url={"/"} />
      <TwitterCardMeta url={"/"} />
      <div className={layout.container__main}>
        <h1>People</h1>
        <section >
        {Object.keys(currentPeopleByTitle).map(key => (
          
          <div key={key}>
            <h2>{key}</h2>
            <div className={people.peopleGrid}>
            {
              currentPeopleByTitle[key].map(fields => (
               
                <div key={fields.fullName}>
                  {fields.profilePicture ? <img src={fields.profilePicture} alt={fields.fullName} />
                    : null}
                  {fields.slug ? (<Link href={`/members/${fields.slug}`}>
                    <p>{fields.fullName}</p>
                  </Link>) : (
                      <p>{fields.fullName}</p>
                    )}
                </div>
               
              ))
            }
             </div>
          </div>
        ))}
        </section>
        <h2>Alumni</h2>
        <div>
          {
            personsHasEndDate.alumni.map(fields => (
              <div key={fields.fullName}>
                {fields.profilePicture ? <img src={fields.profilePicture} alt={fields.fullName} />
                  : null}
                {fields.slug ? (<Link href={`/members/${fields.slug}`}>
                  <p>{fields.fullName}</p>
                </Link>) : (
                    <p>{fields.fullName}</p>
                  )}
              </div>
            ))
          }
        </div>
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