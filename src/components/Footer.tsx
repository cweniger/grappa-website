import footer from "../styles/components/Footer.module.scss";
import layout from "../styles/components/Layout.module.scss";
import classnames from "classnames";
import Link from "../components/Link";
export default function Footer() {
  return (
    <footer className={classnames(footer.container)}>
      <nav
        className={classnames(
          layout.container__main,
          "container--grid--cols--3"
        )}
      >
        <div>
          <h3 className="text--eyebrow__white">GRAPPA</h3>
          <ul className={footer.list}>
            <li>
              <Link href="/news" className={footer.link}>
                News
              </Link>
            </li>
            <li>
              <Link href="/members" className={footer.link}>
                Members
              </Link>
            </li>

            <li>
              <Link href="/events" className={footer.link}>
                Events
              </Link>
            </li>
            <li>
              <Link href="/opportunities" className={footer.link}>
                Opportunities
              </Link>
            </li>
            <h4 className="text--eyebrow__whiteSm">Contact</h4>
            <li>
              <Link href="/contact" className={footer.link}>
                Contact GRAPPA
              </Link>
            </li>
            <li>
              <Link href="/contact" className={footer.link}>
                Getting to Campus
              </Link>
            </li>
            <li>
              <Link
                href="https://www.twitter.com/grappainstitute"
                className={footer.link}
              >
                Follow us on Twitter
              </Link>
            </li>
          </ul>
          <img
            src="/images/uva-logotype.svg"
            alt="Universiteit van Amsterdam"
            width="100px"
          />
        </div>
        <div>
          <h3 className="text--eyebrow__white">Research</h3>

          <h4 className="text--eyebrow__whiteSm">Themes</h4>
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
          <h4 className="text--eyebrow__whiteSm">Experiments</h4>
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
          <h3 className="text--eyebrow__white">Education</h3>
          <h4 className="text--eyebrow__whiteSm">MSC</h4>
          <ul className={footer.list}>
            <li>
              <Link
                href="/education/msc-track-overview"
                className={footer.link}
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
          </ul>
          <h4 className="text--eyebrow__whiteSm">PhD</h4>
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
