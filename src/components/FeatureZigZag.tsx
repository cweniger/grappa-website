import React from "react";
import Image from "next/image";
import zigzag from "../styles/components/FeatureZigZag.module.scss";
import layout from "../styles/components/Layout.module.scss";
import ReactMarkdown from "react-markdown";

export function FeatureZigZag({ homepageTeasers }) {
  return (
    <>
      <section className={layout.container__main}>
        {homepageTeasers.map((teaser) => (
          <div className={zigzag.container__zigzag} key={teaser.id}>
            <div className={zigzag.item}>
              <h3>{teaser.headline}</h3>
              <ReactMarkdown>{teaser.bodyCopy}</ReactMarkdown>
            </div>
            <div className={zigzag.item}>
              <Image
                src={teaser.teaserImage}
                alt="Space stuff"
                layout="responsive"
                width="100%"
                height="100%"
              />
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
