import Link from "next/link";
import people from "../styles/components/PeopleGrid.module.scss";
import Image from "next/image";

export default function Avatar({ person, small }) {
  return (
    <figure className={small ? people.hBox : people.box} key={person.fullName}>
      {person.profilePicture ? (
        <Link href={`/members/${person.slug}`}>
          <img src={person.profilePicture.url} alt={person.fullName} />
        </Link>
      ) : (
        <Link href={`/members/${person.slug}`}>
          <figure className={people.planet} />
        </Link>
      )}
      {person.slug ? (
        <Link href={`/members/${person.slug}`}>
          <a className={people.nameCentred}>{person.fullName}</a>
        </Link>
      ) : (
        <p className={people.nameCentred}>{person.fullName}</p>
      )}
    </figure>
  );
}
