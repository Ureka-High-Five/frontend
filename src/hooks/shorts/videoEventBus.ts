export type VideoEventType =
  | "play"
  | "pause"
  | "seeking"
  | "seeked"
  | "loadedmetadata"
  | "timeupdate";

type VideoEventListener = (e: Event) => void;

const listeners: { [K in VideoEventType]: Set<VideoEventListener> } = {
  play: new Set(),
  pause: new Set(),
  seeking: new Set(),
  seeked: new Set(),
  loadedmetadata: new Set(),
  timeupdate: new Set(),
};

export function addVideoEventListener(
  type: VideoEventType,
  cb: VideoEventListener
) {
  listeners[type].add(cb);
}

export function removeVideoEventListener(
  type: VideoEventType,
  cb: VideoEventListener
) {
  listeners[type].delete(cb);
}

export function emitVideoEvent(type: VideoEventType, e: Event) {
  // eslint-disable-next-line no-restricted-syntax
  for (const cb of listeners[type]) {
    cb(e);
  }
}
