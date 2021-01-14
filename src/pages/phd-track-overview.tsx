import Link from "next/link";
import Layout from "../components/Layout";
import BasicMeta from "../components/meta/BasicMeta";
import OpenGraphMeta from "../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../components/meta/TwitterCardMeta";
import layout from "../styles/components/Layout.module.scss";

export default function PhDTrackOverview() {
  return (
    <Layout>
      <BasicMeta url={"/"} />
      <OpenGraphMeta url={"/"} />
      <TwitterCardMeta url={"/"} />
      <div className={layout.container__main}>
        <h1>PhD at the University of Amsterdam</h1>
        <p>Contrary to the situation in many other countries, PhD students in the Netherlands become employees of the university. PhDs are usually not required to follow classes and can concentrate on their research project through the 4 year PhD period. However, they are expected to teach as e.g. Teaching Assistants for about 10% of their time. This is often in the form of leading Tutorial or Lab sessions for BSc and MSc students. They will also participate in supervising BSc and MSc thesis research projects.</p>

        <h2>Requirements to enter a PhD</h2>
        <p>In order to enter the PhD program at GRAPPA, applicants will have to have completed an MSc in Physics and/or Astronomy or a closely related field at a recognized university. A good command of English is also required and computing skills are typically also strongly desired. Depending on the opening, additional competences may be necessary.</p>

        <h2>Employment Details</h2>
        <p>PhDs have an employment contract with the University of Amsterdam. They obtain a temporary contract for 38 hours a week for a duration of 4 years. The Initial appointment will be for a period of 18 months and after a satisfactory evaluation it can be extended for a total duration of 4 years. The employment should lead to a dissertation (PhD thesis). We will draft an educational plan that includes attendance of courses and (international) meetings. We also expect you to assist in teaching undergraduates and master students.</p>

        <p>The salary, depending on relevant experience before the beginning of the employment contract, will be €2.325 to €2.972 (scale P) gross per month in 2020, based on fulltime employment (38 hours a week), exclusive of an 8% holiday allowance and an 8.3% end-of-year bonus. A favorable tax agreement, the ‘30% ruling’, may apply to non-Dutch applicants. The Collective Labour Agreement of Dutch Universities is applicable.</p>

       <h2>Employment Details</h2>
       <p>PhDs have an employment contract with the University of Amsterdam. They obtain a temporary contract for 38 hours a week for a duration of 4 years. The Initial appointment will be for a period of 18 months and after a satisfactory evaluation it can be extended for a total duration of 4 years. The employment should lead to a dissertation (PhD thesis). We will draft an educational plan that includes attendance of courses and (international) meetings. We also expect you to assist in teaching undergraduates and master students.</p>
       <p>The salary, depending on relevant experience before the beginning of the employment contract, will be €2.325 to €2.972 (scale P) gross per month in 2020, based on fulltime employment (38 hours a week), exclusive of an 8% holiday allowance and an 8.3% end-of-year bonus. A favorable tax agreement, the ‘30% ruling’, may apply to non-Dutch applicants. The Collective Labour Agreement of Dutch Universities is applicable.</p>

        </div>
    </Layout>
  );
}
