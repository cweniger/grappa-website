import row from "../styles/components/Row.module.scss";
import Link from "./Link";
interface Props {
  title?: string;
  image?: {
    url?: string;
    description?: string;
  };
  date?: Date;
  slug?: string;
  small?: boolean;
}

const Row: React.FC<Props> = (props: Props) => {
  return (
    <Link href={props.slug}>
      <figure className={row.area} key={props.title}>
        {/* {props.image && (
          <img src={props.image.url} alt={props.image.description} />
        )} */}

        <p className="text__headline__3">{props.title}</p>
      </figure>
    </Link>
  );
};

export default Row;
