import * as React from "react";
import { useState } from "react";
import moment from "moment";

import { SuccessBadge } from "../Badge";
import { Button, AltButton } from "../Button";

import styles from "./styles.scss";

export interface IComment {
  Id: string; // used to be passed back with any reply or edit
  authorName: string; // person who wrote the comment
  date: number; // date the comment was made
  comment: string; // the comment
  comments?: ICommentsProps[]; // collection of children comments
}

export interface ICommentsProps {
  comment: IComment; // comment object
  replyable?: (authorName: string) => boolean; // check to see if user is able to reply to comment
  editable?: (authorName: string) => boolean; // check to see if user is able to edit comment
  editComment: (Id: string, comment: string) => void; // callback on editing comment
  replyToComment: (Id: string, comment: string) => void; // callback on replying to comment
}

export const Comment: React.FC<ICommentsProps> = (props: ICommentsProps) => {
  const { replyable, editable, editComment, replyToComment } = props;
  const { Id, authorName, date, comment, comments } = props.comment;

  const formattedDate = moment.unix(date).format("dddd, MMMM Do YYYY hh:mm a");
  const [isEditable] = useState(() =>
    typeof editable === "function" ? editable(authorName) : false,
  );
  const [isReplyable] = useState(() =>
    typeof replyable === "function" ? replyable(authorName) : false,
  );

  return (
    <React.Fragment>
      <div className={styles.comment}>
        <div className={styles.commentHeader}>
          <h4>{authorName}</h4>
          <SuccessBadge>{formattedDate}</SuccessBadge>
        </div>
        <p className={styles.commentText}>{`'${comment}'`}</p>
        <div className={styles.commentFooter}>
          <Button
            onClick={() => replyToComment(Id, comment)}
            disabled={!isReplyable}
          >
            Reply
          </Button>
          <AltButton
            onClick={() => editComment(Id, comment)}
            disabled={!isEditable}
          >
            Edit
          </AltButton>
        </div>
      </div>
      {comments ? (
        <React.Fragment>
          {comments.map((childComment: ICommentsProps, key: number) => (
            <div key={key} className={styles.childComment}>
              <Comment
                comment={childComment.comment}
                editComment={editComment}
                replyToComment={replyToComment}
                editable={editable}
                replyable={replyable}
              />
            </div>
          ))}
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
};
