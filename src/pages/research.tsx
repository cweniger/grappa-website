import { gql } from "graphql-request";
import Layout from "../components/Layout";
import SecondaryHero from "../components/SecondaryHero";
import BasicMeta from "../components/meta/BasicMeta";
import layout from "../styles/components/Layout.module.scss";
import ReactMarkdown from "react-markdown";
import { contentfulApi } from "../lib/contentful";
import classnames from "classnames";
import Avatar from "../components/Avatar";
import people from "../styles/components/PeopleGrid.module.scss";
import sortBy from "lodash.sortby";
import research from "../styles/components/Research.module.scss";
export default function Research({ entry, heroEntry }) {
  return (
    <Layout>
      <BasicMeta url={"/"} />
      <SecondaryHero heroEntry={heroEntry} />

      {entry.map((area) => (
        <section key={area.title} className={layout.container__main}>
          <div className={research.area}>
            <div className={research.summary}>
              <h2 className="text--research text__headline__2">{area.title}</h2>
              <p className={research.blurb}>
                The early universe was hot and dense. Interactions between
                particles were very frequent and energetic. Matter was in the
                form of free electrons and atomic nuclei with light bouncing
                between them.{" "}
              </p>
              <h3 className="text--eyebrow__grey">Team</h3>
              <ul className={people.miniPeopleGrid}>
                {area.team.items.map((member) => (
                  <Avatar small person={member} />
                ))}
              </ul>
            </div>

            <div>
              <ReactMarkdown>{area.description}</ReactMarkdown>
            </div>
          </div>
        </section>
      ))}
    </Layout>
  );
}

export async function getStaticProps({ preview = false }) {
  const query = gql`
    query researchCollectionQuery($preview: Boolean!) {
      researchCollection(preview: $preview) {
        items {
          title
          description
          team: teamCollection(limit: 10) {
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
    query researchHero {
      hero(id: "5ABoPmLRoL8Zznw6CMhkOA") {
        headline
        subheader
      }
    }
  `;

  const data = await contentfulApi(query, { preview });
  const heroData = await contentfulApi(heroQuery, { preview });
  const entry = data?.researchCollection?.items ?? null;
  const heroEntry = heroData?.hero ?? null;
  return {
    props: {
      entry,
      heroEntry,
      preview,
    },
  };
}

// export async function getStaticProps() {
//   const spaceId = process.env.CONTENTFUL_SPACE;
//   const environmentId = process.env.CONTENTFUL_ENV;
//   const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
//   const contentType = "research";

//   const URL = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environmentId}/entries?access_token=${accessToken}&content_type=${contentType}&include=2`;
//   const response = await fetch(URL);
//   const researchAreas = await response.json();
//   const assets = researchAreas.includes.Asset;
//   const teamMembers = researchAreas.includes.Entry;

//   const teamMembersWithPhotos = teamMembers.map((teamMember) => {
//     // Destructure data for Entry versus Asset
//     // sys contains the teamMember id, which we need to return for future use
//     // fields contains content entered in Contentful
//     const { sys, fields } = teamMember;
//     // Check to see if profilePicture exists for the teamMember
//     if (fields.profilePicture) {
//       // Find the image that matches this teamMember from the assets array
//       const image = assets.find((image) => {
//         return fields.profilePicture.sys.id === image.sys.id;
//       });
//       // Provides URL for later use
//       fields.profilePicture = `https:${image.fields.file.url}`;
//     }

//     return {
//       // Provides all the data into one array
//       id: sys.id,
//       ...fields,
//     };
//   });

//   const researchAreasWithTeamMembers = researchAreas.items.map((area) => {
//     const { sys, fields } = area;

//     if (fields.team) {
//       const populatedTeam = fields.team.map((member) => {
//         const memberWithPhoto = teamMembersWithPhotos.find((teamMember) => {
//           return member.sys.id === teamMember.id;
//         });

//         return memberWithPhoto;
//       });

//       fields.team = populatedTeam;
//     }

//     return {
//       id: sys.id,
//       ...fields,
//     };
//   });

//   return {
//     props: {
//       researchAreas: researchAreasWithTeamMembers,
//     },
//   };
// }
