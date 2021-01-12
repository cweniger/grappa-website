import Layout from "../components/Layout";
import BasicMeta from "../components/meta/BasicMeta";
import OpenGraphMeta from "../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../components/meta/TwitterCardMeta";
import layout from "../styles/components/Layout.module.scss";

export default function Events() {
  return (
    <Layout>
      <BasicMeta url={"/"} />
      <OpenGraphMeta url={"/"} />
      <TwitterCardMeta url={"/"} />
      <div className={layout.container__main}>
          <h1>Events</h1>
          <p>GRAPPA hosts regularly recurring events, including a weekly journal club and bi-weekly seminars, and has hosted a number of conferences and workshops. Upcoming events can be found below, and a calendar with all events of interest to GRAPPA can be found here. See also our list of visitors.</p>
        </div>
    </Layout>
  );
}
