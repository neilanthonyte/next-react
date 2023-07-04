import * as React from "react";
import { useContext } from "react";

import { Button } from "../../generic/Button";
import {
  ErrorResolverContext,
  TErrorHandlingApproach,
} from "../../../contexts/ErrorResolver";
import { ErrorResolverHandler } from "./";

interface ICompProps {
  variant: TErrorHandlingApproach;
}

const Comp: React.FC<ICompProps> = ({ variant, children }) => {
  const { resolveError } = useContext(ErrorResolverContext);

  const handleOnClick = () => {
    return new Promise((_, reject) =>
      setTimeout(() => {
        reject();
        resolveError({
          title: "Mocked error",
          approach: variant,
          retry: () =>
            new Promise<void>((resolve) => setTimeout(() => resolve(), 3000)),
        });
      }, 3000),
    );
  };

  return <Button onClick={handleOnClick}>Resolve error - {children}</Button>;
};

export const DemoStandard = () => {
  return (
    <ErrorResolverHandler>
      <Comp variant="modal">Modal</Comp>
      <Comp variant="inline">Inline</Comp>
      <Comp variant="silent">Silent</Comp>
      <div>
        <h3>Some other content</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae
          nesciunt qui nisi inventore iusto eveniet maiores distinctio! Adipisci
          saepe illo sapiente repellat? Sunt debitis temporibus dolorem possimus
          doloremque dolores quam.
        </p>
      </div>
    </ErrorResolverHandler>
  );
};
