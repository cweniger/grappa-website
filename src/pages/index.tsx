import { NextPage, GetStaticProps } from "next";
import Layout from "../components/Layout";

import { Hero } from "../components/Hero";
import { FeaturedTeasers } from "../components/FeaturedTeasers";
import { PageMetadata } from "../components/PageMetadata";
import { FeaturedTestimonial } from "../components/FeaturedTestimonial";
import { FeaturedNews } from "../components/FeaturedNews";

export default function Index({ hero, testimonials, homepageTeasers, news }) {
  return (
    <Layout>
      <PageMetadata />
      <Hero hero={hero} />
      <FeaturedTeasers homepageTeasers={homepageTeasers} />
      <FeaturedTestimonial testimonials={testimonials} />
      <FeaturedNews news={news} />
    </Layout>
  );
}

const spaceId = process.env.CONTENTFUL_SPACE;
const environmentId = process.env.CONTENTFUL_ENV;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

async function fetchHero() {
  const entryId = "2xGHilZov5iOIqcCbeoLoy";
  const URL = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environmentId}/entries/${entryId}?access_token=${accessToken}`;
  const response = await fetch(URL);
  const hero = await response.json();

  const IMAGE_URL = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environmentId}/assets/${hero.fields.backgroundImage.sys.id}?access_token=${accessToken}`;
  const imageResponse = await fetch(IMAGE_URL);
  const image = await imageResponse.json();

  // Unsure how to pull one single entry
  return {
    ...hero.fields,
    backgroundImage: `https:${image.fields.file.url}`,
  };
}

async function fetchHomepageTeasers() {
  const contentType = "homepageTeasers";

  const URL = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environmentId}/entries?access_token=${accessToken}&content_type=${contentType}`;
  const response = await fetch(URL);
  const homepageTeasers = await response.json();
  const items = homepageTeasers.items.map((item) => ({
    ...item.fields,
    id: item.sys.id,
  }));
  const assets = homepageTeasers.includes.Asset;

  const homepageTeasersWithAssets = items.map((item) => {
    if (!item.image) {
      return item;
    }

    const asset = assets.find((asset) => asset.sys.id === item.image.sys.id);

    return {
      ...item,
      teaserImage: `https:${asset.fields.file.url}`,
    };
  });

  return homepageTeasersWithAssets.sort((a, b) => {
    if (a.order > b.order) {
      return 1;
    } else if (a.order < b.order) {
      return -1;
    }

    return 0;
  });
}

async function fetchNews() {
  const contentType = "news";

  const URL = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environmentId}/entries?access_token=${accessToken}&content_type=${contentType}&fields.highlight=1&order=-fields.date`;
  const response = await fetch(URL);
  const articles = await response.json();

  const items = articles.items.map((item) => ({
    ...item.fields,
    id: item.sys.id,
  }));
  const assets = articles.includes.Asset;

  const newsWithAssets = items.map((item) => {
    if (!item.image) {
      return item;
    }

    const asset = assets.find((asset) => asset.sys.id === item.image.sys.id);

    return {
      ...item,
      image: `https:${asset.fields.file.url}`,
    };
  });

  return newsWithAssets;
}

async function fetchTestimonials() {
  const contentType = "testimonial";

  const URL = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environmentId}/entries?access_token=${accessToken}&content_type=${contentType}`;
  const response = await fetch(URL);
  const testimonials = await response.json();

  return testimonials.items.map((item) => {
    const student = testimonials.includes.Entry.find((student) => {
      return item.fields.student.sys.id === student.sys.id;
    });

    const studentImage = testimonials.includes.Asset.find((studentImage) => {
      return student.fields?.profilePicture?.sys?.id === studentImage.sys.id;
    });

    return {
      ...item.fields,
      id: item.sys.id,
      student: {
        id: student.sys.id,
        ...student.fields,
        profilePic: studentImage
          ? `https:${studentImage.fields.file.url}`
          : null,
      },
    };
  });
}

export async function getStaticProps() {
  const [hero, testimonials, news, homepageTeasers] = await Promise.all([
    fetchHero(),
    fetchTestimonials(),
    fetchNews(),
    fetchHomepageTeasers(),
  ]);

  return {
    props: {
      hero,
      news,
      testimonials,
      homepageTeasers,
    },
  };
}
