## Recursive Comments Component

### Single Comment With Reply

```tsx
import { Comment } from "./";

const replyable = (authorName) => {
  return true;
};

const editable = (authorName) => {
  return false;
};

const editComment = (Id, comment) => {
  // TODO do something
};

const replyToComment = (Id, comment) => {
  // TODO do something
};

const mockData = {
  comment: {
    authorName: "Luke Fisher",
    date: 1554073825,
    comment: "Let's create a comments module!",
  },
};

<div>
  <Comment
    editComment={editComment}
    replyToComment={replyToComment}
    replyable={replyable}
    editable={editable}
    authorName={mockData.authorName}
    date={mockData.date}
    comment={mockData.comment}
  />
</div>;
```

### Single Comment With Reply And Edit

```tsx
import { Comment } from "./";

const replyable = (authorName) => {
  return true;
};

const editable = (authorName) => {
  return true;
};

const editComment = (Id, comment) => {
  // TODO do something
};

const replyToComment = (Id, comment) => {
  // TODO do something
};

const mockData = {
  comment: {
    authorName: "Luke Fisher",
    date: 1554073825,
    comment: "Let's create a comments module!",
  },
};

<div>
  <Comment
    editComment={editComment}
    replyToComment={replyToComment}
    replyable={replyable}
    editable={editable}
    authorName={mockData.authorName}
    date={mockData.date}
    comment={mockData.comment}
  />
</div>;
```

### Comments with 1 level Comment

```tsx
import { Comment } from "./";

const mockData = {
  comment: {
    authorName: "Luke Fisher",
    date: 1554073825,
    comment: "Let's create a comments module!",
    comments: [
      {
        comment: {
          authorName: "Luke Fisher",
          date: 1554073825,
          comment: "Let's create a comments module!",
        },
      },
      {
        comment: {
          authorName: "Luke Fisher",
          date: 1554073825,
          comment: "Let's create a comments module!",
        },
      },
    ],
  },
};

<div style={{ display: "flex", flexWrap: "wrap" }}>
  <Comment
    authorName={mockData.authorName}
    date={mockData.date}
    comment={mockData.comment}
    comments={mockData.comments}
  />
</div>;
```

### Comments with 2 level Comments

```tsx
import { Comment } from "./";

const mockData = {
  comment: {
    authorName: "Luke Fisher",
    date: 1554073825,
    comment: "Let's create a comments module!",
    comments: [
      {
        comment: {
          authorName: "Luke Fisher",
          date: 1554073825,
          comment: "Let's create a comments module!",
          comments: [
            {
              comment: {
                authorName: "Luke Fisher",
                date: 1554073825,
                comment: "Let's create a comments module!",
              },
            },
          ],
        },
      },
      {
        comment: {
          authorName: "Luke Fisher",
          date: 1554073825,
          comment: "Let's create a comments module!",
        },
      },
    ],
  },
};

<div style={{ display: "flex", flexWrap: "wrap" }}>
  <Comment
    authorName={mockData.authorName}
    date={mockData.date}
    comment={mockData.comment}
    comments={mockData.comments}
  />
</div>;
```
