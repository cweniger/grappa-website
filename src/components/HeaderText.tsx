import React from "react";

export default function HeaderText({ header, image, sideLayout }) {
  return (
    <div className={sideLayout ? "container__grid__cols__2" : undefined}>
      <header>
        {header.headline && (
          <h1 className="text__eyebrow__grey">{header.headline}</h1>
        )}
        {header.subheader && (
          <p className="text__subheader">{header.subheader}</p>
        )}
      </header>
      {image && (
        <img
          className="image-secondary-hero"
          src={header.backgroundImage.url}
          width="500"
        />
      )}
    </div>
  );
}
