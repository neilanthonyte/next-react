import * as React from "react";

import { ImgBlock } from "../../generic/ImgBlock";
import { Hcp } from "next-shared/src/models/Hcp";
import { Avatar } from "../../generic/Avatar";
import { EStandardSizes } from "next-shared/src/types/standardSizes";
import { NextLocation } from "next-shared/src/models/NextLocation";
import { CellDescription } from "../../structure/Cell";
import { AltButton } from "../../generic/Button";
import { Section, Header, Title, Body } from "../../abstract/Section";
import { BookingButton } from "../../atoms/BookingButton";

import { cssComposer } from "../../../helpers/cssComposer";
import styles from "./styles.scss";
const css = cssComposer(styles, "Result");

export const ResultsTitle: React.FC = ({ children }) => (
  <Header>
    <Title size={3}>{children}</Title>
  </Header>
);

export const ResultsBody: React.FC = ({ children }) => (
  <Body>
    {React.Children.map(children, (child) => (
      <div data-test="search-result">{child}</div>
    ))}
  </Body>
);

/**
 * Subcomponent used to build the various search results use in the Next search
 * feature.
 */
export const Results: React.FC = ({ children }) => (
  <Section candycane={false} dataTest="search-results">
    {children}
  </Section>
);

export const Result: React.FC = ({ children }) => (
  <div className={css("")}>{children}</div>
);

export interface IResultDecorationProps {
  src?: string;
}

export const ResultDecoration: React.FC<IResultDecorationProps> = ({ src }) => (
  <div className={css("decoration")}>
    <ImgBlock src={src} variant="cover" />
  </div>
);

export const ResultTitle: React.FC = ({ children }) => (
  <div className={css("title")}>
    <Title size={4}>{children}</Title>
  </div>
);

export const ResultContent: React.FC = ({ children }) => (
  <div className={css("content")}>{children}</div>
);

export const ResultBody: React.FC = ({ children }) => (
  <div className={css("body")}>{children}</div>
);

export const ResultActions: React.FC = ({ children }) => (
  <div className={css("actions")}>{children}</div>
);

export interface IResultHcpProps {
  hcp: Hcp;
  location?: NextLocation;
  onBook?: (hcp: Hcp) => any;
}
export const ResultHcp: React.FC<IResultHcpProps> = ({
  hcp,
  location,
  onBook,
}) => {
  // bookable if the location uses an external boooking system
  // or it uses Next for bookings and it has appointments
  const bookable =
    (location && location.usesExternalBookings()) ||
    (onBook &&
      typeof onBook === "function" &&
      hcp.appointmentTypeSlugs &&
      Array.isArray(hcp.appointmentTypeSlugs) &&
      hcp.appointmentTypeSlugs.length > 0);
  return (
    <Result>
      <ResultDecoration src={hcp.profileImage.squareSmall} />
      <ResultBody>
        <ResultTitle>{hcp.title}</ResultTitle>
        {location && (
          <ResultContent>
            <ResultLocationPreview location={location} />
          </ResultContent>
        )}
      </ResultBody>
      <ResultActions>
        {bookable && (
          <BookingButton
            size={EStandardSizes.Small}
            location={location}
            onBook={() => onBook(hcp)}
          >
            Book now
          </BookingButton>
        )}
        {hcp && hcp.url && (
          <AltButton size={EStandardSizes.Small} to={hcp.url}>
            More info
          </AltButton>
        )}
      </ResultActions>
    </Result>
  );
};

export interface IResultLocationProps {
  location: NextLocation;
  hcps?: Hcp[];
  onBook?: (location: NextLocation) => any;
}
export const ResultLocation: React.FC<IResultLocationProps> = ({
  location,
  hcps,
  onBook,
}) => {
  return (
    <Result>
      <ResultDecoration src={location.posterImage.squareSmall} />
      <ResultBody>
        <ResultTitle>{location.title}</ResultTitle>
        {hcps && (
          <ResultContent>
            <ResultHcpsPreview hcps={hcps} truncate={5} />
          </ResultContent>
        )}
      </ResultBody>
      <ResultActions>
        {onBook && (
          <BookingButton
            size={EStandardSizes.Small}
            location={location}
            onBook={() => onBook(location)}
          >
            Book now
          </BookingButton>
        )}
        {location.url && (
          <AltButton size={EStandardSizes.Small} to={location.url}>
            More info
          </AltButton>
        )}
      </ResultActions>
    </Result>
  );
};

export interface IResultLocationPreviewProps {
  location: NextLocation;
}
export const ResultLocationPreview: React.FC<IResultLocationPreviewProps> = ({
  location,
}) => {
  return (
    <div className={css("preview")}>
      <div className={css("preview_img")}>
        <ResultPreviewImage
          src={location.posterImage.squareSmall}
          stdSize={EStandardSizes.ExtraSmall}
        />
      </div>
      <div className={css("preview_description")}>
        <ResultPreviewDescription>{location.title}</ResultPreviewDescription>
      </div>
    </div>
  );
};

export interface IResultHcpsPreviewProps {
  hcps: Hcp[];
  truncate?: number;
}
export const ResultHcpsPreview: React.FC<IResultHcpsPreviewProps> = ({
  hcps,
  truncate,
}) => {
  if (!hcps || !Array.isArray(hcps)) {
    return null;
  }
  const shouldTruncate = truncate && truncate > 0 && truncate < hcps.length;
  const hcpsList = (shouldTruncate ? hcps.slice(0, truncate) : hcps).reverse();
  return (
    <div className={css("preview_list")}>
      {hcpsList.map((hcp) => (
        <div key={hcp.slug} className={css("preview")}>
          <div className={css("preview_img")}>
            <ResultPreviewImage
              src={hcp.profileImage.squareSmall}
              stdSize={EStandardSizes.ExtraSmall}
            />
          </div>
        </div>
      ))}
      {shouldTruncate && (
        <div className={css("preview")}>
          <ResultPreviewDescription>
            + {hcps.length - truncate} more
          </ResultPreviewDescription>
        </div>
      )}
    </div>
  );
};

const ResultPreviewImage = Avatar;
const ResultPreviewDescription = CellDescription;
