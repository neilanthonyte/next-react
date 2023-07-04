declare global {
  const HumanAPI: any;
}

import * as React from "react";
import * as _ from "lodash";

import Anatomy from "../../generic/Anatomy";
import tweenCameras from "./helpers/tweenCameras";
import { ICameraPosition } from "next-shared/src/types/ICameraPosition";

const IDLE_ANIMATION_DURATION = 20000;

if (!_.has(env, "biodigitalKey")) {
  throw new Error("missing BIODIGITAL_KEY from env");
}

const now = () => new Date().getTime();

const humanApiBaseUrl = "https://human.biodigital.com/widget/?";

const defaultParams = [
  "bgstd=255,255,255,255,255,255",
  "ui-all=false",
  "ui-info=false",
];

const buildAnatomyUrl = (
  sceneName: string,
  cameraPositionStr: ICameraPosition,
) =>
  humanApiBaseUrl +
  [
    sceneName,
    `dk=${env.biodigitalKey}`,
    cameraPositionStr ? `camera=${cameraPositionStr}` : null,
  ]
    .concat(defaultParams)
    .filter((a) => !!a)
    .join("&");

export interface IBioDigitalProps {
  /** The name of the biodigital scene - see readme for more examples */
  sceneName: string;
  /** The current camera position. Use `null` to set to inactive mode. */
  camera: ICameraPosition | null;
  cameraPositions?: {
    default: ICameraPosition;
    primary: ICameraPosition;
    secondary: ICameraPosition;
  };
  onCameraChange?: (camera: ICameraPosition) => void;
  /** TODO */
  title?: string;
  /** TODO */
  description?: string;
  /** TODO */
  placeholderUrl?: string;
  /** Show the anatomy full screen */
  fullScreen?: boolean;
  /** Handles the showing of the title and description in the anatomy component */
  showInfo?: boolean;
  onStateChange?: (val: any) => void;
  tourIndex?: any;
  hiddenBodySystems?: any[];
}
export interface IBioDigitalState {
  isInteractive: boolean;
  isLoaded: boolean;
  bodySystems: any[];
  tourChapters: any[];
}

/**
 * Shows a BioDigital scene.
 *
 * If props.camera set, then it's in the interactive mode.
 * Camera changes are reported but not internally stored.
 */
export class BioDigital extends React.Component<
  IBioDigitalProps,
  IBioDigitalState
> {
  private domId: string;
  private human: any;
  private muteCameraUpdate: boolean;
  private updateTimeout: any;
  private anatomyParent: {
    objectId: any;
  }; // can't type without documentation.
  private iframeState: any;
  private cameraPositions: {
    primary: ICameraPosition | null;
    secondary: ICameraPosition | null;
    default: ICameraPosition | null;
  };
  private idleCallback: any; // cant work out why this being used a boolean.
  private anatomyUrl: string;

  constructor(props: IBioDigitalProps) {
    super(props);
    this.state = {
      isLoaded: false,
      isInteractive: _.has(props, "camera.position"),
      bodySystems: [],
      tourChapters: [],
    };

    this.domId = `anatomy${_.uniqueId()}`;
    this.human = null;
    this.muteCameraUpdate = false;
    this.updateTimeout = null;
    this.anatomyParent = null;

    // Capture the current state in order to report back. Not managed as state, as it
    // reflect the state of the iFrame scene
    this.iframeState = {
      camera: null,
      tourIndex: 0,
      hiddenBodySystems: [],
    };

    const defaultPositions: {
      default: null;
      primary: null;
      secondary: null;
    } = {
      default: null,
      primary: null,
      secondary: null,
    };
    const cameras = _.pick(props.cameraPositions, [
      "default",
      "primary",
      "secondary",
    ]);
    this.cameraPositions = {
      ...defaultPositions,
      ...cameras,
    };

    this.idleCallback = false;
    this.anatomyUrl = buildAnatomyUrl(
      this.props.sceneName,
      this.cameraPositions.primary,
    );

    this.initHumanAPI = this.initHumanAPI.bind(this);
  }
  // Rocks between two camera positions
  startIdleAnimation() {
    if (
      this.idleCallback ||
      !this.cameraPositions.primary ||
      !this.cameraPositions.secondary
    ) {
      return;
    }
    // Ensure we immediate consider this active, before the initial transition.
    this.idleCallback = true;

    this.human.send(
      "camera.set",
      { ...this.cameraPositions.primary, animate: true },
      () => {
        // Ensure we haven't switched mode during the animation pause.
        if (this.state.isInteractive) {
          return;
        }
        const startedAt = now();
        this.idleCallback = setInterval(() => {
          // Ensure we haven't been cancelled
          if (!this.idleCallback) {
            return;
          }

          const diff = now() - startedAt,
            x = diff / IDLE_ANIMATION_DURATION,
            progress = (Math.cos(Math.PI * (2 * x + 1)) + 1) / 2;

          this.human.send(
            "camera.set",
            tweenCameras(
              this.cameraPositions.primary,
              this.cameraPositions.secondary,
              progress,
            ),
          );
        }, 30);
      },
    );
  }
  stopIdleAnimation() {
    clearTimeout(this.idleCallback);
    this.idleCallback = false;
  }
  // The muteUpdate option suppress the risk of reporting back an update that
  // was triggered externally. By contrast, we leave this update on when triggered
  // by ourselves, as it allows us to inform others that our camera position has
  // been updated.
  jumpCameraToInteractivePosition(
    camera: ICameraPosition,
    muteUpdate: boolean,
  ) {
    if (!camera) return;

    this.stopIdleAnimation();
    this.muteCameraUpdate = muteUpdate;
    this.human.send("camera.set", { ...camera, animate: true }, () => {
      // wait for the animation to avoid any camera update callbacks
      setTimeout(() => {
        this.muteCameraUpdate = false;
      }, 1000);
    });
  }
  setInteractive = (active: boolean) => {
    this.setState({ isInteractive: active });

    if (active) {
      this.jumpCameraToInteractivePosition(this.cameraPositions.default, false);
    } else {
      this.startIdleAnimation();
    }
    // let others know the mode has changed
    this.reportCameraChange(active ? this.cameraPositions.default : null);
  };
  initHumanAPI() {
    this.human = new HumanAPI({
      iframeId: this.domId,
      showLog: true,
      humanLog: true,
    });
    this.human.on("human.ready", () => {
      this.setState({ isLoaded: true });

      if (this.state.isInteractive) {
        this.jumpCameraToInteractivePosition(this.props.camera, true);
      } else {
        this.startIdleAnimation();
      }
      // Determine the available bodySystems
      this.human.send("scene.info", (data: any) => {
        this.anatomyParent = _.first(
          _.filter(data.objects, (o) => o.parent === null),
        );
        const bodySystems = _.filter(
          data.objects,
          (o) => o.parent === this.anatomyParent.objectId,
        ).map((s) => {
          return { ...s, visible: true };
        });
        this.setState({
          bodySystems: bodySystems,
        });
      });
      // Fetch the tourChapters
      this.human.send("timeline.info", (timeline: any) => {
        this.setState({ tourChapters: timeline.chapters });
      });
    });

    // Listen to camera changes, report after small delay to avoid rapid updates
    this.human.on("camera.updated", (humanCamera: any) => {
      if (this.updateTimeout) {
        clearTimeout(this.updateTimeout);
      }
      if (this.muteCameraUpdate || !this.state.isInteractive) {
        return;
      }
      this.updateTimeout = setTimeout(() => {
        this.reportCameraChange(
          this.state.isInteractive
            ? _.pick(humanCamera, ["position", "target", "up"])
            : null,
        );
      }, 1000);
    });
  }
  onToggleSystems = (activeSystems: any) => {
    if (!this.human) return;
    // Flip to hidden as it's easier to default to: none hidden
    const bodySystemNames = this.state.bodySystems.map((b) => b.name);
    const hiddenSystems = _.difference(bodySystemNames, activeSystems);
    this.updateIframeBodySystems(hiddenSystems);
    // Notify externals
    this.reportStateChange();
  };
  // Ensure the iFrame is showing a particular set of body systems
  updateIframeBodySystems(hiddenSystems = [] as any) {
    this.iframeState.hiddenBodySystems = hiddenSystems;

    const { bodySystems } = this.state;

    // Update the anatomy
    const layers = _.zipObject(
      bodySystems.map((s) => s.objectId),
      bodySystems.map((s) => hiddenSystems.indexOf(s.name) === -1),
    );
    this.human.send("scene.showObjects", layers);
  }
  // Some scenes contain multiple models. This toggles between them.
  onToggleChapter = (chapterIndex: any) => {
    if (!this.human) return;
    this.updateIframeTourChapter(chapterIndex);
    // Inform others of the change
    this.reportStateChange();
  };
  // Ensure the iFrame is showing the correct chapter
  updateIframeTourChapter(index: any) {
    this.iframeState = {
      ...this.iframeState,
      tourIndex: index,
    };
    this.human.send("timeline.set", {
      chapterId: this.state.tourChapters[index],
    });
  }
  // Report our internal state so others can replicate it
  reportCameraChange(camera: any) {
    // Remember position, so we don't treat it new
    this.iframeState = {
      ...this.iframeState,
      camera: _.cloneDeep(camera),
    };
    this.reportStateChange();
  }
  // Notify others of the state change
  reportStateChange() {
    if (!this.props.onStateChange) {
      return;
    }
    this.props.onStateChange(this.iframeState);
  }

  UNSAFE_componentWillReceiveProps(nextProps: IBioDigitalProps) {
    if (!this.state.isLoaded) {
      return;
    }
    if (nextProps === this.iframeState) {
      return;
    }

    const { camera, tourIndex, hiddenBodySystems } = nextProps;

    // Ensure the camera is the in the correct position
    if (!_.isEqual(camera, this.iframeState.camera)) {
      this.iframeState.camera = camera;
      // Ensure its in the right mode
      this.setState({ isInteractive: !!camera }, () => {
        // Jump the camera if needed
        if (this.state.isInteractive) {
          this.jumpCameraToInteractivePosition(camera, true);
        }
      });
    }

    // Ensure the correct tour is showing
    if (tourIndex !== this.iframeState.tourIndex) {
      this.updateIframeTourChapter(tourIndex);
    }

    // Ensure the correct body systems are showing
    if (!_.isEqual(hiddenBodySystems, this.iframeState.hiddenBodySystems)) {
      this.updateIframeBodySystems(hiddenBodySystems);
    }
  }

  UNSAFE_componentWillUpdate(
    nextProps: IBioDigitalProps,
    nextState: IBioDigitalState,
  ) {
    // Have we transitioned between an active and inactive state.
    if (nextState.isInteractive !== this.state.isInteractive) {
      if (!nextState.isInteractive) {
        this.startIdleAnimation();
      }
    }
  }
  componentWillUnmount() {
    if (this.human) {
      this.human._rpc.destroy();
    }
  }
  componentDidMount() {
    // wait until rendered
    this.initHumanAPI();
  }
  render() {
    const { title, description, placeholderUrl, fullScreen, showInfo } =
      this.props;
    const {
      isLoaded,
      isInteractive,
      bodySystems,
      tourChapters = [],
    } = this.state;
    const {
      domId,
      anatomyUrl,
      setInteractive,
      onToggleSystems,
      onToggleChapter,
    } = this;
    // The current iFrame state
    const { tourIndex = 0, hiddenBodySystems = [] } = this.iframeState;
    // A list of body system names
    const bodySystemNames = bodySystems.map((b) => b.name);
    // Determine which body systems are left
    const activeBodySystems = _.difference(bodySystemNames, hiddenBodySystems);

    return (
      <Anatomy
        id={domId}
        title={title}
        description={description}
        anatomyUrl={anatomyUrl}
        fullScreen={fullScreen}
        placeholderUrl={placeholderUrl}
        showPlaceholder={!isLoaded}
        isInteractive={isInteractive}
        setInteractive={setInteractive}
        bodySystemNames={bodySystemNames}
        activeBodySystems={activeBodySystems}
        onToggleSystems={onToggleSystems}
        activeTourChapter={tourIndex}
        chapterCount={tourChapters.length}
        onToggleChapter={onToggleChapter}
        showInfo={showInfo}
      />
    );
  }
}

export interface IClickToShowProps {}
export interface IClickToShowState {
  show: boolean;
}
export class ClickToShow extends React.Component<
  IClickToShowProps,
  IClickToShowState
> {
  constructor(props: IClickToShowProps) {
    super(props);
    this.state = {
      show: false,
    };
  }
  show = () => {
    this.setState({ show: true });
  };
  render() {
    const { show } = this.state;
    const { children } = this.props;
    return (
      <div onClick={this.show}>{show ? children : <h1>Click to show</h1>}</div>
    );
  }
}
