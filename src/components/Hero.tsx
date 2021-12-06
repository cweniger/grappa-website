import React from "react";
import { PrimaryCTA } from "../components/PrimaryCTA";
import $ from "../styles/components/Hero.module.scss";

export function Hero({ hero }) {
  const styles = {
    backgroundImage: `url(${hero.hero.backgroundImage.url})`,
  };

  return (
    <section style={styles} className={$.container}>
      <div className="container__main">
        <h2 className="text__hero">{hero.hero.headline}</h2>
        <p className={$.subheader}>{hero.hero.subheader}</p>
        <PrimaryCTA
          href={hero.hero.primaryCtaUrl}
          ctaCopy={hero.hero.primaryCtaCopy}
        />
      </div>
    </section>
  );
}
