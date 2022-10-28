import NextLink from "next/link";
import classname from "classnames";
import link from "../styles/components/Link.module.scss";
import React from "react";

interface Props {
  ariaLabel?: string;
  href: string;
  children?: React.ReactNode;
  className?: string;
}

export default function Link({ ariaLabel, href, children, className }: Props) {
  return (
    <NextLink href={href}>
      <a aria-label={ariaLabel} className={classname(className, link.standard)}>
        {children}
      </a>
    </NextLink>
  );
}
