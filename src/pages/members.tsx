import Layout from "../components/Layout";
import BasicMeta from "../components/meta/BasicMeta";
import PeopleAvatar from "../components/PeopleAvatar";
import groupBy from "lodash.groupby";
import people from "../styles/components/PeopleGrid.module.scss";
import * as _ from "lodash";
import { gql } from "graphql-request";
import { contentfulApi } from "../lib/contentful";
import SecondaryHero from "../components/SecondaryHero";
import React, { Fragment } from "react";

export default function Members({ persons, heroEntry }) {
  // get alumni and visitors, has end date
  const grappaMembers = groupBy(persons.persons.items, (person) => {
    if (person.omitProfile === true) {
      return "nonmember";
    } else {
      return "member";
    }
  });

  const personsHasEndDate = groupBy(grappaMembers.member, (person) => {
    let todayRaw = new Date();
    const today = todayRaw.toISOString();

    if (person.endDate > today || person.endDate == null) {
      return "current";
    } else if (person.endDate < today) {
      return "alumni";
    }
  });
  /*
   * { current: [{ title, startDate, endDate}, {...}], alumni: []}
   */

  // sorts current by fullName, then groups by title and lastly puts in order of section order (manually input)
  const sortedCurrent = _.chain(personsHasEndDate.current)
    .sortBy("fullName")
    .orderBy("jobTitle.order")
    .groupBy("jobTitle.title")
    .value();

  const sortedAlumni = _.chain(personsHasEndDate.alumni)
    .sortBy("fullName")
    .value();

  return (
    <Layout>
      <BasicMeta url={"/"} />
      <SecondaryHero
        heroEntry={heroEntry.hero}
        className=""
        innerClassName=""
      />
      <section className="container__main">
        {Object.keys(sortedCurrent).map((key) => {
          const boxCheck = sortedCurrent[key].length > 3;

          if (boxCheck) {
            return (
              <Fragment key={key}>
                <h2 className="text__underscore text__headline__4">{key}</h2>
                <div
                  className={boxCheck ? people.peopleGrid : people?.smallDept}
                >
                  {sortedCurrent[key]?.map((fields) => {
                    return (
                      <PeopleAvatar key={fields?.sys?.id} fields={fields} />
                    );
                  })}
                </div>
              </Fragment>
            );
          }
          return (
            <div key={key} className={people.peopleSection}>
              <h2 className="text__underscore text__headline__4">{key}</h2>
              <div className={boxCheck ? people.peopleGrid : people.smallDept}>
                {sortedCurrent[key].map((fields) => {
                  return <PeopleAvatar fields={fields} key={fields?.sys?.id} />;
                })}
              </div>
            </div>
          );
        })}

        <h2 className="text__underscore text__headline__4">Alumni</h2>
        <ul className={people.alumni}>
          {sortedAlumni.map((fields) => (
            <li key={fields.fullName}>
              {fields.fullName && (
                <p className={people.name}>{fields.fullName}</p>
              )}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export async function getStaticProps({ preview = false }) {
  const peopleQuery = gql`
    query personCollectionQuery($preview: Boolean!) {
      persons: personCollection(preview: $preview, limit: 500) {
        items {
          sys {
            id
          }
          jobTitle {
            title
            order
          }
          contactTitle
          showContactTitle
          omitProfile
          endDate
          fullName
          slug
          profilePicture {
            url
          }
        }
      }
    }
  `;

  const query = gql`
    query researchCollectionQuery($preview: Boolean!) {
      researchCollection(preview: $preview) {
        items {
          title
          description
          team: teamCollection(limit: 50) {
            items {
              fullName
              profilePicture {
                url
              }
            }
          }
        }
      }
    }
  `;

  const heroQuery = gql`
    query peopleHero {
      hero(id: "3WITI7pVyu4moV9qQIB4Ll") {
        headline
        subheader
      }
    }
  `;

  const data = await contentfulApi(query, { preview });
  const peopleData = await contentfulApi(peopleQuery, { preview });
  const heroData = await contentfulApi(heroQuery, { preview });
  const entry = data;
  const persons = peopleData;
  const heroEntry = heroData;
  return {
    props: {
      entry,
      heroEntry,
      preview,
      persons,
    },
  };
}
