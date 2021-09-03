import Link from "next/link";
import Layout from "../components/Layout";
import BasicMeta from "../components/meta/BasicMeta";
import OpenGraphMeta from "../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../components/meta/TwitterCardMeta";
import layout from "../styles/components/Layout.module.scss";
import groupBy from "lodash.groupby";
import orderBy from "lodash.orderby";
import sortBy from "lodash.sortby";
import people from "../styles/components/PeopleGrid.module.scss";
import * as _ from "lodash";
export default function People({ persons }) {
  // get alumni and visitors, has end date
  const personsHasEndDate = groupBy(persons, (person) => {
    if (person.endDate) {
      return "alumni";
    } else {
      return "current";
    }
  });
  /*
   * { current: [{ title, startDate, endDate}, {...}], alumni: []}
   */

  const sortedCurrent = _.chain(personsHasEndDate.current)
    .sortBy("fullName")
    .groupBy("title")
    .value();

  const sortedAlumni = _.chain(personsHasEndDate.alumni)
    .sortBy("fullName")
    .value();

  return (
    <Layout>
      <BasicMeta url={"/"} />
      <OpenGraphMeta url={"/"} />
      <TwitterCardMeta url={"/"} />
      <div className={layout.container__main}>
        <h1>People</h1>
        <section>
          {Object.keys(sortedCurrent).map((key) => (
            <div key={key}>
              <h2>{key}</h2>
              <div className={people.peopleGrid}>
                {sortedCurrent[key].map((fields) => (
                  <div className={people.box} key={fields.fullName}>
                    {fields.profilePicture ? (
                      <Link href={`/members/${fields.slug}`}>
                        <img
                          src={fields.profilePicture}
                          alt={fields.fullName}
                        />
                      </Link>
                    ) : (
                      <div className={people.planet} />
                    )}
                    {fields.slug ? (
                      <Link href={`/members/${fields.slug}`}>
                        <p className={people.nameCentred}>{fields.fullName}</p>
                      </Link>
                    ) : (
                      <p className={people.nameCentred}>{fields.fullName}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
        <h2>Alumni</h2>
        <div className={people.alumni}>
          {sortedAlumni.map((fields) => (
            <div key={fields.fullName}>
              {fields.slug ? (
                <Link href={`/members/${fields.slug}`}>
                  <a className={people.name}>{fields.fullName}</a>
                </Link>
              ) : (
                <p className={people.name}>{fields.fullName}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const spaceId = process.env.CONTENTFUL_SPACE;
  const environmentId = process.env.CONTENTFUL_ENV;
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
  const contentType = "person";
  // const entryId = '4O6lzaAxTKq7Y6JNEyK7YO';

  const URL = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environmentId}/entries?access_token=${accessToken}&content_type=${contentType}`;
  const response = await fetch(URL);
  const persons = await response.json();

  const items = persons.items.map((item) => item.fields);
  const assets = persons.includes.Asset;

  const itemsWithAssets = items.map((item) => {
    if (!item.profilePicture) {
      return item;
    }

    const asset = assets.find(
      (asset) => asset.sys.id === item.profilePicture.sys.id
    );
    return {
      ...item,
      profilePicture: asset.fields.file.url,
    };
  });

  return {
    props: {
      persons: itemsWithAssets,
    },
  };
}
