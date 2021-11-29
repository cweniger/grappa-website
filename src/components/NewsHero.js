import React from "react";
import news from "../styles/components/NewsHero.module.scss";

export default function NewsHero({ featuredNewsEntry }) {
  return (
    <div>
      {featuredNewsEntry.image && (
        <img src={featuredNewsEntry.image.url} width="100%" />
      )}

      {featuredNewsEntry.headline && (
        <>
          <p className="text--underscore--md">Featured</p>
          <h2 className="text--featured text__headline__2">
            {featuredNewsEntry.headline}
          </h2>
        </>
      )}
      {featuredNewsEntry.summary && (
        <p className={news.blurb}>{featuredNewsEntry.summary}</p>
      )}
    </div>
  );
}
