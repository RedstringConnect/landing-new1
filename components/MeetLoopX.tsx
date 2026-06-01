import React from "react";
import { FeatureScreen1 } from "./FeatureScreen1";

const features = [
  "AI-powered candidate sourcing across 50+ platforms",
  "Smart screening with custom evaluation criteria",
  "Automated interview scheduling and follow-ups",
  "Real-time collaboration with your hiring team",
  "Deep analytics on pipeline health and velocity",
  "One-click job posting to multiple boards",
];

export function MeetLoopX() {
  return (
    <section className="py-[120px] flex flex-col lg:flex-row items-center gap-[80px] max-w-[1280px] mx-auto px-6 lg:px-8" id="loopx">
      <div className="flex-1 flex flex-col gap-[48px] max-w-[520px]">
        <div className="flex flex-col gap-[12px]">
          <span
            className="text-[13px] uppercase tracking-[2px] text-[#875bf7] font-[500]"
            style={{ fontFeatureSettings: "'case', 'cv01', 'cv08', 'cv09', 'cv11', 'cv13'" }}
          >
            Introducing
          </span>
          <h2
            className="font-[540] font-denton text-foreground text-[36px] md:text-[44px] lg:text-[48px] leading-[1.1]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Meet LoopX
          </h2>
        </div>

        <div className="flex flex-col gap-[16px]">
          {features.map((feature, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="mt-[6px] flex-shrink-0 w-[18px] h-[18px] rounded-full bg-[#875bf7]/20 text-[#875bf7] flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p
                className="text-[15px] text-muted-foreground leading-relaxed"
                style={{ fontFeatureSettings: "'case', 'cv01', 'cv08', 'cv09', 'cv11', 'cv13'" }}
              >
                {feature}
              </p>
            </div>
          ))}
        </div>

        <a
          href="#"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-[14px] font-[500] hover:bg-primary/90 transition-colors w-fit shadow-md hover:shadow-lg"
          style={{ fontFeatureSettings: "'case', 'cv01', 'cv08', 'cv09', 'cv11', 'cv13'" }}
        >
          Explore LoopX
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>

      <div className="flex-1 w-full max-w-[720px]">
        <FeatureScreen1 />
      </div>
    </section>
  );
}
