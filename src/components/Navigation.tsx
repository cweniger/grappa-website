import Link from "next/link";
import Burger from "./Burger";
import { useState } from "react";
import styles from "../styles/components/Navigation.module.scss";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

export default function Navigation() {
  const [toggle, setToggle] = useState(false);
  const [active, setActive] = useState(false);

  function activate() {
    setToggle(!toggle);
    setActive(!active);
  }
  return (
    <nav className={styles.navigation}>
      <div className={styles.navContainer}>
        <Link href="/">
          <img
            className={styles.logo}
            src="/images/grappa-logo.svg"
            alt="GRAPPA"
          />
          {/* Image source: https://www.nasa.gov/sites/default/files/images/607025main_MSX_no_labels_full.jpg */}
        </Link>
        <Burger onClick={() => activate()} active={active} />
        <DesktopNav />
      </div>
      <MobileNav toggle={toggle} />
    </nav>
  );
}
