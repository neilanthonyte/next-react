import { useCallback, useEffect, useRef } from "react";

export function useNotificationSound(audioUrl: string) {
  // creates a HTML audio element & mounts in the body
  // one audio element per file, this allows multiple sounds to be loaded & ready to go
  const htmlAudioElm = useRef<HTMLAudioElement>();

  useEffect(() => {
    // render audio component on mount
    htmlAudioElm.current = document.createElement("audio");
    htmlAudioElm.current.src = audioUrl;
    htmlAudioElm.current.style.display = "none";
    document.body.appendChild(htmlAudioElm.current);
    // htmlAudioElm.current.play().catch(console.error);

    // remove audio component on unmount
    return () => {
      document.body.removeChild(htmlAudioElm.current);
    };
  }, []);

  const playSound = useCallback(() => {
    htmlAudioElm.current.currentTime = 0; // take play head back to the beginning
    htmlAudioElm.current.play().catch(console.error);
  }, []);

  return playSound;
}
