import * as React from "react";
import {
  RichContentEditor,
  IRichContentEditorProps,
} from "../../generic/RichContentEditor";

/**
 * WYSIWYG editor
 *
 * Responds to changes in value, and calls onInputChange with a debounce if any changes occur in the editor.
 *
 * @link for more info regarding the redactorConfig, see https://imperavi.com/redactor/docs/settings
 */
export const RichContentEditorInput: React.FC<IRichContentEditorProps> = (
  props,
) => {
  return (
    <div data-test="editor">
      <RichContentEditor {...props} />
    </div>
  );
};
