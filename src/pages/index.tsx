import Layout from "../components/Layout";

import React from "react";
import { gql } from "graphql-request";
import { Hero } from "../components/Hero";
import { FeaturedTeasers } from "../components/FeaturedTeasers";
import { FeaturedTestimonial } from "../components/FeaturedTestimonial";
import BasicMeta from "../components/meta/BasicMeta";
import { FeaturedNews } from "../components/FeaturedNews";
import { contentfulApi, fetchNewsEntry } from "../lib/contentful";

export default function Index({
  hero,
  url,
  testimonials,
  homepageTeasers,
  newsEntry,
}) {
  return (
    <Layout>
      <BasicMeta url={url} />
      <Hero hero={hero} />
      <FeaturedTeasers homepageTeasers={homepageTeasers} />
      <FeaturedTestimonial testimonials={testimonials} />
      <FeaturedNews newsEntry={newsEntry.newsPage.highlights.items} />
    </Layout>
  );
}

async function fetchHero() {
  const heroData = await contentfulApi(gql`
    query heroEntryQuery {
      hero(id: "2xGHilZov5iOIqcCbeoLoy") {
        headline
        subheader
        primaryCtaUrl
        primaryCtaCopy
        backgroundImage {
          url
          description
        }
      }
    }
  `);
  return heroData;
}

async function fetchHomepageTeasers() {
  const homepageTeaserData = await contentfulApi(gql`
    query homepageTeasersCollectionQuery {
      homepageTeasersCollection(order: order_ASC) {
        items {
          image {
            url
            description
          }
          order
          headline
          bodyCopy
        }
      }
    }
  `);
  return homepageTeaserData;
}

async function fetchTestimonials() {
  const testimonialData = await contentfulApi(gql`
    query testimonialCollectionQuery {
      testimonialCollection {
        items {
          sys {
            id
          }
          student {
            fullName
            jobTitle {
              title
            }
            profilePicture {
              url
            }
          }
          testimonialCopy
        }
      }
    }
  `);
  return testimonialData;
}

export async function getStaticProps() {
  const [hero, testimonials, newsEntry, homepageTeasers] = await Promise.all([
    fetchHero(),
    fetchTestimonials(),
    fetchNewsEntry(),
    fetchHomepageTeasers(),
  ]);

  return {
    props: {
      hero,
      newsEntry,
      testimonials,
      homepageTeasers,
    },
  };
}
