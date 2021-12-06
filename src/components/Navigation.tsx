import Link from "next/link";
// import Burger from "./Burger";
import { useState } from "react";
import nav from "../styles/components/Navigation.module.scss";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import React from "react";
import classNames from "classnames";
export default function Navigation() {
  const [toggle, setToggle] = useState(false);
  const [active, setActive] = useState(false);

  // function activate() {
  //   setToggle(!toggle);
  //   setActive(!active);
  // }
  return (
    <nav className={classNames(nav.navigation, "")}>
      <div className={nav.uva__bar}>
        <div className={nav.uva__wrapper}>
          <a href="https://www.uva.nl">
            <img
              src="/images/uva-logo.svg"
              alt="University of Amsterdam"
              width="250px"
              height="auto"
            />
          </a>
        </div>
      </div>
      <div className={classNames(nav.uva__wrapper)}>
        <Link href="/">
          <img
            className={nav.logo}
            src="/images/grappa-logo.svg"
            alt="GRAPPA"
          />
          {/* Image source: https://www.nasa.gov/sites/default/files/images/607025main_MSX_no_labels_full.jpg */}
        </Link>
        {/* <Burger onClick={() => activate()} active={active} /> */}
        <DesktopNav />
      </div>
      <MobileNav toggle={toggle} />
    </nav>
  );
}
