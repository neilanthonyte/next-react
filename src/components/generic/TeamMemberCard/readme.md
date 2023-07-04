### Standard usage

```jsx
import { TeamMemberCard } from "./";

const teamMember = {
  title: "Dean Heffernan",
  jobTitle: "Lead Software Developer",
  profileImage: {
    full:
      "https://d1qr34qzhiwpdo.cloudfront.net/team/DEAN-HEFFERNAN.jpg?mtime=20180815153433",
    squareMedium:
      "https://d1qr34qzhiwpdo.cloudfront.net/team/_squareMedium/DEAN-HEFFERNAN.jpg?mtime=20180815153433",
    squareSmall:
      "https://d1qr34qzhiwpdo.cloudfront.net/team/_squareSmall/DEAN-HEFFERNAN.jpg?mtime=20180815153433"
  },
  bioShort:
    '<p><strong><em>"</em><em>I believe in breaking the archaic and clinical approach to healthcare and </em></strong><em><strong>heightening the experience to new levels."</strong></em></p>\n<p>Dean is a lead software developer who loves everything IT related and contributes to all areas in technology with his knowledge and experience.</p>'
};

<TeamMemberCard content={teamMember} />;
```
