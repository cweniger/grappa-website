import Head from "next/head";
import config from "../../lib/config";
import React from "react";

type Props = {
  title?: string;
  description?: string;
  keywords?: string[];
  author?: string;
  url: string;
  image?: string;
  children?: React.ReactNode;
};
export default function BasicMeta({
  title,
  description,
  keywords,
  author,
  children,
  url,
  image,
}: Props) {
  return (
    <Head>
      <title>
        {title ? [title, config.site_title].join(" | ") : config.site_title}
      </title>
      <meta
        name="description"
        content={description ? description : config.site_description}
      />
      <meta
        name="keywords"
        content={
          keywords
            ? keywords.join(",")
            : config.site_keywords.map((it) => it.keyword).join(",")
        }
      />
      {author ? <meta name="author" content={author} /> : null}
      <meta property="og:site_name" content={config.site_title} />
      <meta property="og:url" content={config.base_url + url} />
      <meta
        property="og:title"
        content={title ? [title, config.site_title].join(" | ") : ""}
      />
      <meta
        property="og:description"
        content={description ? description : config.site_description}
      />
      <meta
        property="og:image"
        content={image ? image : config.base_url + "/og_image.png"}
      />
      <meta property="og:type" content="article" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:site" content={config.twitter_account} />
      <meta property="twitter:url" content={config.base_url + url} />
      <meta
        property="twitter:title"
        content={title ? [title, config.site_title].join(" | ") : ""}
      />
      <meta
        property="twitter:description"
        content={description ? description : config.site_description}
      />
      <link rel="canonical" href={config.base_url + url} />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="images/favicons/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="images/favicons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="images/favicons/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link
        rel="mask-icon"
        href="images/favicons/safari-pinned-tab.svg"
        color="#5bbad5"
      />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />

      {children}
    </Head>
  );
}
