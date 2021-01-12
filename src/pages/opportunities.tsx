import Layout from "../components/Layout";
import Link from "next/link";
import BasicMeta from "../components/meta/BasicMeta";
import OpenGraphMeta from "../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../components/meta/TwitterCardMeta";
import layout from "../styles/components/Layout.module.scss";

export default function Opportunities() {
  return (
    <Layout>
      <BasicMeta url={"/"} />
      <OpenGraphMeta url={"/"} />
      <TwitterCardMeta url={"/"} />
      <div className={layout.container__main}>
          <h1>Opportunities</h1>
          <p>We announce several PhD and postdoc positions at the GRAPPA institute, related to gravitational waves, fundamental physics and cosmology.</p>

          <Link href="/"><a>See independent post-doctoral fellowships</a></Link>
      </div>
    </Layout>
  );
}
