import React from "react";
import { FeatureScreen1 } from "../FeatureScreen1";

export const Mockup = () => {
  return (
    <div className="relative shrink-0 w-full xl:w-[1039.81px] h-[687px] z-[1] origin-top scale-[0.35] sm:scale-50 md:scale-75 lg:scale-90 xl:scale-100 transition-transform duration-300">
      <div className="absolute left-[calc(50%+0.5px)] top-[calc(50%+0.42px)] -translate-x-1/2 -translate-y-1/2 h-[1242px] w-[1673px] opacity-[0.7] blur-[46.153px] z-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 50% 50%, rgba(135,91,247,1) 0%, rgba(101,68,185,0.75) 25%, rgba(68,46,124,0.5) 50%, rgba(34,23,62,0.25) 75%, rgba(0,0,0,0) 100%)",
          backgroundSize: "100% 100%"
        }}
      />
      <div
        className="bg-background border-[0.791px] border-[#22262f] border-solid content-stretch flex h-[687px] items-start p-[3.164px] relative rounded-[25.309px] shadow-[0px_9.491px_12.655px_0px_rgba(255,255,255,0),0px_3.164px_4.746px_0px_rgba(255,255,255,0),0px_1.582px_1.582px_0px_rgba(255,255,255,0)] shrink-0 w-[1039.81px] z-[1]"
        data-name="Mockup wrapper"
      >
         <FeatureScreen1 />
      </div>
    </div>
  );
};
