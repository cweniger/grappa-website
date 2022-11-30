import React from "react";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import cx from "classnames";

export default function HeaderText({ header, sideLayout, noImage = false }) {
  const imageVar = header?.backgroundImage?.url;
  return (
    <div className={cx(sideLayout ? "container__grid__cols__2" : undefined)}>
      <header className={noImage ? "space--mv--large" : undefined}>
        {header.headline && (
          <h1 className="text__eyebrow__grey">{header.headline}</h1>
        )}
        {header.subheader && (
          <p className="text__subheader">{header.subheader}</p>
        )}
        {header.description && (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            className="text__subheader"
          >
            {header.description}
          </ReactMarkdown>
        )}
      </header>
      {!noImage && imageVar ? (
        <img
          alt={
            header?.backgroundImage?.description ??
            header?.backgroundImage?.title
          }
          className="image-secondary-hero"
          src={header.backgroundImage.url}
          width="500"
        />
      ) : undefined}
    </div>
  );
}
