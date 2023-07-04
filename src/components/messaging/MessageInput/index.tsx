import * as React from "react";
import { useMemo, useState } from "react";

import { EStandardSizes } from "next-shared/src/types/standardSizes";
import { TColorVariants } from "next-shared/src/types/TColorVariants";
import { IMessageAddItemOption } from "next-shared/src/types/messaging";

import { TextInput } from "../../inputs/TextInput";
import { Icon } from "../../generic/Icon";
import { Popover } from "../../generic/Popover";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "MessageInput");

export interface IMessageInputProps {
  onSubmit: (value: string) => void | Promise<void>;
  addItemOptions?: IMessageAddItemOption[];
}

/**
 * Wrapper component rendering a text input with custom submit button and actions
 */
export const MessageInput: React.FC<IMessageInputProps> = ({
  addItemOptions: addItemActions = [],
  onSubmit,
}) => {
  const [message, setMessage] = useState<string>("");
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const handleOnSubmit = async () => {
    if (!message.trim().length) return;
    await onSubmit(message);
    setMessage("");
  };

  const target = useMemo(() => {
    return (
      <div className={css("item")} data-test="add-item-btn">
        <Icon
          name="circle-plus"
          size={EStandardSizes.ExtraSmall}
          variant={TColorVariants.Active}
          onClick={() => setShowPopup(true)}
        />
      </div>
    );
  }, []);

  const handleOnAddItemClick = (action: IMessageAddItemOption) => {
    action.onClick();
    setShowPopup(false);
  };

  return (
    <div className={css("")} data-test="message-input">
      <div className={css("item", "input")} data-test="input">
        <TextInput
          placeholder="Type a message"
          value={message}
          onInputChange={setMessage}
        />
      </div>

      <div className={css("item")} data-test="submit">
        <Icon
          name="play" // TODO replace with new icon when Icomoon bill is paid
          size={EStandardSizes.ExtraSmall}
          onClick={handleOnSubmit}
          variant={
            message.trim().length
              ? TColorVariants.Active
              : TColorVariants.Disabled
          }
        />
      </div>

      {addItemActions.length > 0 && (
        <Popover
          target={target}
          open={showPopup}
          closeHandler={() => setShowPopup(false)}
        >
          {addItemActions.map((action, index) => (
            <div
              key={index}
              onClick={() => handleOnAddItemClick(action)}
              className={css("action")}
              data-test={`add-item-option`}
            >
              {!!action.icon && (
                <Icon
                  className={css("action_icon")}
                  name={action.icon}
                  variant={TColorVariants.Primary}
                />
              )}
              {action.label}
            </div>
          ))}
        </Popover>
      )}
    </div>
  );
};
