import React from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Sidebar({ contact, items }) {
  return (
    <aside className="container__aside">
      {contact ? (
        <ul className="list__tight">
          {items.map((person) => (
            <li key={person.slug}>
              <p className="text__title">{person?.contactTitle}</p>
              <Link href={person?.slug}>
                <a>
                  <p className="text__name">{person?.fullName}</p>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        items.map((item) => (
          <div key={item.title}>
            <h2 className="text__underscore__md">{item.title}</h2>
            <ReactMarkdown
              className="list__tight text__name"
              remarkPlugins={[remarkGfm]}
            >
              {item.text}
            </ReactMarkdown>
          </div>
        ))
      )}
    </aside>
  );
}

{
  /* items.map((item) => (
          <Fragment key={item.title}>
            <h2>{item.title}</h2>
            {/* <ReactMarkdown>{item.text}</ReactMarkdown> 
          </Fragment>
        )) */
}
