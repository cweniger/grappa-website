import React from "react";
import { PrimaryCTA } from "../components/PrimaryCTA";
import layout from "../styles/components/Layout.module.scss";
import $ from "../styles/components/Hero.module.scss";

export function Hero({ hero }) {
  const styles = {
    backgroundImage: `url(${hero.backgroundImage})`,
  };

  return (
    <section style={styles} className={$.container}>
      <div className={layout.container__main}>
        <h2 className={$.header}>{hero.headline}</h2>
        <p className={$.subheader}>{hero.subheader}</p>
        <PrimaryCTA href="/" ctaCopy={hero.primaryCtaCopy} />
      </div>
    </section>
  );
}
