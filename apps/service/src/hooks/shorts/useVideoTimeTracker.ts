import { useEffect, useState } from "react";
import {
  addVideoEventListener,
  removeVideoEventListener,
} from "./videoEventBus";

export function useVideoTimeTracker(
  videoRef: React.RefObject<HTMLVideoElement | null>
) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const updateDuration = () => {
      const video = videoRef.current;
      if (!video) return;

      const { seekable } = video;
      if (seekable.length > 0) {
        const end = seekable.end(seekable.length - 1);
        setDuration(Math.floor(end));
      }
    };

    const handleTimeUpdate = (e: Event) => {
      const target = e.target as HTMLVideoElement;
      setCurrentTime(target.currentTime);
      updateDuration();
    };

    const handleLoadedMetadata = () => {
      updateDuration();
    };

    addVideoEventListener("timeupdate", handleTimeUpdate);
    addVideoEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      removeVideoEventListener("timeupdate", handleTimeUpdate);
      removeVideoEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [videoRef]);

  return { currentTime, duration };
}
