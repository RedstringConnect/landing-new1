"use client";

import React from "react";
import { FeatureSidebar } from "./FeatureSidebar";
interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
  color?: string;
}
export const CheckmarkCircleIcon: React.FC<IconProps> = ({ size = 12, className, ...props }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 12 12"
        fill="none"
        className={className}
        {...props}
    >
        <g clipPath="url(#clip0_checkmark_circle)">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6 11.375C3.03147 11.375 0.625 8.96855 0.625 6C0.625 3.03147 3.03147 0.625 6 0.625C8.96855 0.625 11.375 3.03147 11.375 6C11.375 8.96855 8.96855 11.375 6 11.375ZM8.24 4.68878C8.48225 4.55628 8.57125 4.25247 8.43875 4.01019C8.30625 3.76791 8.00245 3.67891 7.7602 3.81141C6.84585 4.31143 6.0898 5.27645 5.58145 6.0548C5.3936 6.3425 5.2331 6.61485 5.1047 6.84555C4.98492 6.72935 4.86629 6.6285 4.76019 6.5446C4.62135 6.43485 4.49641 6.34825 4.40531 6.2886L4.2478 6.19075C4.00793 6.05395 3.70256 6.1375 3.56576 6.3774C3.42898 6.6172 3.51247 6.92245 3.75221 7.05935L3.85736 7.1251C3.92876 7.17185 4.02882 7.24115 4.13999 7.32905C4.36877 7.5099 4.61563 7.747 4.77099 8.00675C4.86633 8.16615 5.0422 8.25955 5.22765 8.24935C5.41305 8.2391 5.57755 8.1268 5.6548 7.95795L5.70395 7.85525C5.7378 7.78605 5.7885 7.68485 5.8545 7.5602C5.98675 7.31035 6.17905 6.9686 6.4187 6.6016C6.9104 5.84875 7.5543 5.06375 8.24 4.68878Z"
                fill="currentColor"
            />
        </g>
        <defs>
            <clipPath id="clip0_checkmark_circle">
                <rect width="12" height="12" fill="white" />
            </clipPath>
        </defs>
    </svg>
);
export const ArrowRightIcon: React.FC<IconProps> = ({ size = 18, className, ...props }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 18 18"
        fill="none"
        className={className}
        {...props}
    >
        <path d="M3.75 8.25023C3.33578 8.25023 3 8.586 3 9.00023C3.00005 9.41438 3.33582 9.75023 3.75 9.75023H12.9455C12.5597 10.1804 12.0434 10.6643 11.5085 11.1287C10.9592 11.6056 10.4073 12.048 9.99172 12.3723C9.78442 12.5341 9.36645 12.8542 9.24608 12.9451C8.96438 13.2002 8.9157 13.6322 9.14572 13.9448C9.39135 14.2782 9.86107 14.3498 10.1946 14.1045C10.3203 14.0096 10.7001 13.7225 10.9145 13.5552C11.3427 13.2211 11.9158 12.7607 12.4915 12.261C13.0633 11.7645 13.6545 11.2141 14.1086 10.7002C14.3349 10.4441 14.5434 10.1797 14.6989 9.9216C14.8422 9.68408 15 9.3573 15 9.00023L14.9927 8.8677C14.9605 8.56298 14.8242 8.28735 14.6989 8.0796C14.5434 7.82145 14.3349 7.5564 14.1086 7.30028C13.6546 6.78636 13.0633 6.23597 12.4915 5.7395C11.9158 5.23976 11.3427 4.77943 10.9145 4.4453C10.7001 4.27796 10.3203 3.99095 10.1946 3.89599C9.86107 3.65063 9.39202 3.72227 9.14647 4.05566C8.91622 4.36836 8.9643 4.80023 9.24608 5.05541C9.24608 5.05541 9.43132 5.19822 9.49148 5.24364C9.61177 5.33455 9.78442 5.4664 9.99172 5.62817C10.4073 5.95249 10.9592 6.39487 11.5085 6.87182C12.0434 7.33623 12.5597 7.8201 12.9455 8.25023H3.75Z" fill="white" />
    </svg>
);
const chips = [
  { label: "Location", done: true },
  { label: "Job title", done: true },
  { label: "Years of experience", done: false },
  { label: "Expected salary", done: false },
  { label: "Skills", done: false },
  { label: "Industry", done: false },
];

export function FeatureScreen1() {
  return (
    <div
      className="dark bg-background content-stretch flex flex-[1_0_0] h-[687px] items-start p-[3.164px] relative rounded-[25.309px] shadow-[0px_9.491px_12.655px_0px_rgba(255,255,255,0),0px_3.164px_4.746px_0px_rgba(255,255,255,0),0px_1.582px_1.582px_0px_rgba(255,255,255,0)] w-full"
      data-name="1921 Inner shadow"
    >
      <div
        className="bg-background border-[1.582px] border-border border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[18.982px]"
        data-name="Mockup wrapper"
      >
        <div
          className="bg-background content-stretch flex isolate items-start overflow-clip p-[11.237px] relative w-[1011.345px]"
          data-name="1440px"
        >
          <div
            className="bg-card border-[0.702px] border-border border-solid content-stretch flex h-[631.581px] isolate items-start overflow-clip pl-[11.228px] relative rounded-[16px] z-[1] w-full"
            data-name="Default"
          >
            <FeatureSidebar />
            <div
              className="bg-background content-stretch flex flex-[1_0_0] flex-col gap-[14.035px] h-[622.46px] items-center justify-center min-w-px overflow-clip p-[22.456px] relative rounded-[11.228px] z-[1]"
              data-name="Main UI"
            >
              <div
                className="absolute content-stretch flex flex-col gap-[4.211px] items-center justify-center left-[193.84px] top-[197.68px] whitespace-nowrap"
                data-node-id="7620:183389"
              >
                <p
                  className="font-[540] font-denton leading-[26.667px] relative shrink-0 text-foreground text-[21.053px]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  LoopX Forms
                </p>
                <p
                  className="font-normal font-sans leading-[14.035px] relative shrink-0 text-muted-foreground text-[9.825px] text-center"
                  style={{ fontFeatureSettings: "'case', 'cv01', 'cv08', 'cv09', 'cv11', 'cv13'" }}
                >
                  What would you like to create?
                </p>
              </div>
              <div
                className="absolute content-stretch flex flex-col gap-[22.456px] items-center justify-center left-[186.82px] max-w-[449.124px] top-[267.18px] w-[449.124px]"
                data-node-id="7620:183395"
              >
                <div
                  className="content-stretch flex flex-col isolate items-center justify-center max-w-[449.124px] pb-[14.035px] relative shadow-[0px_0px_32.983px_0px_rgba(135,91,247,0.1)] shrink-0 w-[449.124px]"
                  data-name="Form Search AI"
                  data-node-id="7620:183396"
                >
                  <div
                    className="bg-secondary border-[0.351px] border-border border-solid content-stretch flex flex-col gap-[8.421px] items-end justify-end max-w-full mb-[-14.035px] overflow-clip p-[11.228px] relative rounded-[14.035px] shrink-0 w-[449.124px] z-[2]"
                    data-name="Search/Active"
                    data-node-id="7620:183397"
                  >
                    <div
                      className="content-stretch flex h-[33.684px] items-start justify-center relative shrink-0 w-[426.668px]"
                      data-node-id="7620:183398"
                    >
                      <div
                        className="content-stretch flex flex-[1_0_0] items-center min-w-px relative"
                        data-node-id="7620:183399"
                      >
                        <p
                          className="flex-[1_0_0] font-sans font-[500] leading-[16.842px] min-w-px relative text-foreground text-[11.23px]"
                          style={{ fontFeatureSettings: "'case', 'cv01', 'cv08', 'cv09', 'cv11', 'cv13'" }}
                        >
                          Generate a form for a Senior UX Designer with 10+ years of experience and a minimum salary expectation of ₹1,500,000 from Chennai
                        </p>
                      </div>
                    </div>
                    <div
                      className="content-stretch flex items-center justify-end relative shrink-0 w-[426.668px]"
                      data-node-id="7620:183401"
                    >
                      <div
                        className="content-stretch flex items-start justify-end relative shrink-0"
                        data-node-id="7620:183402"
                      >
                        <div
                          className="bg-[#875bf7] content-stretch flex items-center justify-center overflow-clip p-[4.211px] relative rounded-[5.614px] shrink-0 cursor-pointer"
                          data-node-id="7620:183403"
                        >
                          <ArrowRightIcon size={12.632} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="backdrop-blur-[28.07px] bg-[rgba(26,26,30,0.4)] border-[0.351px] border-border border-solid content-stretch flex flex-col items-start mb-[-14.035px] pb-[11.228px] pt-[25.263px] px-[11.228px] relative rounded-bl-[11.228px] rounded-br-[11.228px] shrink-0 w-full z-[1]"
                    data-name="Filters"
                    data-node-id="7620:183406"
                  >
                    <div
                      className="content-stretch flex gap-[8.421px] items-center justify-center relative shrink-0 w-full flex-wrap"
                      data-node-id="7620:183407"
                    >
                      {chips.map((chip, i) => (
                        <div
                          key={i}
                          className={`content-stretch flex gap-[2.807px] items-center pl-[4.211px] pr-[5.614px] py-[1.404px] relative rounded-[5.614px] shrink-0 border-[0.351px] ${
                            chip.done ? "bg-[#172820] border-[#315f45]" : "border-border"
                          }`}
                        >
                          <CheckmarkCircleIcon size={11.228} className={chip.done ? "text-[#caf7da]" : "text-foreground"} />
                          <p
                            className={`font-sans font-[500] leading-[14.035px] relative shrink-0 text-[9.82px] text-center whitespace-nowrap ${
                              chip.done ? "text-[#caf7da]" : "text-foreground"
                            }`}
                            style={{ fontFeatureSettings: "'case', 'cv01', 'cv08', 'cv09', 'cv11', 'cv13'" }}
                          >
                            {chip.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <button
                  className="bg-secondary border-[0.351px] border-border border-solid content-stretch cursor-pointer flex gap-[2.807px] items-center justify-center overflow-clip px-[9.825px] py-[7.018px] relative rounded-[8.421px] shrink-0"
                  data-node-id="7620:183418"
                >
                  <p
                    className="font-sans font-[600] leading-[14.035px] relative shrink-0 text-[#875bf7] text-[9.82px] whitespace-nowrap"
                    style={{ fontFeatureSettings: "'case', 'cv01', 'cv08', 'cv09', 'cv11', 'cv13'" }}
                  >
                    Start from scratch
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
