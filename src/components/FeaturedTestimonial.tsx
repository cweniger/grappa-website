import React from "react";
import Image from "next/image";
import layout from "../styles/components/Layout.module.scss";
import featured from "../styles/components/FeaturedTestimonial.module.scss";
import ReactMarkdown from "react-markdown";
import classnames from "classnames";
export function FeaturedTestimonial({ testimonials }) {
  const randomiser = Math.floor(
    Math.random() * Math.floor(testimonials.length)
  );

  const testimonial = testimonials[randomiser];

  return (
    <section key={testimonial.id} className={featured.container}>
      <blockquote className={classnames(featured.quote)}>
        <ReactMarkdown>{testimonial.testimonialCopy}</ReactMarkdown>
      </blockquote>
      <div className={classnames(featured.avatar)}>
        {testimonial.student.profilePic ? (
          <Image
            src={testimonial.student.profilePic}
            alt={testimonial.student.fullName}
            width={100}
            height={100}
          />
        ) : null}
        <h4 className="text--eyebrow--sm text--eyebrow__greySm">
          {testimonial.student.fullName}
        </h4>
      </div>
    </section>
  );
}
