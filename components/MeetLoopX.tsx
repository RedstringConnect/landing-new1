import React from "react";
import { FeatureScreen1 } from "./FeatureScreen1";
import { ArrowRightIcon } from "./ui/icons";

const features = [
  "AI-powered candidate sourcing",
  "Smart screening with custom evaluation criteria",
  "Real-time collaboration with your hiring team",
  "Deep analytics on pipeline health and velocity",
];

export function MeetLoopX() {
  return (
    <section className="py-[120px] flex flex-col lg:flex-row items-center gap-[80px] max-w-7xl mx-auto px-6" id="loopx">
      <div className="flex-1 flex flex-col gap-[48px] max-w-[520px]">
        <div className="flex flex-col gap-[12px]">
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
              <div className="mt-[6px] shrink-0 w-[18px] h-[18px] rounded-full bg-primary/20 text-primary flex items-center justify-center">
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
          Explore LoopX <ArrowRightIcon/>
        </a>
      </div>

      <div className="flex-1 w-full max-w-[720px]">
        <FeatureScreen1 />
      </div>
    </section>
  );
}
