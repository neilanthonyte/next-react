import * as React from "react";
import { AnatomiesSideBar } from "../../../../components/anatomy/AnatomiesSideBar";
import { AnatomiesView } from "../../../../components/anatomy/AnatomiesView";
import { AnatomySideBar } from "../../../../components/anatomy/AnatomySideBar";
import { AnatomyView } from "../../../../components/anatomy/AnatomyView";
import { ImagesSideBar } from "../../../../components/images/ImagesSideBar";
import { ImageView } from "../../../../components/images/ImageView";
import {
  MedicalArticlesSideBar,
  MedicalArticlesView,
} from "../../../../components/medical-articles/MedicalArticlesView";
import {
  MedicalArticleSideBar,
  MedicalArticleView,
} from "../../../../components/medical-articles/MedicalArticleView";
import { ProfileViewDashboard } from "../../../../components/profile/ProfileViewDashboard";
import { PatientCurtainView } from "../../../../components/views/PatientCurtainView";
import { PlaceholderView } from "../../../../components/views/PlaceholderView";
import { PlottableObservationsSideBar } from "../../../../components/views/PlottableObservationsMenu";
import { PlottableObservationView } from "../../../../components/views/PlottableObservationsView";

const ImagePlaceHolderView = () => (
  <PlaceholderView
    icon="image"
    instruction="Please select an image from the menu"
  />
);

export const consultScreenRoutes = [
  {
    icon: "home",
    label: "Welcome",
    path: "/",
    component: PatientCurtainView,
  },
  {
    icon: "conditions",
    label: "Profile",
    path: "/profile",
    routes: [
      {
        path: "/",
        component: ProfileViewDashboard,
        // menu: ProfileSideBar
      },
    ],
  },
  {
    icon: "metrics",
    label: "Measurements",
    path: "/metrics",
    menu: PlottableObservationsSideBar,
    routes: [
      {
        path: "/",
        component: PlottableObservationView,
      },
    ],
  },
  {
    icon: "image",
    label: "Images",
    path: "/images",
    menu: ImagesSideBar,
    routes: [
      {
        path: "/",
        component: ImagePlaceHolderView,
      },
      {
        path: "/:device/:id?",
        component: ImageView,
      },
    ],
  },
  {
    icon: "education-topics",
    label: "Resources",
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
    icon: "man",
    label: "Anatomy",
    path: "/anatomies",
    menu: AnatomiesSideBar,
    routes: [
      {
        path: "/",
        component: AnatomiesView,
      },
      {
        path: "/:slug",
        menu: AnatomySideBar,
        component: AnatomyView,
      },
    ],
  },
];
