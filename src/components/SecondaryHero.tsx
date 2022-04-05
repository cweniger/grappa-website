import React from "react";

export default function SecondaryHero({ heroEntry }) {
  return (
    <section className="container__full__black">
      <div className="container__main">
        {heroEntry?.headline && (
          <h1 className="text__eyebrow">{heroEntry.headline}</h1>
        )}
        {heroEntry?.subheader && (
          <p className="text__hero text__headline__2">{heroEntry?.subheader}</p>
        )}
      </div>
    </section>
  );
}
