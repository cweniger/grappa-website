import Layout from "../../components/Layout";
import BasicMeta from "../../components/meta/BasicMeta";
import layout from "../../styles/components/Layout.module.scss";
import { gql } from "@apollo/client";
import client from "../../../apollo-client";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

export default function MScTrackOverview({ content }) {
  return (
    <Layout>
      <BasicMeta url={"/"} />

      <main className={layout.container__main}>
        <h1>{content.title}</h1>
        <ReactMarkdown>{content.description}</ReactMarkdown>
        {content.thesisProjectsCollection.items.map((project) => (
          <section key={project.title}>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <h3>Team Members</h3>
            <ul>
              {project.teamCollection.items.map((teamMember) => (
                <li key={teamMember.fullName}>
                  {teamMember.profilePicture ? (
                    <Link href={`/members/${teamMember.slug}`}>
                      <img
                        src={teamMember.profilePicture.url}
                        alt={teamMember.fullName}
                      />
                    </Link>
                  ) : (
                    <div></div>
                  )}
                  {teamMember.slug ? (
                    <Link href={`/members/${teamMember.slug}`}>
                      <p>{teamMember.fullName}</p>
                    </Link>
                  ) : (
                    <p>{teamMember.fullName}</p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query mScThesisProjects {
        mScThesisProjects(id: "144HbgnCQuU6XINC4aH2FW") {
          sys {
            id
          }
          title
          description
          thesisProjectsCollection(limit: 20) {
            items {
              title
              description
              teamCollection(limit: 10) {
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
      }
    `,
  });

  return {
    props: {
      content: data.mScThesisProjects,
    },
  };
}
