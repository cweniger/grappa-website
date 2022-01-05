import classnames from "classnames";
import React from "react";
import ReactMarkdown from "react-markdown";
import featured from "../styles/components/FeaturedTestimonial.module.scss";
import Image from "next/image";

interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  index?: boolean;
  copy: string;
  avatar?: any;
  title: string;
  name: string;
  key?: number | string;
}

export const TestimonialCard: React.FunctionComponent<CarouselProps> = ({
  key,
  name,
  avatar,
  copy,
  index,
  title,
}) => {
  return (
    <div key={key} data-index={index} className={featured.card}>
      <div className={classnames(featured.avatar)}>
        {avatar ? (
          <Image src={avatar} alt={name} width={100} height={100} />
        ) : null}
      </div>
      <blockquote className={classnames(featured.quote, "text__headline__4")}>
        <ReactMarkdown>{copy}</ReactMarkdown>
      </blockquote>
      <div className={classnames(featured.avatar)}>
        <h4 className="text__eyebrow--sm text__eyebrow__greySm">{name}</h4>
        <span className={featured.name}>{title}</span>
      </div>
    </div>
  );
};
