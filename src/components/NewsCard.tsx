import Link from "next/link";
import card from "../styles/components/NewsCard.module.scss";

interface Props {
  title?: string;
  image?: {
    url?: string;
    description?: string;
  };
  date?: Date;
  slug?: string;
}

const NewsCard: React.FC<Props> = (props) => {
  const formattedDate = new Date(props.date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  return (
    <figure className={card.box} key={props.title}>
      {props.slug ? (
        <p>
          <time className="text--detail">{formattedDate}</time>
          <br />
          <Link href={props.slug}>{props.title}</Link>
        </p>
      ) : (
        <p>{props.title}</p>
      )}
    </figure>
  );
};

export default NewsCard;
