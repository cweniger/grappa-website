import React from "react";
import layout from "../styles/components/Layout.module.scss";
import classnames from "classnames";

export default function SecondaryHero({ heroEntry }) {
  return (
    <section className={layout.container__full__black}>
      <div className={classnames(layout.container__main)}>
        <h1 className="text--eyebrow">{heroEntry.headline}</h1>
        <p className="text--hero text__headline__2">{heroEntry.subheader}</p>
      </div>
    </section>
  );
}
