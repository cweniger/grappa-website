import styles from "../styles/components/Navigation.module.scss";
import Link from "next/link";

export default function DesktopNav() {
  return (
    <div className={styles.desktopNavContainer}>
      <ul className={styles.navLinks}>
        <li>
          <Link href="/research">
            <a>research</a>
          </Link>
        </li>
        <li>
          <Link href="/education">
            <a>education</a>
          </Link>
        </li>
        <li>
          <Link href="/people">
            <a>people</a>
          </Link>
        </li>
        <li>
          <Link href="/news">
            <a>news</a>
          </Link>
        </li>
        <li>
          <Link href="/events">
            <a> events</a>
          </Link>
        </li>
        <li>
          <Link href="/opportunities">
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
  );
}

{
  /* <Link href="/contact">
              <a className={router.pathname === "/contact" ? "active" : null}>
                contact
              </a>
            </Link> */
}
