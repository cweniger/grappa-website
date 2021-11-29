import React from "react";
import styles from "../styles/components/PrimaryCTA.module.scss";

export function PrimaryCTA({ href, ctaCopy }) {
  return (
    <a className={styles.cta__primary} href={href}>
      {ctaCopy}
    </a>
  );
}
