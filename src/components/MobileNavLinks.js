import styles from "../styles/components/Navigation.module.scss";
import Link from "next/link";
import React from "react";
import { NAV_LINKS } from "../lib/constants/navLinks";
export default function NavLinks({ toggle }) {
  return (
    <div className={toggle ? styles.mobileNavContainer : undefined}>
      <ul className={toggle ? styles.mobileLinks : styles.navLinks}>
        {NAV_LINKS?.map((link) => (
          <li key={link?.href}>
            <Link href={link?.href}>
              <a>{link.copy}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
