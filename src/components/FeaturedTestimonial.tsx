import React from "react";
import Image from "next/image";
import layout from '../styles/components/Layout.module.scss';
import featured from '../styles/components/FeaturedTestimonial.module.scss';

export function FeaturedTestimonial({}) {
  return (
    <section className={featured.container}>
        <div className={layout.container__main}>
          <figure className={featured.container__figure}>
          <div>
            <blockquote className={featured.quote}>In GRAPPA you will feel like you’re diving into an international atmosphere surrounded by fascinating courses and seminars, which are on the edge of current knowledge.
            </blockquote>
            <figcaption><h4>–Ariane Dekker, Master's student</h4></figcaption>
          </div>
          <Image className={featured.avatar} src="/images/ariane-dekker.jpg" alt="Ariane Dekker smiling" width={240} height={240}/>
          </figure>
        <div>
          
        </div>  
        </div>
    </section>
  );
}
