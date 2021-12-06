import Link from "next/link";
import { useState } from "react";
import nav from "../styles/components/Navigation.module.scss";
import NavLinks from "./NavLinks";
import React from "react";
import useWindowSize from "../lib/useWindowSize";
import classNames from "classnames";
export default function Navigation() {
  const [toggle, setToggle] = useState(false);
  const size = useWindowSize();
  const fullMenu = size.width > 1200;
  return (
    <nav className={nav.navigation}>
      <div className={classNames(nav.uva__bar, nav.buttons)}>
        <div className="container__nav">
          <a href="https://www.uva.nl">
            <img
              src="/images/uva-logo.svg"
              alt="University of Amsterdam"
              height="28px"
              width="auto"
            />
          </a>
        </div>
      </div>
      <div className={nav.grappa__bar}>
        <div className="container__nav container__flex">
          <Link href="/">
            <img
              className={nav.logo}
              src="/images/grappa-logo.svg"
              alt="GRAPPA"
            />
            {/* Image source: https://www.nasa.gov/sites/default/files/images/607025main_MSX_no_labels_full.jpg */}
          </Link>

          {fullMenu ? (
            <NavLinks toggle={toggle} />
          ) : (
            <button className={nav.burger} onClick={() => setToggle(!toggle)}>
              <div className={classNames(nav.meat, toggle && nav.active)} />
              <div className={classNames(nav.meat, toggle && nav.active)} />
              <div className={classNames(nav.meat, toggle && nav.active)} />
            </button>
          )}
        </div>
        {!fullMenu && toggle && <NavLinks toggle={toggle} />}
      </div>
    </nav>
  );
}
