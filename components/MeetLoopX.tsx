import React from "react";
import Link from "next/link";
import { FeatureScreen1 } from "./FeatureScreen1";
import { ArrowRightIcon } from "./ui/icons";

const features = [
  "Generates hiring forms instantly with a prompt",
  "Matches the candidates with the most effective algorithm",
  "OutReach to candidates at scale using our broadcaster",
  "Invite team, Organise Feedback and Data of your hiring pipeline",
];

export function MeetLoopX() {
  return (
    <section className="py-[60px] md:py-[120px] flex flex-col lg:flex-row items-center gap-[32px] md:gap-[80px] w-full max-w-none md:max-w-7xl mx-auto px-6 md:px-6" id="loopx">
      <div className="flex-1 flex flex-col gap-[24px] md:gap-[48px] max-w-[520px] min-w-0">
        <div className="flex flex-col gap-[6px] md:gap-[12px]">
          <span className="text-primary font-[600] text-[13px] md:text-[16px] tracking-wide" style={{ fontFeatureSettings: "'case', 'cv01', 'cv08', 'cv09', 'cv11', 'cv13'" }}>
            Meet LoopX
          </span>
          <h2
            className="font-[540] font-denton text-foreground text-[22px] md:text-[44px] lg:text-[48px] leading-[1.1]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Your Personalized hiring tool that fits in your hiring pipeline
          </h2>
        </div>

        <div className="flex flex-col gap-[12px] md:gap-[16px]">
          {features.map((feature, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="mt-[6px] shrink-0 w-[16px] h-[16px] md:w-[18px] md:h-[18px] rounded-full bg-primary/20 text-primary flex items-center justify-center">
                <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p
                className="text-[13px] md:text-[15px] text-muted-foreground leading-relaxed"
                style={{ fontFeatureSettings: "'case', 'cv01', 'cv08', 'cv09', 'cv11', 'cv13'" }}
              >
                {feature}
              </p>
            </div>
          ))}
        </div>

        <Link
          href="https://loopx.redstring.co.in"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-[14px] font-[500] hover:bg-primary/90 transition-colors w-fit shadow-md hover:shadow-lg"
          style={{ fontFeatureSettings: "'case', 'cv01', 'cv08', 'cv09', 'cv11', 'cv13'" }}
        >
          Explore LoopX <ArrowRightIcon/>
        </Link>
      </div>

      <div className="w-full lg:flex-1 max-w-[720px] overflow-hidden h-[280px] md:h-auto">
        <FeatureScreen1 />
      </div>
    </section>
  );
}
