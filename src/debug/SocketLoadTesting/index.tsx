import { urlParamsToObject } from "next-shared/src/helpers/urlParamsToObject";
import * as React from "react";

export interface ISocketLoadTestingProps {
  sessionId: string;
}

export const SocketLoadTesting: React.FC<ISocketLoadTestingProps> = ({
  sessionId,
}) => {
  const style: React.CSSProperties = {
    height: "100%",
  };
  const { patientId } = urlParamsToObject();
  if (!patientId)
    return (
      <p>
        Please specify a patient using the <code>patientId</code> param
      </p>
    );

  return (
    <iframe
      src={`http://localhost:6060/?useRealClient=true&debugSessionId=${sessionId}&patientId=${patientId}#/Components/PatientFetch`}
      style={style}
    ></iframe>
  );
};
