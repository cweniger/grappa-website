import Link from "next/link";
import React from "react";

import people from "../styles/components/PeopleGrid.module.scss";
export default function PeopleAvatar({ fields }) {
  return (
    <figure className={people.box} key={fields.fullName}>
      <Link href={`/members/${fields.slug}`}>
        <a>
          {fields.profilePicture ? (
            <img src={fields.profilePicture.url} alt={fields.fullName} />
          ) : (
            <div className={people.planet} />
          )}
          <span>{fields.fullName}</span>
        </a>
      </Link>
    </figure>
  );
}
