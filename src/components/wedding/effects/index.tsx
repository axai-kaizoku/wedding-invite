"use client";

import { useEffect, useState } from "react";
import { useOpened, whenIdle } from "@/lib/opened";
import { Ambient } from "./ambient";
import { Lanterns } from "./lanterns";
import { LoveCursor } from "./love-cursor";
import { LoveToasts } from "./love-toasts";
import { PaperPlane } from "./paper-plane";

/**
 * Everything decorative lives here and is loaded with next/dynamic({ ssr: false }),
 * so it never blocks first paint. It mounts only after the envelope opens and
 * the browser is idle. Reduced-motion users skip the motion layers entirely.
 */
export default function Effects() {
  const opened = useOpened();
  const [ready, setReady] = useState(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    if (!opened) return;
    setReduce(matchMedia("(prefers-reduced-motion: reduce)").matches);
    whenIdle(() => setReady(true));
  }, [opened]);

  if (!ready) return null;
  return (
    <>
      <LoveToasts />
      <Lanterns />
      {!reduce && (
        <>
          <Ambient />
          <PaperPlane />
          <LoveCursor />
        </>
      )}
    </>
  );
}
