"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";

export function FooterBookDemo() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "loopx-demo" });
      cal("ui", {
        cssVarsPerTheme: {
          light: { "cal-brand": "#ed0004" },
          dark: { "cal-brand": "#ed0004" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <button
      data-cal-namespace="loopx-demo"
      data-cal-link="redstring/loopx-demo"
      data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true","theme":"auto"}'
      className="border border-border rounded-lg px-8 py-2.5 flex items-center gap-3 hover:bg-muted transition-colors font-medium text-lg cursor-pointer"
    >
      Book A demo 
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 17L17 7" />
        <path d="M7 7h10v10" />
      </svg>
    </button>
  );
}
