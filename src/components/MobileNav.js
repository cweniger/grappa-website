import styles from "../styles/components/Navigation.module.scss";
import Link from "next/link";

export default function MobileNav({ toggle }) {
  return (
    <div>
      {toggle && (
        <div className={styles.mobileNavContainer}>
          <ul className={styles.mobileLinks}>
            <li>
              <Link href="/research" onClick={() => setMenuOpenFalse()}>
                <a>research</a>
              </Link>
            </li>
            <li>
              <Link href="/education" onClick={() => setMenuOpenFalse()}>
                <a>education</a>
              </Link>
            </li>
            <li>
              <Link href="/people" onClick={() => setMenuOpenFalse()}>
                <a>people</a>
              </Link>
            </li>
            <li>
              <Link href="/news" onClick={() => setMenuOpenFalse()}>
                <a>news</a>
              </Link>
            </li>
            <li>
              <Link href="/events" onClick={() => setMenuOpenFalse()}>
                <a> events</a>
              </Link>
            </li>
            <li>
              <Link href="/opportunities" onClick={() => setMenuOpenFalse()}>
                <a>opportunities</a>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <a>contact</a>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
