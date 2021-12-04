import React from "react";
import Link from "next/link";

export default function Sidebar({ contacts }) {
  return (
    <aside className="container__aside">
      <ul className="list__none">
        {contacts.map((person) => (
          <li className="text__title" key={person.slug}>
            <Link href={person.slug}>
              <a>
                {person.contactTitle}
                <br />
                <span className="text__name">{person.fullName}</span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
