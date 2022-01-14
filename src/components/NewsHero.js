import React from "react";
import news from "../styles/components/NewsHero.module.scss";
import Link from "next/link";

export default function NewsHero({ featuredNewsEntry }) {
  const formattedDate = new Date(featuredNewsEntry.date).toLocaleDateString(
    "en-GB",
    {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }
  );
  return (
    <div>
      <Link href={`/news/${featuredNewsEntry.slug}`}>
        <>
          {featuredNewsEntry.image && (
            <img
              className={news.image}
              src={featuredNewsEntry.image.url}
              width="100%"
            />
          )}

          <p className="text__underscore__md">Featured</p>

          {featuredNewsEntry.headline && (
            <h2 className="text--featured text__headline__2">
              {featuredNewsEntry.headline}
            </h2>
          )}

          {formattedDate && (
            <time className="text__detail">{formattedDate}</time>
          )}

          {featuredNewsEntry.summary && (
            <p className={news.blurb}>{featuredNewsEntry.summary}</p>
          )}
        </>
      </Link>
    </div>
  );
}
