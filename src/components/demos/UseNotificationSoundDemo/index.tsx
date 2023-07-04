import * as React from "react";
import { useNotificationSound } from "../../../hooks/useNotificationSound";
import { Button } from "../../generic/Button";
import * as sound1 from "./demo-sounds/sound-1.mp3";
import * as sound2 from "./demo-sounds/sound-2.mp3";

export const UseNotificationSoundDemo: React.FC = () => {
  const playNotificationSound1 = useNotificationSound(sound1);
  const playNotificationSound2 = useNotificationSound(sound2);

  return (
    <div>
      <Button onClick={playNotificationSound1}>Sound 1</Button>
      <Button onClick={playNotificationSound2}>Sound 2</Button>
    </div>
  );
};

export const NotificationSoundDemoUnmount: React.FC = () => {
  const [mount, setMount] = React.useState(false);
  return (
    <div>
      <Button
        onClick={() => {
          setMount(false);
        }}
      >
        Unmount
      </Button>
      <Button
        onClick={() => {
          setMount(true);
        }}
      >
        Mount
      </Button>
      {mount && <UseNotificationSoundDemo />}
    </div>
  );
};
