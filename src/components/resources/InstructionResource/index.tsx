import * as React from "react";
import {
  Resource,
  ResourceHeader,
  ResourceType,
  ResourceBody,
  ResourceFooter,
  ResourceSource,
} from "../../generic/Resource";
import { humaneDate } from "../../../helpers/humaneDate";
import { ELayoutVariant } from "next-shared/src/types/layouts";

export interface IInstructionResourceProps {
  title: string;
  htmlMessage: string;
  lastUpdated?: number;
  variant?: ELayoutVariant;
}

export const InstructionResource: React.FC<IInstructionResourceProps> = ({
  title,
  htmlMessage,
  lastUpdated,
  variant = ELayoutVariant.Standard,
}) => {
  return (
    <Resource fillContainer={variant === ELayoutVariant.Compact}>
      <ResourceHeader icon="write">
        <ResourceType>{title || "Instruction"}</ResourceType>
      </ResourceHeader>
      <ResourceBody>
        {/* <RawHTML html={htmlMessage} /> // TODO - need more discussion */}
        {htmlMessage}
      </ResourceBody>
      {lastUpdated && (
        <ResourceFooter>
          <ResourceSource
            description={`Last updated ${humaneDate(lastUpdated)}`}
          />
        </ResourceFooter>
      )}
    </Resource>
  );
};
