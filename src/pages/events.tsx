import Layout from "../components/Layout";
import BasicMeta from "../components/meta/BasicMeta";
import React from "react";
import { gql } from "graphql-request";
import FullCalendar from "@fullcalendar/react";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import dayGridPlugin from "@fullcalendar/daygrid";
import { contentfulApi } from "../lib/contentful";
import HeaderText from "../components/HeaderText";

export default function Events({ pageEntry }) {
  return (
    <Layout>
      <BasicMeta url={"/"} />
      <div className="container__main">
        <HeaderText header={pageEntry.hero} sideLayout />
      </div>
      <div
        className="container__main text__headline_4"
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
  const pageQuery = gql`
    query eventsPageEntryQuery {
      eventsPage(id: "VWt5TpothfZllTDMygdzD") {
        sys {
          id
        }
        hero {
          headline
          subheader
          description
          backgroundImage {
            title
            description
            url
          }
        }
        pageMetadata {
          title
          slug
          description
        }
      }
    }
  `;
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

  const pageData = await contentfulApi(pageQuery, { preview });
  const pageEntry = pageData.eventsPage;

  return {
    props: {
      pageEntry,
      preview,
    },
  };
}
