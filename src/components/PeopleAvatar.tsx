import Link from "next/link";
import React from "react";

import people from "../styles/components/PeopleGrid.module.scss";
export default function PeopleAvatar({ fields }) {
  return (
    <figure className={people.box}>
      {fields.profilePicture ? (
        <Link href={`/members/${fields.slug}`}>
          <a>
            <img src={fields.profilePicture.url} alt={fields.fullName} />
          </a>
        </Link>
      ) : (
        <div className={people.planet} />
      )}
      <figcaption>
        <Link href={`/members/${fields.slug}`}>
          <a>{fields.fullName} </a>
        </Link>
      </figcaption>
    </figure>
  );
}
