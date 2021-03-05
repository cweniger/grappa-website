import { NextPage, GetStaticProps } from "next";
import Layout from "../components/Layout";
import BasicMeta from "../components/meta/BasicMeta";
import OpenGraphMeta from "../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../components/meta/TwitterCardMeta";
import { Hero } from "../components/Hero";
import { FeatureZigZag } from "../components/FeatureZigZag";
import { FeaturedTestimonial } from "../components/FeaturedTestimonial";

// interface Props {
//   content: { attributes: HomeData };
// }
// interface HomeData {
//   heroHeader?: string;
//   heroSubheader?: string;
// }

export default function Index({ testimonials, homepageTeasers }) {
  // const { attributes } = content;
  return (
    <Layout>
      <BasicMeta url={"/"} />
      <OpenGraphMeta url={"/"} />
      <TwitterCardMeta url={"/"} />
      {/* <h1>{markdown.heroHeader}</h1>
       <p>{markdown.heroSubheader}</p> */}

      {/* <Hero header={attributes.heroHeader} */}
      {/* subheader={attributes .heroSubheader}/> */}
      <FeatureZigZag homepageTeasers={homepageTeasers} />
      <FeaturedTestimonial testimonials={testimonials} />
    </Layout>
  );
}
// export const getStaticProps: GetStaticProps = async () => {
//   const content = await import(`../content/${'home'}.md`);
//   return { props: { content: content.default } };
// };
// export default Index;

const spaceId = process.env.CONTENTFUL_SPACE;
const environmentId = process.env.CONTENTFUL_ENV;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

async function fetchHomepageTeasers() {
  const contentType = "homepageTeasers";

  const URL = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environmentId}/entries?access_token=${accessToken}&content_type=${contentType}`;
  const response = await fetch(URL);
  const homepageTeasers = await response.json();
  const items = homepageTeasers.items.map((item) => ({
    ...item.fields,
    id: item.sys.id,
  }));
  const assets = homepageTeasers.includes.Asset;

  const homepageTeasersWithAssets = items.map((item) => {
    if (!item.image) {
      return item;
    }

    const asset = assets.find((asset) => asset.sys.id === item.image.sys.id);

    return {
      ...item,
      teaserImage: `https:${asset.fields.file.url}`,
    };
  });

  return homepageTeasersWithAssets.sort((a, b) => {
    if (a.order > b.order) {
      return 1;
    } else if (a.order < b.order) {
      return -1;
    }

    return 0;
  });
}

async function fetchNews() {
  const contentType = "news";

  const URL = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environmentId}/entries?access_token=${accessToken}&content_type=${contentType}`;
  const response = await fetch(URL);
  const articles = await response.json();

  return articles.items.map((item) => ({
    ...item.fields,
    id: item.sys.id,
  }));
}

async function fetchTestimonials() {
  const contentType = "testimonial";

  const URL = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environmentId}/entries?access_token=${accessToken}&content_type=${contentType}`;
  const response = await fetch(URL);
  const testimonials = await response.json();

  return testimonials.items.map((item) => {
    const student = testimonials.includes.Entry.find((student) => {
      return item.fields.student.sys.id === student.sys.id;
    });

    const studentImage = testimonials.includes.Asset.find((studentImage) => {
      return student.fields?.profilePicture?.sys?.id === studentImage.sys.id;
    });

    return {
      ...item.fields,
      id: item.sys.id,
      student: {
        id: student.sys.id,
        ...student.fields,
        profilePic: studentImage
          ? `https:${studentImage.fields.file.url}`
          : null,
      },
    };
  });
}

export async function getStaticProps() {
  const [testimonials, news, homepageTeasers] = await Promise.all([
    fetchTestimonials(),
    fetchNews(),
    fetchHomepageTeasers(),
  ]);

  return {
    props: {
      news,
      testimonials,
      homepageTeasers,
    },
  };
}
