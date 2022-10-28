import React from "react";
import {
  FOOTER_MAIN_LINKS,
  FOOTER_MSC_LINKS,
  FOOTER_CONTACT_LINKS,
} from "../lib/constants/links";

import footer from "../styles/components/Footer.module.scss";
import classnames from "classnames";
import Link from "../components/Link";
export default function Footer() {
  return (
    <footer className={classnames(footer.container)}>
      <nav className="container__main container__grid__cols__3">
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
          <h4 className="text__eyebrow__white">Contact</h4>
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

          <h4 className="text__eyebrow__whiteSm">Themes</h4>
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
          <h4 className="text__eyebrow__whiteSm">Experiments</h4>
          <ul className={footer.list}>
            <li>
              <Link href="/research/experimental-lhc" className={footer.link}>
                Physics at the Large Hadron Collider
              </Link>
            </li>
            <li>
              <Link
                href="/research/experimental-neutrino-physics"
                className={footer.link}
              >
                Experimental neutrino physics: ANTARES, KM3NeT, DUNE
              </Link>
            </li>
            <li>
              <Link
                href="/research/experiment-experimental-direct-dark-matter-detection-xenon"
                className={footer.link}
              >
                Experimental direct dark matter detection: XENON
              </Link>
            </li>
            <li>
              <Link
                href="/research/experiment-fast-timing-detectors-for-particle-physics-experiments"
                className={footer.link}
              >
                Fast timing detectors for particle physics experiments
              </Link>
            </li>
            <li>
              <Link
                href="/research/experiment-detector-r-and-d-for-gravitational-wave-instrumentation-at-nikhef"
                className={footer.link}
              >
                Detector R&amp;D for gravitational wave instrumentation at
                Nikhef
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text__eyebrow__white">Education</h3>
          <h4 className="text__eyebrow__whiteSm">MSC</h4>
          <ul className={footer.list}>
            {FOOTER_MSC_LINKS?.map((link) => (
              <li key={link?.href}>
                <Link href={link?.href} className={footer.link}>
                  {link?.copy}
                </Link>
              </li>
            ))}
          </ul>
          <h4 className="text__eyebrow__whiteSm">PhD</h4>
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
