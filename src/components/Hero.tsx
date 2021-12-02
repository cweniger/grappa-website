import React from "react";
import { PrimaryCTA } from "../components/PrimaryCTA";
import layout from "../styles/components/Layout.module.scss";
import $ from "../styles/components/Hero.module.scss";

export function Hero({ hero }) {
  const styles = {
    backgroundImage: `url(${hero.hero.backgroundImage.url})`,
  };

  return (
    <section style={styles} className={$.container}>
      <div className={layout.container__main}>
        <h2 className={$.header}>{hero.hero.headline}</h2>
        <p className={$.subheader}>{hero.hero.subheader}</p>
        <PrimaryCTA
          href={hero.hero.primaryCtaUrl}
          ctaCopy={hero.hero.primaryCtaCopy}
        />
      </div>
    </section>
  );
}
