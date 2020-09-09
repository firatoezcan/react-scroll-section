import React, { FunctionComponent, useState, useRef, useEffect, useCallback, useMemo } from "react";

const isDOMavailable = !!(typeof window !== "undefined" && window.document && window.document.createElement);

export const useSSR = () => {
  const [inBrowser, setInBrowser] = useState(isDOMavailable);

  useEffect(() => {
    setInBrowser(isDOMavailable);
    return () => {
      setInBrowser(false);
    };
  }, []);

  const useSSRObject = useMemo(
    () => ({
      isBrowser: inBrowser,
      isServer: !inBrowser,
      canUseWorkers: typeof Worker !== "undefined",
      canUseEventListeners: inBrowser && !!window.addEventListener,
      canUseViewport: inBrowser && !!window.screen,
    }),
    [inBrowser]
  );

  return useMemo(() => Object.assign(Object.values(useSSRObject), useSSRObject), [inBrowser]);
};
