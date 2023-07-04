import * as React from "react";

import { TDialogSizes } from "next-shared/src/types/dialogs";
import { Modal, ModalBody, ModalHeader } from "../../structure/Modal";
import { Caption } from "../Caption";
import { Img } from "../Img";

interface IImageModalProps {
  src?: string;
  alt?: string;
  onClose: () => void;
}

export const ImageModal: React.FC<IImageModalProps> = ({
  src,
  alt,
  onClose,
}) => {
  return (
    <Modal onClose={onClose} open={!!src} size={TDialogSizes.Medium}>
      <ModalHeader>&nbsp;</ModalHeader>
      <ModalBody>
        {!!src && <Img fullwidth={true} src={src} />}
        {!!alt && <Caption title={alt} />}
      </ModalBody>
    </Modal>
  );
};
