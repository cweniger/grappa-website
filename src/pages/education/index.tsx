import Link from "next/link";
import Layout from "../../components/Layout";
import BasicMeta from "../../components/meta/BasicMeta";
import OpenGraphMeta from "../../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../../components/meta/TwitterCardMeta";
import layout from "../../styles/components/Layout.module.scss";

export default function Education() {
  return (
    <Layout>
      <BasicMeta url={"/"} />
      <OpenGraphMeta url={"/"} />
      <TwitterCardMeta url={"/"} />
      <div className={layout.container__main}>
        <h1>Education</h1>

        <h2>GRAPPA MSc</h2>
        <Link href="/education/msc-track-overview">
          <a>
            <h3>Track Overview</h3>
          </a>
        </Link>
        <Link href="/msc-faq">
          <a>
            <h3>FAQ</h3>
          </a>
        </Link>
        <Link href="/msc-thesis-projects">
          <a>
            <h3>Thesis Projects</h3>
          </a>
        </Link>
        <h2>GRAPPA Ph.D. Program</h2>
        <Link href="/phd-track-overview">
          <a>
            <h3>Track Overview</h3>
          </a>
        </Link>
      </div>
    </Layout>
  );
}
