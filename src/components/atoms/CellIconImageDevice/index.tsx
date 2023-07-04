import * as React from "react";
import * as _ from "lodash";
import { Cell, CellType } from "../../structure/Cell";

const deviceIcon: { [key: string]: string } = {
  otoscope: "otoscope",
  dermotoscope: "man",
  default: "iphone",
};

const getIconForDevice = (name: string) =>
  deviceIcon[name] || deviceIcon.default;

interface ICellIconImageDeviceProps {
  deviceName: string;
}

export const CellIconImageDevice: React.FC<ICellIconImageDeviceProps> = ({
  deviceName,
}) => (
  <Cell isLead decorationIcon={getIconForDevice(deviceName)}>
    <CellType>{_.capitalize(deviceName)}</CellType>
  </Cell>
);
