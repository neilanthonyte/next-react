import * as _ from "lodash";

interface IArticleSection {
  title: string;
  anchorId?: string | null;
  fields: any[];
}

const emptySection: IArticleSection = {
  title: "",
  anchorId: null,
  fields: [],
};

const newSection = () => _.cloneDeep(emptySection);
const isEmptySection = (sections: any) =>
  _.isEqual(_.last(sections), emptySection);

export const contentToSections = (fields: any) => {
  // start with an empty section
  const sections = [newSection()];
  // map trough fields
  fields.map((f: any) => {
    // check if field is a heading
    if (f.type === "heading") {
      // if the last section is not empty, create a new one
      if (!isEmptySection(sections)) {
        sections.push(newSection());
      }
      // set section title and anchor
      _.last(sections).title = f.content;
      _.last(sections).anchorId = f.anchorId || _.kebabCase(f.content);
    } else {
      // if not a heading, add field to section
      _.last(sections).fields.push(f);
    }
  });
  return sections;
};
