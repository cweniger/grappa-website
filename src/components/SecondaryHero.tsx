import React from "react";
import ReactMarkdown from "react-markdown";

export default function SecondaryHero({ heroEntry }) {
  return (
    <section className="container__full__black">
      <div className="container__main">
        {(heroEntry.headline || heroEntry.title) && (
          <h1 className="text__eyebrow">
            {heroEntry.headline || heroEntry.title}
          </h1>
        )}
        {heroEntry.subheader && (
          <p className="text__hero text__headline__2">{heroEntry.subheader}</p>
        )}
        {heroEntry.description && (
          <ReactMarkdown>{heroEntry.description}</ReactMarkdown>
        )}
      </div>
    </section>
  );
}
