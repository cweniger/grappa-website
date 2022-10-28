import Link from "next/link";
import people from "../styles/components/PeopleGrid.module.scss";
import React from "react";

export default function Avatar({ person, small }) {
  const image = person.profilePicture ? (
    <img
      src={person?.profilePicture?.url}
      alt={`Headshot of ${person.fullName}`}
    />
  ) : (
    <div className={people.planet} />
  );
  return (
    <li className={small ? people.hBox : people.box} key={person.slug}>
      {person.slug && !person.omitProfile ? (
        <Link href={`/members/${person.slug}`}>
          <a>
            {image}
            <p>{person.fullName}</p>
          </a>
        </Link>
      ) : (
        <p>{person.fullName}</p>
      )}
    </li>
  );
}
