import Link from "next/link";
import card from "../styles/components/Card.module.scss";

export default function Card({ area }) {
  return (
    <figure className={card.box} key={area.title}>
      {area.image ? (
        <Link href={`/research#${area.slug}`}>
          <img src={area.image.url} alt={area.image.description} />
        </Link>
      ) : (
        <Link href={`/research#${area.slug}`}>
          <figure className={card.cardFallback} />
        </Link>
      )}
      {area.slug ? (
        <p>
          <Link href={`/research#${area.slug}`}>
            <a>{area.title}</a>
          </Link>
        </p>
      ) : (
        <p>{area.title}</p>
      )}
    </figure>
  );
}
