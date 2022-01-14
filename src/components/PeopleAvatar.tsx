import Link from "next/link";
import React from "react";

import people from "../styles/components/PeopleGrid.module.scss";
export default function PeopleAvatar({ fields }) {
  return (
    <Link href={`/members/${fields.slug}`}>
      <a>
        <figure className={people.box}>
          {fields.profilePicture ? (
            <img src={fields.profilePicture.url} alt={fields.fullName} />
          ) : (
            <div className={people.planet} />
          )}
          <figcaption>{fields.fullName}</figcaption>
        </figure>
      </a>
    </Link>
  );
}
