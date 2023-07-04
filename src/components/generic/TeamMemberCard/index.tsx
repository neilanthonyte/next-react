import * as React from "react";

import { CellHeader, Cell, CellType } from "../../structure/Cell";
import { Card, CardBody } from "../../structure/Card";
import { ICmsTeamMember } from "next-shared/src/types/ICmsTeamMember";

export interface ITeamMemberCardProps {
  content: ICmsTeamMember;
}

export const TeamMemberCard: React.FC<ITeamMemberCardProps> = ({ content }) => {
  return (
    <Card>
      <CardBody decorationImage={content.profileImage.squareMedium}>
        <Cell>
          <CellHeader>{content.title}</CellHeader>
          <CellType>{content.jobTitle}</CellType>
        </Cell>
        <Cell>
          <div dangerouslySetInnerHTML={{ __html: content.bioShort }} />
        </Cell>
      </CardBody>
    </Card>
  );
};

// export default TeamMemberCard;
