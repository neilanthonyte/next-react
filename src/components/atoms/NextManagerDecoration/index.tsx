import * as React from "react";
import { useState, useEffect } from "react";
import * as _ from "lodash";

import { NextLocation } from "next-shared/src/models/NextLocation";

import { useClient } from "../../../hooks/useClient";
import {
  MainViewDecoration,
  IMainViewDecorationAction,
} from "../../structure/MainViewDecoration";
import { LatestNewsArticle } from "../../news/LatestNewsItem";

export interface INextManagerDecorationProps {}

export const NextManagerDecoration: React.FC<
  INextManagerDecorationProps
> = ({}) => {
  const client = useClient();

  const [loc, setLocation] = useState<NextLocation>(null);

  useEffect(() => {
    const locationSlug = client.auth.session?.staffMember?.cmsLocationSlug;

    if (!locationSlug) {
      setLocation(null);
      return;
    }

    client.locations
      .retrieveLocationBySlug(locationSlug)
      .then((loc: NextLocation) => {
        setLocation(loc);
      })
      .catch((e) => console.error(e));
  }, [client.auth.session]);

  const actions: IMainViewDecorationAction[] = [
    {
      icon: "logout",
      onClick: () => {
        client.auth
          .logout()
          .then(() => {
            if (localStorage.getItem("using_SSO") === "true") {
              // log out from external service, return back to login page
              client.sso.logoutFromIdentityProvider(location.origin);
            }
          })
          .catch(console.error);
      },
    },
  ];

  return (
    <MainViewDecoration title={loc ? loc.title : ""} actions={actions}>
      <LatestNewsArticle variant="wide" />
    </MainViewDecoration>
  );
};
