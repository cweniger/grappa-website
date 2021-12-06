import ReactMarkdown from "react-markdown";
import React from "react";
import remarkGfm from "remark-gfm";

export default function FAQ({ summary, details }) {
  return (
    <details className="details__directions" key={summary}>
      <summary>{summary}</summary>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{details}</ReactMarkdown>
    </details>
  );
}
