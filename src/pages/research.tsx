import Layout from "../components/Layout";
import BasicMeta from "../components/meta/BasicMeta";
import layout from "../styles/components/Layout.module.scss";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
export default function Research({ researchAreas }) {
  return (
    <Layout>
      <BasicMeta url={"/"} />
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
            <h3>Staff members:</h3>
            <ul>
              {area.team.map((member) => (
                <>
                  {member.profilePicture ? (
                    <Image
                      height={100}
                      width={100}
                      src={member.profilePicture}
                    />
                  ) : null}
                  <li>{member.fullName}</li>
                </>
              ))}
            </ul>
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
  const contentType = "research";

  const URL = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environmentId}/entries?access_token=${accessToken}&content_type=${contentType}&include=2`;
  const response = await fetch(URL);
  const researchAreas = await response.json();
  const assets = researchAreas.includes.Asset;
  const teamMembers = researchAreas.includes.Entry;

  // console.log(
  //   researchAreas.items.map((item) => item.fields.team?.map((member) => member.sys))
  // );

  // console.log(researchAreas.includes.Entry[0].fields.profilePicture.sys.id);
  // console.log(researchAreas.includes.Asset[0].sys.id);

  const teamMembersWithPhotos = teamMembers.map((teamMember) => {
    // Destructure data for Entry versus Asset
    // sys contains the teamMember id, which we need to return for future use
    // fields contains content entered in Contentful
    const { sys, fields } = teamMember;
    // Check to see if profilePicture exists for the teamMember
    if (fields.profilePicture) {
      // Find the image that matches this teamMember from the assets array
      const image = assets.find((image) => {
        return fields.profilePicture.sys.id === image.sys.id;
      });
      // Provides URL for later use
      fields.profilePicture = `https:${image.fields.file.url}`;
    }

    return {
      // Provides all the data into one array
      id: sys.id,
      ...fields,
    };
  });

  const researchAreasWithTeamMembers = researchAreas.items.map((area) => {
    const { sys, fields } = area;

    if (fields.team) {
      const populatedTeam = fields.team.map((member) => {
        const memberWithPhoto = teamMembersWithPhotos.find((teamMember) => {
          return member.sys.id === teamMember.id;
        });

        return memberWithPhoto;
      });

      fields.team = populatedTeam;
    }

    return {
      id: sys.id,
      ...fields,
    };
  });

  return {
    props: {
      researchAreas: researchAreasWithTeamMembers,
    },
  };
}
