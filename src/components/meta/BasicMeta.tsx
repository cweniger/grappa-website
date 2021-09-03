import Head from "next/head";
import config from "../../lib/config";

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
      {children}
    </Head>
  );
}
