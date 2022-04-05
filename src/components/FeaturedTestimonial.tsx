import Image from "next/image";
import React, { useState, useEffect } from "react";
import featured from "../styles/components/FeaturedTestimonial.module.scss";
import { TestimonialCard } from "./TestimonialCard";
export function FeaturedTestimonial({ testimonials }) {
  const show = 1; /* the number of slides shown */
  const [currentIndex, setCurrentIndex] = useState(show);
  const [transition, setTransition] = useState(true);

  useEffect(() => {
    if (
      currentIndex === show ||
      currentIndex === testimonials.testimonialCollection.items.length
    ) {
      setTransition(true);
    }
  }, [currentIndex, show, testimonials.testimonialCollection.items.length]);

  const next = () => {
    if (currentIndex < testimonials.testimonialCollection.items.length + show) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const handleTransitionEnd = () => {
    if (currentIndex === 0) {
      setTransition(false);
      setCurrentIndex(testimonials.testimonialCollection.items.length);
    } else if (
      currentIndex ===
      testimonials.testimonialCollection.items.length + show
    ) {
      setTransition(false);
      setCurrentIndex(show);
    }
  };

  const renderExtraFirst = React.cloneElement(
    <TestimonialCard
      copy={testimonials.testimonialCollection.items[0].testimonialCopy}
      key="carouselFirst"
      title={testimonials.testimonialCollection.items[0].student.jobTitle.title}
      name={testimonials.testimonialCollection.items[0].student.fullName}
      index={currentIndex === -1}
      avatar={
        testimonials.testimonialCollection.items[0].student.profilePicture
          ? testimonials.testimonialCollection.items[0].student.profilePicture
              .url
          : undefined
      }
    />
  );

  const renderExtraLast = React.cloneElement(
    <TestimonialCard
      copy={
        testimonials.testimonialCollection.items[
          testimonials.testimonialCollection.items.length - 1
        ].testimonialCopy
      }
      key="carouselLast"
      name={
        testimonials.testimonialCollection.items[
          testimonials.testimonialCollection.items.length - 1
        ].student.fullName
      }
      title={
        testimonials.testimonialCollection.items[
          testimonials.testimonialCollection.items.length - 1
        ].student.jobTitle.title
      }
      index={currentIndex === testimonials.testimonialCollection.items.length}
      avatar={
        testimonials.testimonialCollection.items[
          testimonials.testimonialCollection.items.length - 1
        ].student.profilePicture
          ? testimonials.testimonialCollection.items[
              testimonials.testimonialCollection.items.length - 1
            ].student.profilePicture.url
          : undefined
      }
      style={{
        transform: `translate3d(-100%, 0, 0)`,
      }}
    />
  );

  return (
    <>
      <section className={featured.container}>
        <div className={featured.wrapper}>
          <button
            className={featured.left}
            onClick={prev}
            type="button"
            aria-label="Previous"
          />
          <div className={featured.inner}>
            <div
              className={featured.content}
              onTransitionEnd={() => handleTransitionEnd()}
              style={{
                ["--transformValue" as any]: currentIndex,
                ["--cardCount" as any]:
                  testimonials.testimonialCollection.items.length,
                transition: !transition ? "none" : undefined,
              }}
            >
              {renderExtraLast}

              {testimonials?.testimonialCollection?.items?.map(
                (testimonial, i) => {
                  return (
                    <TestimonialCard
                      copy={testimonial.testimonialCopy}
                      key={testimonial?.sys?.id}
                      name={testimonial.student.fullName}
                      index={currentIndex === i + 1}
                      title={testimonial.student.jobTitle.title}
                      avatar={
                        testimonial.student.profilePicture
                          ? testimonial.student.profilePicture.url
                          : undefined
                      }
                    />
                  );
                }
              )}

              {renderExtraFirst}
            </div>
          </div>
          <button
            className={featured.right}
            onClick={next}
            type="button"
            aria-label="right"
          />
        </div>
      </section>
    </>
  );
}
