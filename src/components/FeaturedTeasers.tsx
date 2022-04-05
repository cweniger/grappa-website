import React from "react";
import Image from "next/image";
import zigzag from "../styles/components/FeaturedTeasers.module.scss";
import layout from "../styles/components/Layout.module.scss";
import ReactMarkdown from "react-markdown";

export function FeaturedTeasers({ homepageTeasers }) {
  return (
    <section className="container__main">
      {homepageTeasers.homepageTeasersCollection.items.map((teaser) => {
        return (
          <div className={zigzag.container__zigzag} key={teaser.sys.id}>
            <div className={zigzag.item}>
              <h3 className="text--news">{teaser.headline}</h3>
              <ReactMarkdown className="text--teasers">
                {teaser.bodyCopy}
              </ReactMarkdown>
            </div>
            <div className={zigzag.item}>
              <Image
                className="object-fit"
                src={teaser.image.url}
                alt="Space stuff"
                layout="responsive"
                width="100%"
                height="100%"
              />
            </div>
          </div>
        );
      })}
    </section>
  );
}
