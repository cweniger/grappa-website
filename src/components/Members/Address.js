import people from "../../styles/components/Address.module.scss";
import React from "react";

export default function Address({ entry }) {
  return (
    <address className={people.address}>
      {entry.fullName && <h1>{entry.fullName}</h1>}
      {entry.additionalInstitutions && (
        <p>
          <p>Additional Institutions: </p>
          <p>{entry.additionalInstitutions}</p>
        </p>
      )}
      {entry.phoneNumber && (
        <p>
          <a href={`tel:${entry.phoneNumber}`}>{entry.phoneNumber}</a>
        </p>
      )}
      {entry.emailAddress && (
        <p>
          <a href={`mailto:${entry.emailAddress}`}>{entry.emailAddress}</a>
        </p>
      )}
      {entry.office && <p className={people.office}>{entry.office}</p>}
      {entry.websiteUrl && (
        <p>
          <a href={entry.websiteUrl}>Personal Website</a>
        </p>
      )}
      {entry.publicationUrl && (
        <p>
          <a href={entry.publicationUrl}>Published Papers</a>
        </p>
      )}
    </address>
  );
}
