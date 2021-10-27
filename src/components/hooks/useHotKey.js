import { useRef, useCallback } from "react";
import hotkeys from "hotkeys-js";

const useHotKey = (keys, scope = "all", _callback) => {
  const callbackRef = useRef();

  // hotkeys-js persists the callback function
  // so we need to unbind the previous callback to ensure that our callback is latest one
  // we use useRef to keep track of the old one in order to unbind it in the next render
  if (callbackRef.current) {
    hotkeys.unbind(keys, scope, callbackRef.current);
  }
  callbackRef.current = (event) => {
    event.preventDefault();
    _callback();
  };
  hotkeys(keys, scope, callbackRef.current);

  const enableHotKey = useCallback(
    () => {
      hotkeys.setScope(scope);
    },
    [keys] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const disableHotKey = useCallback(
    () => {
      hotkeys.setScope("all");
    },
    [keys] // eslint-disable-line react-hooks/exhaustive-deps
  );

  return [enableHotKey, disableHotKey];
};

export { useHotKey };
