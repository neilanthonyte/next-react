declare const env: {
  [key: string]: string;
};

interface IPageEvent {
  gaw: string;
  ga: string;
  fb: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
interface Window {
  webkitAudioContext: AudioContextConstructor;
  /**
   * Redactor WYSIWYG global
   */
  $R: any;
  rtTexture: any;
  dataLayer: any;
  env: {
    [key: string]: string;
  };
  // env: {
  //   tracking: IPageEvent;
  //   ravenUrl: string;
  //   servicesUrl: string;
  // };
  pageEvents: IPageEvent;
  gtag: (...args: any[]) => any;
  fbq: (...args: any[]) => any;
  gallery: ReactImageGalleryItem[];
}

declare module "*.js" {
  const x: any;
  export default x;
}

/**
 * Redactor WYSIWYG global, this is also set on `window.$R`
 */
declare let $R;

declare module "*.scss";
declare module "*.png";
declare module "*.jpg";
declare module "*.json";
declare module "*.mp3";

declare module "react-load-script";
declare module "react-collapse";
declare module "react-code-input";
declare module "react-free-scrollbar";
declare module "payDock-web/client";
declare module "payDock-web/hosted-fields";
declare module "react-currency-format";
declare module "piexifjs";
declare module "lottie-web";
declare module "heroku-ssl-redirect";
declare module "validate.js";
declare module "react-lottie";
declare module "react-file-icon";
declare module "react-fluid-grid";
declare module "tinycolor2";
declare module "notevil";
declare module "soundmanager2";

declare module "mock-socket" {
  class SocketIO extends EventTarget {
    constructor(url: string, protocol: string): void;
    emit(event: string, data: string): SocketIO;
    on(type: string, callback: (...args: any[]) => void): SocketIO;
    off(type: string): void;
    readyState: number;
  }
}
declare module "react-inlinesvg";

declare module "http-proxy/lib/http-proxy/passes/web-outgoing" {
  const x: any;
  export = x;
}
