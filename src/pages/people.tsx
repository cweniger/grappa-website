import Link from "next/link";
import Layout from "../components/Layout";
import BasicMeta from "../components/meta/BasicMeta";
import layout from "../styles/components/Layout.module.scss";
import groupBy from "lodash.groupby";
import people from "../styles/components/PeopleGrid.module.scss";
import classnames from "classnames";
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
      <section className={(layout.container__full, people.color)}>
        <div className={classnames(layout.container__main)}>
          <h1 className={people.accent}>Meet our team</h1>
          <p className={classnames(people.hero, "text__headline__2")}>
            GRAPPA researchers have wide research interests, including dark
            matter phenomenology, cosmic rays, high-energy astrophysics,
            cosmology, black holes physics, gravitational waves, and string
            theory.
          </p>
        </div>
      </section>
      {Object.keys(sortedCurrent).map((key) => (
        <section className={classnames(layout.container__main)} key={key}>
          <h2 className={classnames(people.underscore, "text__headline__3")}>
            {key}
          </h2>
          <div className={people.peopleGrid}>
            {sortedCurrent[key].map((fields) => (
              <div className={people.box} key={fields.fullName}>
                {fields.profilePicture ? (
                  <Link href={`/members/${fields.slug}`}>
                    <img src={fields.profilePicture} alt={fields.fullName} />
                  </Link>
                ) : (
                  <Link href={`/members/${fields.slug}`}>
                    <div className={people.planet} />
                  </Link>
                )}
                {fields.slug ? (
                  <Link href={`/members/${fields.slug}`}>
                    <a className={people.nameCentred}>{fields.fullName}</a>
                  </Link>
                ) : (
                  <p className={people.nameCentred}>{fields.fullName}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}
      <section className={classnames(layout.container__main)}>
        <h2 className={classnames(people.underscore, "text__headline__3")}>
          Alumni
        </h2>
        <ul className={people.alumni}>
          {sortedAlumni.map((fields) => (
            <li key={fields.fullName}>
              {fields.slug ? (
                <Link href={`/members/${fields.slug}`}>
                  <a className={people.name}>{fields.fullName}</a>
                </Link>
              ) : (
                <p className={people.name}>{fields.fullName}</p>
              )}
            </li>
          ))}
        </ul>
      </section>
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
