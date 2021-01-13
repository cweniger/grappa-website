import React from "react";
// import { SocialList } from "../components/SocialList";
import { PrimaryCTA } from "../components/PrimaryCTA";
import layout from '../styles/components/Layout.module.scss';
import hero from '../styles/components/Hero.module.scss';
// interface Props {
//   content: { markdown: HeroProps };
// }

interface HeroProps {
  header: string;
  subheader: string;
}

export const Hero: React.FC<HeroProps> = ({ header, subheader }) => {
  return (
  <>
    <section className={hero.container}>
        <div className={layout.container__mainw}>
         <h2 className={hero.header}>{header}</h2> 
        <p className={hero.subheader}>{subheader}</p>
          <PrimaryCTA />
          {/* <SocialList /> */}
        </div>  
    </section>
    </>
  );
}

