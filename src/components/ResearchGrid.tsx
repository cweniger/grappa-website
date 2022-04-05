import layout from "../styles/components/Layout.module.scss";
import research from "../styles/components/ResearchGrid.module.scss";
import people from "../styles/components/PeopleGrid.module.scss";
import Avatar from "../components/Avatar";
import ContentfulMarkdown from "../components/ContentfulMarkdown";
import classnames from "classnames";
import React from "react";

export default function ResearchGrid({ area }) {
  return (
    <section key={area.title} id={area.slug} className="container__main">
      <div className={classnames(research.container)}>
        <div className={research.summary}>
          <h2 className="text__eyebrow__grey">Team</h2>
          <ul className={people.miniPeopleGrid}>
            {area.team.items.map((member) => (
              <Avatar small person={member} key={member.fullName} />
            ))}
          </ul>
        </div>

        <div className={classnames(research.main)}>
          <h1 className="text--featured text__headline__2">{area.title}</h1>
          {area.abstract && <p className={research.blurb}>{area.abstract}</p>}
          <ContentfulMarkdown className="" content={area.description} />
        </div>
      </div>
    </section>
  );
}
