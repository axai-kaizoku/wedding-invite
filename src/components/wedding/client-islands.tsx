"use client";

import dynamic from "next/dynamic";

/** Heavy / decorative / below-the-fold client code, split out of the first bundle. */
export const Effects = dynamic(() => import("./effects"), { ssr: false });
export const Album = dynamic(() => import("./album").then((m) => m.Album), {
  ssr: false,
  loading: () => <div className="section min-h-[600px]" aria-hidden="true" />,
});
