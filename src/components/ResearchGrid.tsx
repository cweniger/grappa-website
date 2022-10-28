import layout from "../styles/components/Layout.module.scss";
import research from "../styles/components/ResearchGrid.module.scss";
import people from "../styles/components/PeopleGrid.module.scss";
import Avatar from "../components/Avatar";
import ContentfulMarkdown from "../components/ContentfulMarkdown";
import classnames from "classnames";
import React from "react";

interface Person {
  fullName?: string;
  slug?: string;
  image?: {
    title?: string;
    url?: string;
    description?: string;
  };
}

interface Props {
  area?: {
    title?: string;
    abstract?: string;
    description?: string;
    slug?: string;
    team?: {
      items?: Array<Person>;
    };
  };
  nested?: boolean;
}

const ResearchGrid: React.FC<Props> = (props: Props) => {
  const Component = props?.nested ? "h2" : "h1";
  return (
    <section id={props.area.slug} className="container__main">
      <div className={classnames(research.container)}>
        <div className={research.summary}>
          <h2 className="text__eyebrow__grey">Team</h2>
          <ul className={people.miniPeopleGrid}>
            {props.area.team.items.map((member) => (
              <Avatar small person={member} key={member.fullName} />
            ))}
          </ul>
        </div>

        <div className={classnames(research.main)}>
          <Component className="text--featured text__headline__2">
            {props.area.title}
          </Component>
          {props.area.abstract && (
            <p className={research.blurb}>{props.area.abstract}</p>
          )}
          <ContentfulMarkdown className="" content={props.area.description} />
        </div>
      </div>
    </section>
  );
};

export default ResearchGrid;
