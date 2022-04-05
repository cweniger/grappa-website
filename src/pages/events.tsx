import Layout from "../components/Layout";
import BasicMeta from "../components/meta/BasicMeta";
import layout from "../styles/components/Layout.module.scss";
import React from "react";
import { gql } from "graphql-request";
import FullCalendar from "@fullcalendar/react";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import dayGridPlugin from "@fullcalendar/daygrid";
import { contentfulApi } from "../lib/contentful";
import HeaderText from "../components/HeaderText";

export default function Events({ heroEntry }) {
  return (
    <Layout>
      <BasicMeta url={"/"} />
      <div className="container__main">
        <HeaderText header={heroEntry.hero} sideLayout image />
      </div>
      <div
        className="container__main text__headline_4"
        suppressHydrationWarning={true}
      >
        {process?.browser && (
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
        backgroundImage {
          url
          description
        }
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
