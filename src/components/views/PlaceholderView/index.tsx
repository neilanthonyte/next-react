import * as React from "react";
import { useRef, useState } from "react";
// import { withSize, SizeMeProps } from "react-sizeme";

import { Icon } from "../../generic/Icon";
import { EStandardSizes } from "next-shared/src/types/standardSizes";

// css
import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "placeholderView");

interface IPlaceholderViewProps {
  stdSize?: EStandardSizes | null;
  icon?: string;
  instruction?: string;
}
/**
 * Displays a placholder screen. Useful for when no data is available.
 *
 * @param param0
 */
export const PlaceholderView: React.FC<IPlaceholderViewProps> = ({
  icon = "info",
  instruction = "No content available",
  stdSize = EStandardSizes.Small,
}) => {
  const placeHolderEl: React.RefObject<HTMLDivElement> = useRef(null);
  const [placeholderSize] = useState<EStandardSizes | null>(stdSize);

  // useEffect(() => {
  //   if (size && stdSize === null) {
  //     const { width, height } = size;
  //     let placeHolderEleSize: EStandardSizes;

  //     switch (true) {
  //       case width > 1000 || height > 1000:
  //         placeHolderEleSize = EStandardSizes.Large;
  //         break;
  //       case width > 750 || height > 750:
  //         placeHolderEleSize = EStandardSizes.Medium;
  //         break;
  //       case width > 300 || height > 300:
  //         placeHolderEleSize = EStandardSizes.Small;
  //         break;
  //       default:
  //         placeHolderEleSize = EStandardSizes.ExtraSmall;
  //         break;
  //     }
  //     setPlaceholderSize(placeHolderEleSize);
  //   }
  // }, [size]);

  return (
    <div ref={placeHolderEl} className={css("")} data-test="placeholder-view">
      {placeholderSize ? (
        <React.Fragment>
          <div className={css("", `-sizing-${placeholderSize}`)}>
            <div className={css("icon")}>
              <Icon name={icon} />
            </div>
            <div>{instruction}</div>
          </div>
        </React.Fragment>
      ) : null}
    </div>
  );
};

// export const PlaceholderView = withSize({
//   monitorHeight: true,
//   monitorWidth: true,
// })<SizeMeProps & IPlaceholderViewProps>(_PlaceholderView) as React.FC<any>;
