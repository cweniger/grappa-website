import Link from "next/link";
import people from "../styles/components/PeopleGrid.module.scss";
import React from "react";

export default function Avatar({ person, small }) {
  const image = person.profilePicture ? (
    <img src={person.profilePicture.url} alt={person.fullName} />
  ) : (
    <figure className={people.planet} />
  );
  return (
    <figure className={small ? people.hBox : people.box}>
      {person.slug && !person.omitProfile ? (
        <>
          <Link href={`/members/${person.slug}`}>
            <a>{image}</a>
          </Link>
          <Link href={`/members/${person.slug}`}>
            <a>
              <figcaption className="text__teaser">
                {person.fullName}
              </figcaption>
            </a>
          </Link>
        </>
      ) : (
        <figcaption className="text__detail">{person.fullName}</figcaption>
      )}
    </figure>
  );
}
