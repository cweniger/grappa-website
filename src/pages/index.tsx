import { NextPage, GetStaticProps } from 'next';
import Layout from "../components/Layout";
import BasicMeta from "../components/meta/BasicMeta";
import OpenGraphMeta from "../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../components/meta/TwitterCardMeta";
import { Hero } from "../components/Hero";
import {FeatureZigZag} from "../components/FeatureZigZag";
import {FeaturedTestimonial} from "../components/FeaturedTestimonial";

// interface Props {
//   content: { attributes: HomeData };
// }
// interface HomeData {
//   heroHeader?: string;
//   heroSubheader?: string;
// }

export default function Index({testimonials}) {
  // const { attributes } = content;
  console.table(testimonials);
return (

     <Layout>
       <BasicMeta url={"/"} />
       <OpenGraphMeta url={"/"} />
       <TwitterCardMeta url={"/"} />
       {/* <h1>{markdown.heroHeader}</h1>
       <p>{markdown.heroSubheader}</p> */}

       {/* <Hero header={attributes.heroHeader} */}
        {/* subheader={attributes .heroSubheader}/> */}
       {/* <FeatureZigZag /> */}
       <FeaturedTestimonial testimonials={testimonials}/>
     </Layout>

  );
};
// export const getStaticProps: GetStaticProps = async () => {
//   const content = await import(`../content/${'home'}.md`);
//   return { props: { content: content.default } };
// };
// export default Index;

export async function getStaticProps() {
  const spaceId = process.env.CONTENTFUL_SPACE;
  const environmentId = process.env.CONTENTFUL_ENV;
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
  const contentType = 'testimonial';

  const URL = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environmentId}/entries?access_token=${accessToken}&content_type=${contentType}`;
  const response = await fetch(URL);
  const testimonials = await response.json();

  return {
    props: {
      testimonials: testimonials.items.map(item => ({
        ...item.fields,
        id: item.sys.id,
      }))
    }
  };
}