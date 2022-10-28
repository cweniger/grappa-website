import React from "react";
import { PrimaryCTA } from "../components/PrimaryCTA";
import $ from "../styles/components/Hero.module.scss";

export function Hero({ hero, style }) {
  return (
    <section style={style} className={$.container}>
      <div className="container__main">
        <h1 className="text__hero">{hero.hero.headline}</h1>
        <p className={$.subheader}>{hero.hero.subheader}</p>
        <PrimaryCTA
          href={hero.hero.primaryCtaUrl}
          ctaCopy={hero.hero.primaryCtaCopy}
        />
      </div>
    </section>
  );
}
