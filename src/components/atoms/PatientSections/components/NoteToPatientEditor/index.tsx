import * as React from "react";
import { useState } from "react";

import { IFormSchema } from "next-shared/src/types/formTypes";
import { useClient } from "../../../../../hooks/useClient";
import { Form } from "../../../../forms/Form";
import { useSyncedSessionData } from "../../../../../hooks/core/useSyncedSessionData";
import { useCreateInstructionAction } from "next-react/src/hooks/actions/useCreateInstructionAction";

const noteSchema: IFormSchema = [
  {
    type: "text",
    allowNewlines: true,
    map: "note",
    placeholder: "Write a note...",
  },
];
export interface INoteToPatientState {
  noteInstance: number;
}

export const NoteToPatientEditor = ({
  onSuccess,
}: {
  onSuccess?: () => void;
}) => {
  const nextClient = useClient();
  const [noteInstance, setNoteInstance] = useState(1);
  const { scope } = useSyncedSessionData();

  // take the staff member from the session or scope
  const staffId =
    scope?.staffMemberId || nextClient.auth.session?.staffMemberId;

  /** Called when the create action was successful */
  const handleCreateSuccess = () => {
    setNoteInstance(noteInstance + 1);
    if (onSuccess) {
      onSuccess();
    }
  };

  const { nextPatient } = useSyncedSessionData();
  const { createInstructionAction } =
    useCreateInstructionAction(handleCreateSuccess);

  const createNote = (note: string) => {
    if (!nextPatient?.patientId && !staffId) {
      return;
    }

    createInstructionAction({
      subjectId: nextPatient.patientId,
      authorId: staffId || nextPatient.patientId,
      ownerId: nextPatient.patientId,
      title: "Note to patient",
      data: {
        message: note,
      },
    });
  };

  return (
    <Form
      key={`note-${noteInstance}`}
      schema={noteSchema}
      onSuccess={(data: { note: string }) => createNote(data.note)}
    />
  );
};
