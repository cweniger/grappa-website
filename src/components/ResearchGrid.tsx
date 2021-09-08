import layout from "../styles/components/Layout.module.scss";
import research from "../styles/components/ResearchGrid.module.scss";
import people from "../styles/components/PeopleGrid.module.scss";
import Avatar from "../components/Avatar";
import ReactMarkdown from "react-markdown";
import classnames from "classnames";

export default function ResearchGrid({ area }) {
  return (
    <section id={area.slug} key={area.title} className={layout.container__main}>
      <div className={classnames(research.area, research.container)}>
        <div className={research.summary}>
          <h2 className="text--research text__headline__2">{area.title}</h2>
          <p className={research.blurb}>
            The early universe was hot and dense. Interactions between particles
            were very frequent and energetic. Matter was in the form of free
            electrons and atomic nuclei with light bouncing between them.{" "}
          </p>
          <h3 className="text--eyebrow__grey">Team</h3>
          <ul className={people.miniPeopleGrid}>
            {area.team.items.map((member) => (
              <Avatar small person={member} />
            ))}
          </ul>
        </div>

        <div>
          <ReactMarkdown>{area.description}</ReactMarkdown>
        </div>
      </div>
    </section>
  );
}
