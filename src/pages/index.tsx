import Layout from "../components/Layout";
import BasicMeta from "../components/meta/BasicMeta";
import OpenGraphMeta from "../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../components/meta/TwitterCardMeta";
import { Hero } from "../components/Hero";
import FeatureZigZag from "../components/FeatureZigZag";
import {FeaturedTestimonial} from "../components/FeaturedTestimonial";


export default function Index() {
  return (
    <Layout>
      <BasicMeta url={"/"} />
      <OpenGraphMeta url={"/"} />
      <TwitterCardMeta url={"/"} />
      <Hero />
      <FeatureZigZag />
      <FeaturedTestimonial />
    </Layout>
  );
}
