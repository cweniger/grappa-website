import Link from "next/link";
import card from "../styles/components/Card.module.scss";

interface Props {
  title?: string;
  image?: {
    url?: string;
    description?: string;
  };
  date?: Date;
  slug?: string;
}

const Card: React.FC<Props> = (props) => {
  const formattedDate = new Date(props.date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  return (
    <figure className={card.box} key={props.title}>
      {props.image ? (
        <Link href={props.slug}>
          <img src={props.image.url} alt={props.image.description} />
        </Link>
      ) : (
        <Link href={props.slug}>
          <figure className={card.cardFallback} />
        </Link>
      )}
      {props.slug ? (
        <p>
          <time className="text--detail">{formattedDate}</time>
          <br />
          <a>{props.title}</a>
        </p>
      ) : (
        <p>{props.title}</p>
      )}
    </figure>
  );
};

export default Card;
