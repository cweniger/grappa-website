import { NextPage, GetStaticProps } from 'next';
import Layout from "../components/Layout";
import BasicMeta from "../components/meta/BasicMeta";
import OpenGraphMeta from "../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../components/meta/TwitterCardMeta";
import { Hero } from "../components/Hero";
import FeatureZigZag from "../components/FeatureZigZag";
import {FeaturedTestimonial} from "../components/FeaturedTestimonial";

interface Props {
  content: { attributes: HomeData };
}
interface HomeData {
  heroHeader?: string;
  heroSubheader?: string;
}

const Index: NextPage<Props> = ({content}) => {
  const { attributes } = content;
  console.log(content)
return (
  <>
     <Layout>
       <BasicMeta url={"/"} />
       <OpenGraphMeta url={"/"} />
       <TwitterCardMeta url={"/"} />
       {/* <h1>{markdown.heroHeader}</h1>
       <p>{markdown.heroSubheader}</p> */}
       
       <Hero header={attributes.heroHeader}
        subheader={attributes .heroSubheader}/>
       <FeatureZigZag />
       <FeaturedTestimonial />
     </Layout>
</>
  );
};
export const getStaticProps: GetStaticProps = async () => {
  const content = await import(`../content/${'home'}.md`);
  return { props: { content: content.default } };
};
export default Index;

// export default function Index() {
//   return (
//     <Layout>
//       <BasicMeta url={"/"} />
//       <OpenGraphMeta url={"/"} />
//       <TwitterCardMeta url={"/"} />
//       <Hero />
//       <FeatureZigZag />
//       <FeaturedTestimonial />
//     </Layout>
//   );
// }
