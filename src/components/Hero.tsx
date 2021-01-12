import React from "react";
// import { SocialList } from "../components/SocialList";
import { PrimaryCTA } from "../components/PrimaryCTA";
import layout from '../styles/components/Layout.module.scss';
import hero from '../styles/components/Hero.module.scss';

export function Hero({}) {
  return (
    <section className={hero.container}>
        <div className={layout.container__main}>
          <h2 className={hero.header}>Discovering the Foundations of the Universe</h2>
          <p className={hero.subheader}>A vibrant research centre connecting astroparticle, gravitational and fundamental physics</p>
          <PrimaryCTA />
          {/* <SocialList /> */}
        </div>  
    </section>
  );
}
