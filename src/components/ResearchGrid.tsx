import layout from "../styles/components/Layout.module.scss";
import research from "../styles/components/ResearchGrid.module.scss";
import people from "../styles/components/PeopleGrid.module.scss";
import Avatar from "../components/Avatar";
import ContentfulMarkdown from "../components/ContentfulMarkdown";
import classnames from "classnames";

export default function ResearchGrid({ area }) {
  console.log(area.description, "area??");
  return (
    <section key={area.title} id={area.slug} className={layout.container__main}>
      <div className={classnames(research.container)}>
        <div className={research.summary}>
          <h2 className="text--eyebrow__grey">Team</h2>
          <ul className={people.miniPeopleGrid}>
            {area.team.items.map((member) => (
              <Avatar small person={member} key={member.fullName} />
            ))}
          </ul>
        </div>

        <div className={classnames(research.main)}>
          <h1 className="text--research text__headline__2">{area.title}</h1>
          <p className={research.blurb}>
            The early universe was hot and dense. Interactions between particles
            were very frequent and energetic. Matter was in the form of free
            electrons and atomic nuclei with light bouncing between them.
          </p>
          <ContentfulMarkdown className="" content={area.description} />
        </div>
      </div>
    </section>
  );
}
