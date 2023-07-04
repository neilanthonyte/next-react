import * as React from "react";
import * as Script from "react-load-script";

import { InputDecoration } from "../InputDecoration";
import { InputControls } from "../InputControls";

export interface IAddressLookUpProps {
  apiKey: string;
  label: string;
  description: string;
  chosenAddress: (googlePlace: IGooglePlace) => void;
}

export interface IAddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

export interface ILocation {
  lat: number;
  lng: number;
}

export interface IViewport {
  south: number;
  west: number;
  north: number;
  east: number;
}

export interface IGeometry {
  location: ILocation;
  viewport: IViewport;
}

export interface IGooglePlace {
  address_components: IAddressComponent[];
  adr_address: string;
  formatted_address: string;
  geometry: IGeometry;
  icon: string;
  id: string;
  name: string;
  place_id: string;
  reference: string;
  scope: string;
  types: string[];
  url: string;
  utc_offset: number;
  vicinity: string;
  html_attributions: any[];
}

export class AddressLookup extends React.Component<IAddressLookUpProps> {
  private readonly mapScr: string;
  private addressInput: HTMLElement | null;

  constructor(props: IAddressLookUpProps) {
    super(props);

    this.mapScr = `https://maps.googleapis.com/maps/api/js?key=${props.apiKey}&libraries=places`;
    this.addressInput = null;

    this.clearValue = this.clearValue.bind(this);
    this.handleScriptLoad = this.handleScriptLoad.bind(this);
  }

  clearValue() {
    // if (this.addressInput !== null) this.addressInput.value = '';
  }

  handleScriptLoad() {
    const options = {
      componentRestrictions: { country: "au" },
    };
    // @ts-ignore
    const autoComplete = new window.google.maps.places.Autocomplete(
      this.addressInput,
      options,
    );
    autoComplete.addListener("place_changed", () =>
      this.props.chosenAddress(autoComplete.getPlace()),
    );
  }

  render() {
    return (
      <React.Fragment>
        <InputDecoration
          label={this.props.label}
          description={this.props.description}
        >
          <InputControls onClearValue={this.clearValue}>
            <input type="text" ref={(e) => (this.addressInput = e)} />
          </InputControls>
        </InputDecoration>
        <Script url={this.mapScr} onLoad={this.handleScriptLoad} />
      </React.Fragment>
    );
  }
}

export default AddressLookup;
