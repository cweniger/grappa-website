import Link from "next/link";
import card from "../styles/components/NewsCard.module.scss";
import React from "react";

interface Props {
  title?: string;
  image?: {
    url?: string;
    description?: string;
  };
  date?: Date;
  slug?: string;
  rail?: boolean;
  grid?: boolean;
  type?: "rail" | "grid";
}

const NewsCard: React.FC<Props> = (props) => {
  const formattedDate = new Date(props.date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const cardStyleMap = {
    rail: card.newsRailBox,
    grid: card.newsGridBox,
  };

  const cardStyle = cardStyleMap[props.type];

  return (
    <Link href={props.slug}>
      <a className="link__none">
        <div className={cardStyle} key={props.slug}>
          {props.image ? (
            <img
              src={props.image.url}
              alt={props.image.description}
              width="500"
              height="280"
            />
          ) : (
            <div className={card.emptyCard} />
          )}

          <div>
            <h3 className="text__headline__5">{props.title}</h3>
            <time className="text__detail">{formattedDate}</time>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default NewsCard;
