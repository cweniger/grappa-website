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
    <section className="container__news__hero">
      {featuredNewsEntry.image && (
        <Link href={`/news/${featuredNewsEntry.slug}`}>
          <a>
            <img
              alt={
                featuredNewsEntry.image.description ??
                featuredNewsEntry.image.title
              }
              className={news.image}
              src={featuredNewsEntry.image.url}
              width="965"
              height="542"
            />
          </a>
        </Link>
      )}
      {featuredNewsEntry.headline && (
        <>
          <h2 className="text__underscore__md">Featured</h2>
          <Link href={`/news/${featuredNewsEntry.slug}`}>
            <a className="link__none">
              <h3 className="text--featured text__headline__2">
                {featuredNewsEntry.headline}
              </h3>
            </a>
          </Link>
        </>
      )}
      {featuredNewsEntry.summary && (
        <p className={news.blurb}>{featuredNewsEntry.summary}</p>
      )}
      {formattedDate && <time className="text__detail">{formattedDate}</time>}
    </section>
  );
}
