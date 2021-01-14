import Link from "next/link";
import Layout from "../components/Layout";
import BasicMeta from "../components/meta/BasicMeta";
import OpenGraphMeta from "../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../components/meta/TwitterCardMeta";
import layout from "../styles/components/Layout.module.scss";

export default function MScFAQ() {
  return (
    <Layout>
      <BasicMeta url={"/"} />
      <OpenGraphMeta url={"/"} />
      <TwitterCardMeta url={"/"} />
      <div className={layout.container__main}>
        <h1>MSc FAQs</h1>
        <p>Here is a list of Frequently Asked Questions about GRAPPA and more generally about the UvA/VU Physics & Astronomy MSc. Please have a look at these questions & answers before contacting us.</p>

        <p>What is the Personal Education Plan (PEP)?</p>
        <p>It is the formal list of courses that will appear on your diploma. Every student has to submit the Personal Education Plan (PEP) at least 4 months before graduation, i.e. if you plan to graduate end of August, you need to submit it before May 1st. Approval of the PEP ensures that when all components are completed, a student can apply for the Master’s degree.</p>

        <p>How do I register for courses?</p>
        <p>You can find a description of the courses in the UvA Course Catalogue. For new students, course registration is done via special enrolment around September 1 for new students. After this students should enrol via the regular route, in the two-week time periods in December and June. Registration for VU elective courses (many of the Academic Skills courses!) is conducted via VUnet. You can sign up for the whole semester or per educational period.</p>

        <p>Where do I need to upload my MSc Research Thesis?</p>
        <p>The thesis is uploaded via DataNose. You can submit your thesis at https://datanose.nl/#yourprojects. If you do not see your project course, please contact datanose-fnwi@uva.nl for assistance.</p>

        <p>What are viable Academic Skills courses for the Master of Physics and Astronomy?</p>
        <p>What follows is a brief description of the Academic Skills course choices that are available in the Master of Physics and Astronomy. Please also have a look at the official documentation in the Study Guide. Choose 6 EC total from the following list. The courses that have a course number starting with X_ or AM_ are given at the VU University and you have to register at VU (with your VU student number), the courses starting with 5354 are at UvA.</p>

       <p> Class	Uni	Code	EC	Period
Communication, Organization and Management	VU	AM_470572	6	2
Entrepreneurship for Physicists	VU	X_422600	6	3
Physics Education Project		X_420523	3 or 6	1-6
Managing Science and Technology in Society	VU	AM_470586	6	1
Research Methods for Analyzing Complex Problems	VU	AM_1182	6	1
Science and Communication	VU	AM_470587	6	1
Science in Dialogue	VU	AM_1002	6	2
Science in Perspective	UvA	5254SCIP6Y	6	4-5
Science Journalism	VU	AM_471014	6	2
Scientific Writing in English	VU	X_400592	3	2, 6
Tutoring Students	VU	X_432625	3	2
Wetenschapscommunicatie voor Bèta-onderzoekers	VU	AB_470185	6	5
Academic Skills; Critical Thinking	UvA	5354ASCT3Y	6	6
Academic Skills; Individual Project	UvA	5354ASIP3Y	3 or 6	1-6
</p>

    <p>Where can I find relevant UvA Education Documents?</p>
    <p>Here is a collection of official UvA documents that help you with your studies. The “OER” is the Training and Examination Regulation. Part A is general for all Science MSc programs at the UvA. Part B is Master specific. Note: the two Training and Examination Regulation documents linked below are the complete “OER” and therefore share the same part A.
Following are for 2012/2013:</p>

    <a href="http://www.science.uva.nl/onderwijs/formulieren/EW/Guidebook%202012-2013.pdf">MSc in Science Guidebook</a>
    <a href="http://student.uva.nl/binaries/content/assets/studentensites/fnwi/ew-gedeelde-content/rules-and-regulations/eer-astronomy-ans-astrophysics-2012-2013.pdf">Training and Examination Regulation Astronomy&Astrophysics</a>
    <a href="http://student.uva.nl/binaries/content/assets/studentensites/fnwi/ew-gedeelde-content/rules-and-regulations/eer-physics-2012-2013.pdf">Training and Examination Regulation Physics</a>
        </div>
    </Layout>
  );
}
