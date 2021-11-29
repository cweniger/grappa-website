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
  rail?: boolean;
}

const NewsCard: React.FC<Props> = (props) => {
  const formattedDate = new Date(props.date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  return (
    <>
      {props.slug && (
        <Link href={props.slug}>
          <a>
            <figure className={card.box} key={props.slug}>
              <>
                {props?.image && (
                  <img
                    src={props?.image?.url}
                    alt={props?.image?.description}
                  />
                )}
                {props.title && (
                  <>
                    <p className="text--news text__headline__5">
                      {props.title}
                    </p>
                  </>
                )}
              </>
            </figure>
          </a>
        </Link>
      )}
    </>
  );
};

export default NewsCard;
