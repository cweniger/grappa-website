import React from "react";

export default function HeaderText({ header }) {
  return (
    <header>
      {header.headline && (
        <h1 className="text__eyebrow__grey">{header.headline}</h1>
      )}
      {header.subheader && (
        <p className="text__subheader">{header.subheader}</p>
      )}
    </header>
  );
}
