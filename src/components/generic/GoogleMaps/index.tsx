import * as React from "react";
import * as Script from "react-load-script";

export interface IGoogleMapsProps {
  lat: number | string;
  lng: number | string;
  zoom: number;
  icon: string;
  apiKey: string;
  width: string;
  height: string;
  markerTitle: string;
  hideUI?: boolean;
}

export interface IGoogleMapsState {}

class GoogleMaps extends React.Component<IGoogleMapsProps, IGoogleMapsState> {
  private readonly mapSrc: string;
  private readonly lat: number;
  private readonly lng: number;

  constructor(props: IGoogleMapsProps) {
    super(props);

    this.mapSrc = `https://maps.googleapis.com/maps/api/js?key=${props.apiKey}`;
    this.lat = Number(props.lat);
    this.lng = Number(props.lng);
    this.handleScriptLoad = this.handleScriptLoad.bind(this);
  }

  handleScriptLoad() {
    // @ts-ignore
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: this.lat, lng: this.lng },
      zoom: this.props.zoom,
      disableDefaultUI: this.props.hideUI,
    });

    const markerOptions = {
      position: { lat: this.lat, lng: this.lng },
      map: map,
      title: "",
    };
    if (this.props.markerTitle) markerOptions.title = this.props.markerTitle;

    // @ts-ignore
    new window.google.maps.Marker(markerOptions);
  }

  render() {
    return (
      <React.Fragment>
        <div
          style={{
            width: this.props.width !== undefined ? this.props.width : "100%",
            height: this.props.height ? this.props.height : "100%",
          }}
          id="map"
        />
        <Script url={this.mapSrc} onLoad={this.handleScriptLoad} />
      </React.Fragment>
    );
  }
}

export default GoogleMaps;
