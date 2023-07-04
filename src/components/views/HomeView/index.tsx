import * as React from "react";
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";

import { ContentGrid } from "../../structure/ContentGrid";
import { Icon } from "../../generic/Icon";
import { Page, PageHeader, PageTitle } from "../../structure/Page";
import { EStandardSizes } from "next-shared/src/types/standardSizes";

// css
import styles from "./styles.scss";

const guidesImgUrl =
  "https://d1qr34qzhiwpdo.cloudfront.net/pages/sections/backgrounds/guides.jpg";
const tasksImgUrl =
  "https://d1qr34qzhiwpdo.cloudfront.net/pages/sections/backgrounds/tasks-list.jpg";

interface IHomeViewProps {
  guidesPath: string;
  tasksPath: string;
}

const HomeViewInner: React.FC<IHomeViewProps & RouteComponentProps> = ({
  guidesPath,
  tasksPath,
}) => (
  <Page>
    <div className={styles.home}>
      <div className={styles.home_header}>
        <PageHeader>
          <PageTitle>Next Practice Portal</PageTitle>

          <div className={styles.home_goals}>
            <ContentGrid columns={3}>
              <div className={styles.goal}>
                <Icon name="about-us" size={EStandardSizes.Large} />
                <h4>Happy, healthy patients</h4>
              </div>
              <div className={styles.goal}>
                <Icon name="specialist" size={EStandardSizes.Large} />
                <h4>Happy, healthy health care workers</h4>
              </div>
              <div className={styles.goal}>
                <Icon name="address" size={EStandardSizes.Large} />
                <h4>Happy, healthy clinic business</h4>
              </div>
            </ContentGrid>
          </div>
        </PageHeader>
      </div>

      <div className={styles.home_content}>
        <NavLink
          className={[styles.link, styles.guides].join(" ")}
          to={guidesPath}
        >
          <div
            style={{ backgroundImage: `url(${guidesImgUrl})` }}
            className={styles.link_background}
          />
          <div className={styles.link_body}>
            <header>
              <h2>Guides</h2>
              <hr />
            </header>
            <p>Useful guides for how to run your clinics</p>
          </div>
        </NavLink>

        <NavLink
          className={[styles.link, styles.tasks].join(" ")}
          to={tasksPath}
        >
          <div
            style={{ backgroundImage: `url(${tasksImgUrl})` }}
            className={styles.link_background}
          />
          <div className={styles.link_body}>
            <header>
              <h2>Tasks</h2>
              <hr />
            </header>
            <p>Check out your tasks for today</p>
          </div>
        </NavLink>
      </div>
    </div>
  </Page>
);

export const HomeView = withRouter(HomeViewInner) as any;
