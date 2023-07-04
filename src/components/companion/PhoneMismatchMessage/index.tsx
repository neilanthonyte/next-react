import * as React from "react";

import { MessageTitle, MessageBody, ErrorMessage } from "../../generic/Message";

export const PhoneMismatchMessage: React.FC<{ email?: string }> = ({
  email,
}) => (
  <ErrorMessage>
    <MessageTitle>Existing Next Practice account with issue</MessageTitle>
    <MessageBody>
      We found an existing Next Practice account
      {email && ` matching the email ${email}`}, however the mobile phone number
      does not match the number on your medical record. Please contact your
      clinic to rectify the issue.
    </MessageBody>
  </ErrorMessage>
);
