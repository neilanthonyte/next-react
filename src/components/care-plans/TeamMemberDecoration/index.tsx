import React from "react";

import { EStandardSizes } from "next-shared/src/types/standardSizes";
import { TColorVariants } from "next-shared/src/types/TColorVariants";

import { Icon } from "../../generic/Icon";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "TeamMemberDecoration");

export interface ITeamMemberDecorationProps {}

/**
 * Render a styled avatar decoration used to display a Care Plan team member
 */
export const TeamMemberDecoration: React.FC<
  ITeamMemberDecorationProps
> = () => {
  return (
    <div className={css("", "-color-primary")}>
      <div className={css("icon_wrapper")}>
        <div className={css("icon")}>
          <Icon
            name="avatar-genderless"
            size={EStandardSizes.ExtraSmall}
            variant={TColorVariants.Primary}
          />
        </div>
      </div>
    </div>
  );
};
