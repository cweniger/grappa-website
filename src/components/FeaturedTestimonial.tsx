import React from "react";
import Image from "next/image";
import layout from "../styles/components/Layout.module.scss";
import featured from "../styles/components/FeaturedTestimonial.module.scss";
import ReactMarkdown from "react-markdown";

export function FeaturedTestimonial({ testimonials }) {
  const randomiser = Math.floor(
    Math.random() * Math.floor(testimonials.length)
  );

  const testimonial = testimonials[randomiser];

  return (
    <section className={featured.container}>
      <div className={layout.container__main}>
        <figure className={featured.container__figure}>
          <div key={testimonial.id}>
            <blockquote className={featured.quote}>
              <ReactMarkdown>{testimonial.testimonialCopy}</ReactMarkdown>
            </blockquote>
            <figcaption>
              <h4>
                –{testimonial.student.fullName}, {testimonial.student.title}
              </h4>
            </figcaption>
          </div>
          {testimonial.student.profilePic ? (
            <Image
              className={featured.avatar}
              src={testimonial.student.profilePic}
              alt={testimonial.student.fullName}
              width={240}
              height={240}
            />
          ) : null}
        </figure>
      </div>
    </section>
  );
}
