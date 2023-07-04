import * as React from "react";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles);

export interface IPersonProps {
  name: string;
  title?: string;
  description?: string;
  isFeatured?: boolean;
  imageUrl: string;
}

/**
 * Displays a person.
 * TODO - convert to using Card/Cells and other standard elements
 * @param param0
 */
export const Person: React.FC<IPersonProps> = ({
  name,
  title,
  description,
  isFeatured = false,
  imageUrl,
}) => (
  <div className={css("person", { "-featured": isFeatured })}>
    <div
      className={styles.person_decoration}
      style={{
        backgroundImage: `url(${isFeatured ? imageUrl : ""})`,
      }}
    >
      {!isFeatured && <img src={imageUrl} alt={`Photo of ${name}`} />}
    </div>
    <div className={styles.person_body}>
      <header>
        <h3>{name}</h3>
        <h4 className={styles["-sub"]}>{title}</h4>
      </header>
      {description}
    </div>
  </div>
);

export const PersonList: React.FC = ({ children }) => (
  <div className={css("personList")}>
    {React.Children.toArray(children).map((c, i) => (
      <div key={i} className={css("personList_item")}>
        {c}
      </div>
    ))}
  </div>
);
