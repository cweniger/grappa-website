import Link from "next/link";
import Layout from "../../components/Layout";
import BasicMeta from "../../components/meta/BasicMeta";
import layout from "../../styles/components/Layout.module.scss";
import { gql } from "@apollo/client";
import client from "../../../apollo-client";
import ReactMarkdown from "react-markdown";
import SecondaryHero from "../../components/SecondaryHero";
import { contentfulApi } from "../../lib/contentful";

export default function Education({ entry, preview, heroEntry }) {
  return (
    <Layout>
      <BasicMeta url={"/"} />
      <SecondaryHero heroEntry={heroEntry} />
      <section className={layout.container__main}>
        <h2>GRAPPA Msc</h2>
        <ul>
          <li>
            <Link href="/education/msc-track-overview">MSc Track Overview</Link>
          </li>
          <li>
            <Link href="/education/msc-faq">MSc FAQ</Link>
          </li>
          <li>
            <Link href="/education/msc-thesis-projects">
              MSc Thesis Projects
            </Link>
          </li>
        </ul>
        <h2>GRAPPA Ph.D. Program</h2>
        <p>
          <Link href="/education/phd-track-overview">Ph.D. Track Overview</Link>
        </p>
      </section>
    </Layout>
  );
}

export async function getStaticProps({ preview = false }) {
  const query = gql`
    query EducationPage($preview: Boolean!) {
      textBlock(id: "74Q2vQC0Y2EGsgzM2Y1Onu", preview: $preview) {
        sys {
          id
        }
        title
        text
      }
    }
  `;

  const heroQuery = gql`
    query educationHero {
      hero(id: "6BxX4EtJcnKPEmSCGlMcnG") {
        headline
        subheader
      }
    }
  `;
  const data = await contentfulApi(query, { preview });
  const entry = data?.textBlock ?? null;
  const heroData = await contentfulApi(heroQuery);
  const heroEntry = heroData?.hero ?? null;

  return {
    props: {
      entry,
      heroEntry,
      preview,
    },
  };
}
