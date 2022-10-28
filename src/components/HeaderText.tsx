import React from "react";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";

export default function HeaderText({ header, sideLayout }) {
  // Optional chaining isn't working so we have to do this ridiculous check.
  const imageVar = header?.backgroundImage?.url;
  return (
    <div className={sideLayout ? "container__grid__cols__2" : undefined}>
      <header>
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
      {imageVar ? (
        <img
          className="image-secondary-hero"
          src={header.backgroundImage.url}
          width="500"
        />
      ) : undefined}
    </div>
  );
}
