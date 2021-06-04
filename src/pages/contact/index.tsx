import Layout from "../../components/Layout";
import BasicMeta from "../../components/meta/BasicMeta";
import OpenGraphMeta from "../../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../../components/meta/TwitterCardMeta";
import layout from "../../styles/components/Layout.module.scss";
// import ReactMarkdown from "react-markdown";
import { gql } from "@apollo/client";
import client from "../../../apollo-client";

export default function Contact() {
  return (
    <Layout>
      <BasicMeta url={"/"} />
      <OpenGraphMeta url={"/"} />
      <TwitterCardMeta url={"/"} />
      <div className={layout.container__main}>
        <h1>Contact</h1>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  //   const textBlock = await response.json();
  const { data } = await client.query({
    query: gql`
      query ContactPage {
        textBlock(id: "1j0QoaJxhq6z12pEvldYqY") {
          sys {
            id
          }
          # add the fields you want to query
        }
      }
    `,
  });

  console.log({ id: data?.textBlock?.sys?.id });
  //  transform data into the shape we want

  return {
    props: {
      hello: "world",
      // mainContact: data.id.bl,
    },
  };
}
