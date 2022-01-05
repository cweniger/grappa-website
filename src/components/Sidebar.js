import React from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Sidebar({ contact, items }) {
  return (
    <aside className="container__aside">
      {contact ? (
        <ul className="list__none">
          {items.map((person) => (
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
      ) : (
        items.map((item) => (
          <div key={item.title}>
            <h2 className="text__underscore__md">{item.title}</h2>
            <ReactMarkdown
              className="list__none text__name"
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
