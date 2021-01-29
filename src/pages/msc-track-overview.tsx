import Link from "next/link";
import Layout from "../components/Layout";
import BasicMeta from "../components/meta/BasicMeta";
import OpenGraphMeta from "../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../components/meta/TwitterCardMeta";
import layout from "../styles/components/Layout.module.scss";

export default function MScTrackOverview() {
  return (
    <Layout>
      <BasicMeta url={"/"} />
      <OpenGraphMeta url={"/"} />
      <TwitterCardMeta url={"/"} />
      <div className={layout.container__main}>
        <h1>MSc Track Overview</h1>
        <p>The GRAPPA MSc track focuses on astroparticle particle, particle physics and cosmology and is offered within the Physics & Astronomy MSc program.</p>

        <p>Are you interested in questions such as:</p>

        <ul>
            <li>How did the universe come to be?</li>
            <li>What is dark matter?</li>
            <li>What is gravity?</li>
            <li>What are the properties of the Higgs particle?</li>
            <li>Is there something beyond the Standard Model of particle physics?</li>
            <li>What is the origin of cosmic rays?</li>
            <li>What particles is the universe built of?</li>
            <li>And many others…</li>
        </ul>
        <p>Then this program is for you! The GRAPPA track is for ambitious students interested in gravitation, astroparticle and particle physics, giving you a broad curriculum. Members of our group are theorists and experimentalists and you will be able to specialize in either theoretical, experimental (astro)particle physics or astrophysics.</p>
        
        <h2>Curriculum</h2>
        <p>The GRAPPA MSc spans two years, with the first year dedicated to courses and the second year fully devoted to the research project. The curriculum is to challenge you and to give you the tools to work on your research topic in your second year. The compulsory courses give you a foundation in cosmology and (astro)particle physics, the electives allow you to further develop your interest and skills in theory, experimental (astro)particle physics or astrophysics.</p>

        <p>You are required to take a minimum of three out of the following six courses (all are 6EC courses):</p>

        <ul>
            <li>General Relativity</li>
            <li>Cosmology</li>
            <li>Particle Physics 1</li>
            <li>Particle Physics 2</li>
            <li>Astroparticle Physics</li>
            <li>Extreme Astrophysics</li>
        </ul>

        <p>The table below summarizes the time (i.e. number of credits) that you will spend on these individual items [TABLE NEEDS updating]</p>
        
        <p>You can freely choose among the following elective courses (shown in green below). Others are also possible, but should be discussed with the GRAPPA MSc coordinator. Keep in mind that not all courses are taught every year, so it could happen that you have to take a course that is only given every other year in your second year. Also have a look at the Study Guide for GRAPPA.</p>

       <h2>Thesis Research Projects</h2>
       <p>Your second year will be fully devoted to the Research Project. You will become part of the research groups of one of the faculty members and participate in their research.</p>
       <Link href="/msc-thesis-projects">
            <a>
             See MSc thesis projects
            </a>
       </Link>
        </div>
    </Layout>
  );
}
