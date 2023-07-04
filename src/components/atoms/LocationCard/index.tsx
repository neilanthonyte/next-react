import * as React from "react";

import { CellHeader, CellDescription, Cell } from "../../structure/Cell";
import { Card, CardBody } from "../../structure/Card";
import { NextLocation } from "next-shared/src/models/NextLocation";
import { AltButton } from "../../generic/Button";
import { EStandardSizes } from "next-shared/src/types/standardSizes";
import { BookingButton } from "../BookingButton";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";

const css = cssComposer(styles, "LocationCard");

export interface ILocationCardProps {
  location: NextLocation;
  onSelect?: (location: NextLocation) => any;
}

/**
 * LocationCard wraps a card to display important information about a location
 */
export const LocationCard: React.FC<ILocationCardProps> = ({
  location,
  onSelect,
}) => {
  // If an onSelect method is provided, url is not given to card.
  const url = onSelect ? null : location.url;

  const address1 = location.address?.streetAddress;
  const address2 = [
    location.address?.suburb,
    location.address?.state,
    location.address?.postcode,
  ]
    .filter((x) => !!x)
    .join(", ");

  return (
    // HACK - required for testing
    <div
      className={css("")}
      style={{ display: "flex", width: "100%" }}
      data-test="location-card"
    >
      <Card onClick={onSelect ? () => onSelect(location) : null} url={url}>
        <CardBody decorationImage={location.posterImage.squareMedium}>
          <Cell>
            <div className={css("body")}>
              <div className={css("content")}>
                <CellHeader>{location.title}</CellHeader>
                <CellDescription>
                  {!!address1 && <div>{address1}</div>}
                  {!!address2 && <div>{address2}</div>}
                </CellDescription>
              </div>
              {!!url && (
                <div className={css("buttons")}>
                  <div className={css("button")}>
                    <BookingButton
                      location={location}
                      className={css("button_content")}
                      size={EStandardSizes.Small}
                    >
                      Book now
                    </BookingButton>
                  </div>
                  <div className={css("button")}>
                    <AltButton
                      to={url}
                      size={EStandardSizes.Small}
                      className={css("button_content")}
                    >
                      More info
                    </AltButton>
                  </div>
                </div>
              )}
            </div>
          </Cell>
        </CardBody>
      </Card>
    </div>
  );
};
