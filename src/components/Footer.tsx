import React from "react";
import {
  FOOTER_MAIN_LINKS,
  FOOTER_MSC_LINKS,
  FOOTER_CONTACT_LINKS,
  FOOTER_EXPERIMENT_LINKS,
} from "../lib/constants/links";

import footer from "../styles/components/Footer.module.scss";
import classnames from "classnames";
import Link from "../components/Link";
export default function Footer() {
  return (
    <footer role="contentinfo" className={classnames(footer.container)}>
      <nav
        aria-label="Site"
        id="site-navigation"
        className="container__main container__grid__cols__3"
      >
        <div>
          <p className="text__headline__4">
            GRAPPA is a centre of excellence of the University of Amsterdam,
            focussing on Gravitation and Astroparticle Physics.
          </p>
          <ul className={footer.list}>
            {FOOTER_MAIN_LINKS?.map((link) => (
              <li key={link?.href}>
                <Link href={link?.href} className={footer?.link}>
                  {link?.copy}
                </Link>
              </li>
            ))}
          </ul>
          <h2 className="text__eyebrow__white">Contact</h2>
          <ul className={footer.list}>
            {FOOTER_CONTACT_LINKS?.map((link) => (
              <li key={link?.href}>
                <Link href={link?.href} className={footer.link}>
                  {link?.copy}
                </Link>
              </li>
            ))}
          </ul>
          <img
            src="/images/uva-logotype.svg"
            alt="Universiteit van Amsterdam"
            width="100px"
          />
        </div>
        <div>
          <h3 className="text__eyebrow__white">Research</h3>

          <h2 className="text__eyebrow__whiteSm">Themes</h2>
          <ul className={footer.list}>
            <li>
              <Link
                href="/research/multimessenger-astrophysics"
                className={footer.link}
              >
                Multimessenger Physics
              </Link>
            </li>
            <li>
              <Link href="/research/dark-universe" className={footer.link}>
                Dark Universe
              </Link>
            </li>
            <li>
              <Link href="/research/the-early-universe" className={footer.link}>
                The Early Universe
              </Link>
            </li>
            <li>
              <Link
                href="/research/gravitational-waves-and-strong-gravity"
                className={footer.link}
              >
                Gravitational Waves and Strong Gravity
              </Link>
            </li>
          </ul>
          <h2 className="text__eyebrow__whiteSm">Experiments</h2>
          <ul className={footer.list}>
            {FOOTER_EXPERIMENT_LINKS?.map((link) => (
              <li key={link.link}>
                <Link href={`/research${link.href}`} className={footer.link}>
                  {link.copy}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text__eyebrow__white">Education</h3>
          <h2 className="text__eyebrow__whiteSm">MSC</h2>
          <ul className={footer.list}>
<<<<<<< HEAD
            {FOOTER_MSC_LINKS?.map((link) => (
              <li key={link?.href}>
                <Link href={link?.href} className={footer.link}>
                  {link?.copy}
                </Link>
              </li>
            ))}
=======
            <li>
              <Link
                href="/education/msc-track-overview"
                className={footer.link}
                ariaLabel="Masters of Science Track Overview"
              >
                Track Overview
              </Link>
            </li>
            <li>
              <Link href="/education/msc-faq" className={footer.link}>
                Frequently Asked Questions
              </Link>
            </li>
            <li>
              <Link
                href="/education/msc-thesis-projects"
                className={footer.link}
              >
                Thesis Projects
              </Link>
            </li>
>>>>>>> main
          </ul>
          <h2 className="text__eyebrow__whiteSm">PhD</h2>
          <ul className={footer.list}>
            <li>
              <Link
                href="/education/phd-track-overview"
                className={footer.link}
              >
                Track Overview
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </footer>
  );
}
