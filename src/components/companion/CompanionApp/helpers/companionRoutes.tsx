import * as React from "react";
import { useParams } from "react-router-dom";

import FormSideBar from "../../../forms/FormSideBar";
import {
  MedicalArticlesSideBar,
  MedicalArticlesView,
} from "../../../medical-articles/MedicalArticlesView";
import {
  MedicalArticleSideBar,
  MedicalArticleView,
} from "../../../medical-articles/MedicalArticleView";
import { IMainViewRoute } from "../../../structure/MainView";
import { AppPatientFormView } from "../../../views/AppPatientFormView";
import { ExitView } from "../../../views/ExitView";
import { CompanionProfileView } from "../../CompanionProfileView";
import { CompanionWelcomeView } from "../../CompanionWelcomeView";

export const companionRoutes: IMainViewRoute[] = [
  {
    path: "/",
    label: "Welcome",
    icon: "certificate",
    routes: [
      {
        path: "/",
        // HACK this needs to be at the root path to avoid the view reloading between linking
        component: CompanionWelcomeView,
      },
    ],
  },
  {
    path: "/profile",
    label: "Profile",
    icon: "avatar-genderless",
    routes: [
      {
        path: "/",
        component: () => {
          return <CompanionProfileView successPath="/" />;
        },
      },
      {
        path: "/forms/:name",
        component: () => {
          const params: any = useParams<any>();
          const name = (params["name"] || "").replace("_", ":");
          return <AppPatientFormView formSlug={name} successPath="/" />;
        },
        menu: FormSideBar,
      },
    ],
  },
  {
    label: "Resources",
    icon: "education-topics",
    path: "/medical-articles",
    menu: MedicalArticlesSideBar,
    routes: [
      {
        path: "/",
        component: MedicalArticlesView,
      },
      {
        path: "/:slug",
        menu: MedicalArticleSideBar,
        component: MedicalArticleView,
      },
    ],
  },
  {
    path: "/exit",
    hidden: true,
    component: ExitView,
  },
];
