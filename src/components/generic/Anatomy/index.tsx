import * as React from "react";
import * as _ from "lodash";

import { LoadingOverlay } from "../Loader";

import { AltButton } from "../Button";
import { SingleInlineOptions, MultiInlineOptions } from "../InlineOptions";
import { Cell, CellHeader, CellDescription } from "../../structure/Cell";
import { Card } from "../../structure/Card";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles);

interface IAnatomyProps {
  id?: any;
  title?: any;
  fullScreen?: boolean;
  anatomyUrl?: any;
  description?: any;
  placeholderUrl?: string;
  showPlaceholder?: any;
  isInteractive?: any;
  setInteractive?: any;
  bodySystemNames?: string[];
  activeBodySystems?: string[];
  onToggleSystems?: any;
  chapterCount?: number;
  activeTourChapter?: number;
  onToggleChapter?: any;
  showInfo?: boolean;
}

const Anatomy: React.FC<IAnatomyProps> = ({
  id,
  title,
  anatomyUrl,
  description,
  placeholderUrl = "",
  showPlaceholder = true,
  fullScreen = false,
  isInteractive,
  setInteractive,
  bodySystemNames = [],
  activeBodySystems = [],
  onToggleSystems = () => {},
  chapterCount = 0,
  activeTourChapter = 0,
  onToggleChapter = () => {},
  showInfo = true,
}) => {
  const isTour = chapterCount > 1;
  const hasSystems = bodySystemNames.length > 1 && !isTour;
  const getPlaceholder = () => (
    <div
      className={css("placeholder")}
      style={{ backgroundImage: `url('${placeholderUrl}')` }}
    >
      <LoadingOverlay />
    </div>
  );

  const exitInteractiveMode = () => {
    setInteractive(false);
  };

  // HACK - unique ID needed as it doesn't respond to option changes
  const bodySystemNamesToggle = () => (
    <div>
      <h4>Systems</h4>
      <MultiInlineOptions
        options={bodySystemNames}
        selected={activeBodySystems}
        onSelection={(system: any) => {
          onToggleSystems(system);
        }}
      />
    </div>
  );

  // use the index as the label
  const tourChaptersToggle = () => (
    <div>
      <h4>Chapter</h4>
      <SingleInlineOptions
        options={_.times(chapterCount).map((opt) => opt.toString())}
        selected={activeTourChapter.toString()}
        onSelection={(strChapter: string) => {
          onToggleChapter(parseInt(strChapter, 10));
        }}
      />
    </div>
  );

  const getInteractiveContent = () => [
    <div key="exit" className={css("anatomy_exitInteractiveMode")}>
      <AltButton onClick={exitInteractiveMode}>Exit</AltButton>
    </div>,
    <div key="controls" className={css("anatomy_options")}>
      {isTour && tourChaptersToggle()}
      {hasSystems && bodySystemNamesToggle()}
    </div>,
  ];

  const makeInteractive = () => {
    setInteractive(true);
  };

  const hasInfo = title || description;
  const getInactiveContent = () => (
    <div className={css("anatomy_screen")} key="idle" onClick={makeInteractive}>
      <div className={css("anatomy_clickToInteract")}>
        <span>Click to interact</span>
      </div>
    </div>
  );

  const getInfo = () => (
    <div className={css("anatomy_description")}>
      <Card>
        <Cell isLead className="center" decorationIcon="skull">
          <CellHeader>{title}</CellHeader>
          <CellDescription>{description}</CellDescription>
        </Cell>
      </Card>
    </div>
  );

  return (
    <div
      className={css("anatomy", {
        "-fullScreen": fullScreen,
        "-block": !fullScreen,
      })}
    >
      <iframe id={id} src={anatomyUrl} />
      {showPlaceholder && getPlaceholder()}
      {!showPlaceholder &&
        (isInteractive ? getInteractiveContent() : getInactiveContent())}
      {!isInteractive && showInfo && hasInfo && getInfo()}
    </div>
  );
};

export default Anatomy;
