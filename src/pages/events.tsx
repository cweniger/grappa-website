import Layout from "../components/Layout";
import BasicMeta from "../components/meta/BasicMeta";
import layout from "../styles/components/Layout.module.scss";
import React from "react";
import { gql } from "graphql-request";

import FullCalendar from "@fullcalendar/react";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import dayGridPlugin from "@fullcalendar/daygrid";
import classNames from "classnames";
import { contentfulApi } from "../lib/contentful";

export default function Events({ heroEntry }) {
  return (
    <Layout>
      <BasicMeta url={"/"} />
      <div className="container__main">
        {heroEntry.hero.headline && (
          <h1 className="text__eyebrow__grey">{heroEntry.hero.headline}</h1>
        )}
        {heroEntry.hero.subheader && (
          <p className="text__subheader">{heroEntry.hero.subheader}</p>
        )}
        {/* GRAPPA Colloquia bi-weekly, Mondays, 11am – 12pm GRAPPA Journal Club
        weekly, Mondays, 1:30pm – 2:30pm sign-up sheet for papers ML for
        Physics/Astronomy Journal Club bi-weekly, 1st and 3rd Thursday each
        month, 10:30am – 11:30am */}
      </div>
      <div
        className={classNames(layout.container__main, "text__headline_4")}
        suppressHydrationWarning={true}
      >
        {process.browser && (
          <FullCalendar
            plugins={[googleCalendarPlugin, dayGridPlugin]}
            googleCalendarApiKey="AIzaSyATL3jXaI-KKhSiCRZWPtPGXaxyHCGWQVQ"
            initialView="dayGridMonth"
            eventSources={[
              {
                googleCalendarId:
                  "cqnqr2e2du9c2961qp7ghruq74@group.calendar.google.com",
                color: "#1f78b4",
              },
            ]}
            weekends={false}
            selectable={true}
            eventTimeFormat={{
              hour: "numeric",
              minute: "2-digit",
              meridiem: false,
            }}
          />
        )}
      </div>
    </Layout>
  );
}

export async function getStaticProps({ preview = false }) {
  const peopleQuery = gql`
    query personCollectionQuery($preview: Boolean!) {
      persons: personCollection(preview: $preview, limit: 500) {
        items {
          jobTitle {
            title
            order
          }
          omitProfile
          endDate
          fullName
          slug
          profilePicture {
            url
          }
        }
      }
    }
  `;

  const query = gql`
    query researchCollectionQuery($preview: Boolean!) {
      researchCollection(preview: $preview) {
        items {
          title
          description
          team: teamCollection(limit: 50) {
            items {
              fullName
              profilePicture {
                url
              }
            }
          }
        }
      }
    }
  `;

  const heroQuery = gql`
    query peopleHero {
      hero(id: "67tCgUxz2RwyyNrk06FmpM") {
        headline
        subheader
      }
    }
  `;

  const heroData = await contentfulApi(heroQuery, { preview });
  const heroEntry = heroData;
  return {
    props: {
      heroEntry,
      preview,
    },
  };
}
