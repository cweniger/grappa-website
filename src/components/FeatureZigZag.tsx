import React from "react";
import Image from "next/image";
import zigzag from "../styles/components/FeatureZigZag.module.scss";
import layout from "../styles/components/Layout.module.scss";

export default function FeatureZigZag({}) {
  return (
    <section className={layout.container__main}>
      <div className={zigzag.container__zigzag}>
        <div className={zigzag.item}>
          <h3>Study the foundations of the Universe</h3>
          <p>
            What makes the Universe tick? The GRAPPA master program focuses on particle physics, astroparticle physics and cosmology at the intersection of theory, experiments and observation. It includes a full year MSc project working on real research supervised by world-leading faculty.
          </p>
        </div>
        <div className={zigzag.item}>
          <Image src="/images/homepage-foundations.png" alt="Star stuff" layout="responsive" width={542} height={320}/>
        </div>
      </div>
      <div className={zigzag.container__zigzag}>
        <div className={zigzag.item}>
          <h3>Pushing the frontiers of knowledge about the Universe at its extremes</h3>
          <p>
          Research at GRAPPA aims at a better understanding of natural phenomena at the very smallest, very largest and most energetic extremes. To this end, we bring together gravitational waves, string theory, dark matter searches, high energy astrophysics and cosmology, and stimulate cross-fertilization of the different research directions.
          </p>
        </div>
        <div className={zigzag.item}>
          <Image src="/images/homepage-foundations.png" alt="Star stuff" layout="responsive" width={542} height={320}/>
        </div>
      </div>
      <div className={zigzag.container__zigzag}>
        <div className={zigzag.item}>
          <h3>An actively connected research community</h3>
          <p>
            Through colloquia, journal clubs, discussion groups and international visitor programs, we stimulate new interactions between GRAPPA researchers and with the international community.
          </p>
        </div>
        <div className={zigzag.item}>
          <Image src="/images/homepage-foundations.png" alt="Star stuff" layout="responsive" width={542} height={320}/>
        </div>
      </div>
    </section>
  );
}
