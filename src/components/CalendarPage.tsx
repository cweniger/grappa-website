import FullCalendar from "@fullcalendar/react";
import googleCalendarPlugin from "@fullcalendar/google-calendar";

export default function Events() {
  return (
    <FullCalendar
      plugins={[googleCalendarPlugin]}
      googleCalendarApiKey="AIzaSyATL3jXaI-KKhSiCRZWPtPGXaxyHCGWQVQ"
      events={{
        googleCalendarId:
          "f8r5s6amq4momsc2s7nrt8vees@group.calendar.google.com",
      }}
    />
  );
}
