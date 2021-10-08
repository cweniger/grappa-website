import card from "../styles/components/Card.module.scss";
import Link from "./Link";
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
  return (
    <Link href={props.slug}>
      <figure className={card.box} key={props.title}>
        {props.image && (
          <img src={props.image.url} alt={props.image.description} />
        )}

        <p className={card.link}>{props.title}</p>
      </figure>
    </Link>
  );
};

export default Card;
