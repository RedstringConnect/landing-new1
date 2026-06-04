"use client";

import React from "react";
import {
  AllWorkspacesIcon,
  WorkspaceIcon,
  ChevronDownIcon,
  ShortlistNavIcon,
  MessagingIcon,
  EmailAutomationIcon,
  CompanyProfileIcon,
  SettingsIcon,
  PlusIcon,
} from "@/components/ui/icons";

export function FeatureSidebar() {
  return (
    <div className="content-stretch flex h-[631.581px] items-start max-w-[165.61px] pl-[0px] pr-[11.228px] py-[11.228px] relative shrink-0 w-[154.387px] z-[2]">
      <div className="bg-card content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-between min-h-px min-w-px relative rounded-[8.421px] shadow-[0px_0.702px_1.404px_0px_rgba(10,13,18,0.05)]">
        <div className="content-stretch flex flex-[1_0_0] flex-col isolate items-center justify-between min-h-px min-w-px relative w-full">
          <div className="content-stretch flex flex-col gap-[14.035px] items-start relative shrink-0 w-full z-[2]">
            <div className="content-stretch flex flex-col gap-[0px] isolate items-center justify-center pt-[0px] relative shrink-0 w-full">
              <div className="content-stretch flex items-center justify-between pl-[8.421px] pr-[0px] relative shrink-0 w-full z-[1]">
                <div className="content-stretch flex font-[600] font-denton gap-[1.404px] items-center leading-[22.456px] relative shrink-0 text-[16.84px] text-foreground whitespace-nowrap">
                  <p className="relative shrink-0">L</p>
                  <p className="relative shrink-0">oo</p>
                  <p className="relative shrink-0">pX</p>
                </div>
                <button className="bg-secondary border-[0.351px] border-border border-solid content-stretch cursor-pointer flex items-center justify-center overflow-clip p-[4.211px] relative rounded-[5.614px] shrink-0">
                  <div className="overflow-clip relative shrink-0 size-[12.632px] flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-foreground shrink-0">
                      <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </button>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[14.035px] isolate items-start relative shrink-0 w-full">
              <div className="content-stretch flex flex-col isolate items-start relative shrink-0 w-full z-[2]">
                <button className="content-stretch cursor-pointer flex h-[16.842px] items-center pb-[2.807px] px-[8.421px] relative shrink-0 w-full z-[2]">
                  <p
                    className="font-sans font-[500] leading-[14.035px] relative shrink-0 text-muted-foreground text-[9.82px] text-left whitespace-nowrap"
                    style={{ fontFeatureSettings: "'case', 'cv01', 'cv08', 'cv09', 'cv11', 'cv13'" }}
                  >
                    Projects
                  </p>
                  <div className="content-stretch flex items-center opacity-0 pt-[1.404px] relative shrink-0">
                    <div className="overflow-clip relative shrink-0 size-[9.825px]">
                      <ChevronDownIcon size={9.825} />
                    </div>
                  </div>
                </button>
                <div className="content-stretch flex flex-col isolate items-start px-[0px] relative shrink-0 w-full z-[1]">
                  <div className="content-stretch flex items-center overflow-clip pb-[0px] pt-[1.404px] relative shrink-0 w-full z-[5]">
                    <div className="content-stretch flex flex-[1_0_0] gap-[8.421px] items-center min-h-px min-w-px pb-[0px] pt-[5.614px] px-[0px] relative rounded-[10px]">
                      <div className="bg-[#875bf7] content-stretch flex flex-[1_0_0] gap-[2.807px] items-center justify-center min-h-px min-w-px overflow-clip px-[8.421px] py-[5.614px] relative rounded-[7.018px] cursor-pointer">
                        <div className="content-stretch flex items-center justify-center px-[1.404px] relative shrink-0">
                          <p
                            className="font-sans font-[600] leading-[14.035px] relative shrink-0 text-foreground text-[9.82px] whitespace-nowrap"
                            style={{ fontFeatureSettings: "'case', 'cv01', 'cv08', 'cv09', 'cv11', 'cv13'" }}
                          >
                            Create new form
                          </p>
                        </div>
                        <div className="overflow-clip relative shrink-0 size-[11.228px] text-foreground flex items-center justify-center">
                          <PlusIcon size={11.228} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="h-[22.456px] relative shrink-0 w-full z-[4] flex items-center">
                    <div className="w-full border-t-[0.702px] border-border absolute" />
                  </div>
                  <div className="content-stretch flex gap-[2.807px] items-center relative shrink-0 w-full z-[3]">
                    <div className="content-stretch flex flex-[1_0_0] h-[28.07px] items-center min-h-px min-w-px overflow-clip py-[1.404px] relative">
                      <div className="content-stretch flex flex-[1_0_0] gap-[8.421px] items-center min-h-px min-w-px px-[8.421px] py-[5.614px] relative rounded-[10px] cursor-pointer hover:bg-secondary group text-muted-foreground hover:text-foreground transition-colors">
                        <div className="content-stretch flex flex-[1_0_0] gap-[8.421px] items-center min-h-px min-w-px relative">
                          <div className="overflow-clip relative shrink-0 size-[12.632px] flex items-center justify-center">
                            <AllWorkspacesIcon size={12.632} />
                          </div>
                          <p
                            className="flex-[1_0_0] font-sans font-[500] leading-[14.035px] min-h-px min-w-px overflow-hidden relative text-[9.82px] text-ellipsis whitespace-nowrap"
                            style={{ fontFeatureSettings: "'case', 'cv01', 'cv08', 'cv09', 'cv11', 'cv13'" }}
                          >
                            Workspaces
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex gap-[5.614px] items-center relative shrink-0">
                      <div className="bg-secondary border-[0.351px] border-border border-solid content-stretch flex items-center justify-center overflow-clip p-[4.211px] relative rounded-[5.614px] shrink-0 cursor-pointer">
                        <div className="overflow-clip relative shrink-0 size-[12.632px] text-foreground flex items-center justify-center">
                          <PlusIcon size={12.632} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full z-[2]">
                    <div className="content-stretch flex items-center overflow-clip py-[1.404px] relative shrink-0 w-full">
                      <button className="border-[0.702px] border-border border-solid bg-transparent content-stretch cursor-pointer flex flex-[1_0_0] gap-[8.421px] items-center min-h-px min-w-px px-[8.421px] py-[5.614px] relative rounded-[10px]">
                        <div className="content-stretch flex flex-[1_0_0] gap-[8.421px] items-center min-h-px min-w-px relative">
                          <div className="overflow-clip relative shrink-0 size-[12.632px] text-[#875bf7] flex items-center justify-center">
                            <WorkspaceIcon size={12.632} />
                          </div>
                          <p
                            className="flex-[1_0_0] font-sans font-[500] leading-[14.035px] min-h-px min-w-px overflow-hidden relative text-[9.82px] text-[#875bf7] text-ellipsis text-left whitespace-nowrap"
                            style={{ fontFeatureSettings: "'case', 'cv01', 'cv08', 'cv09', 'cv11', 'cv13'" }}
                          >
                            UX intern
                          </p>
                        </div>
                        <div className="overflow-clip relative shrink-0 size-[11.228px] text-muted-foreground flex items-center justify-center">
                          <ChevronDownIcon size={11.228} />
                        </div>
                      </button>
                    </div>
                    <div className="content-stretch flex flex-col items-start pb-[2.807px] relative shrink-0 w-full">
                      <div className="content-stretch flex items-center overflow-clip py-[1.404px] relative shrink-0 w-full">
                        <div className="content-stretch flex flex-[1_0_0] gap-[8.421px] items-center min-h-px min-w-px pl-[28.07px] pr-[8.421px] py-[5.614px] relative rounded-[10px]">
                          <div className="content-stretch flex flex-[1_0_0] gap-[8.421px] items-center min-h-px min-w-px relative">
                            <p
                              className="flex-[1_0_0] font-sans font-[500] leading-[14.035px] min-h-px min-w-px overflow-hidden relative text-[9.82px] text-muted-foreground text-ellipsis whitespace-nowrap"
                              style={{ fontFeatureSettings: "'case', 'cv01', 'cv08', 'cv09', 'cv11', 'cv13'" }}
                            >
                              Consultant in London with 2+ years experience at top consulting firms
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex items-center overflow-clip py-[1.404px] relative shrink-0 w-full">
                        <div className="bg-background content-stretch flex flex-[1_0_0] gap-[8.421px] items-center min-h-px min-w-px pl-[28.07px] pr-[8.421px] py-[5.614px] relative rounded-[10px]">
                          <div className="content-stretch flex flex-[1_0_0] gap-[8.421px] items-center min-h-px min-w-px relative">
                            <p
                              className="flex-[1_0_0] font-sans font-[500] leading-[14.035px] min-h-px min-w-px overflow-hidden relative text-[9.82px] text-foreground text-ellipsis whitespace-nowrap"
                              style={{ fontFeatureSettings: "'case', 'cv01', 'cv08', 'cv09', 'cv11', 'cv13'" }}
                            >
                              Marketing Manager in Europe, German-speaking, working at a large enterprise
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex items-center overflow-clip py-[1.404px] relative shrink-0 w-full">
                        <div className="content-stretch flex flex-[1_0_0] gap-[8.421px] items-center min-h-px min-w-px pl-[28.07px] pr-[8.421px] py-[5.614px] relative rounded-[10px]">
                          <div className="content-stretch flex flex-[1_0_0] gap-[8.421px] items-center min-h-px min-w-px relative">
                            <p
                              className="flex-[1_0_0] font-sans font-[500] leading-[14.035px] min-h-px min-w-px overflow-hidden relative text-[9.82px] text-muted-foreground text-ellipsis whitespace-nowrap"
                              style={{ fontFeatureSettings: "'case', 'cv01', 'cv08', 'cv09', 'cv11', 'cv13'" }}
                            >
                              +1
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="h-[11.228px] relative shrink-0 w-full z-[1] flex items-center">
                    <div className="w-full border-t-[0.702px] border-border absolute" />
                  </div>
                </div>
              </div>
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full z-[1]">
                <button className="content-stretch cursor-pointer flex h-[16.842px] items-center pb-[2.807px] px-[8.421px] relative shrink-0 w-full">
                  <p
                    className="font-sans font-[500] leading-[14.035px] relative shrink-0 text-muted-foreground text-[9.82px] text-left whitespace-nowrap"
                    style={{ fontFeatureSettings: "'case', 'cv01', 'cv08', 'cv09', 'cv11', 'cv13'" }}
                  >
                    General
                  </p>
                </button>
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                  <button className="content-stretch cursor-pointer flex items-start relative shrink-0 w-full group">
                    <div className="content-stretch flex flex-[1_0_0] h-[28.07px] items-center min-h-px min-w-px overflow-clip py-[1.404px] relative text-muted-foreground group-hover:text-foreground transition-colors">
                      <div className="content-stretch flex flex-[1_0_0] gap-[8.421px] items-center min-h-px min-w-px px-[8.421px] py-[5.614px] relative rounded-[10px]">
                        <div className="content-stretch flex flex-[1_0_0] gap-[8.421px] items-center min-h-px min-w-px relative">
                          <div className="overflow-clip relative shrink-0 size-[12.632px] flex items-center justify-center">
                            <ShortlistNavIcon size={12.632} />
                          </div>
                          <p
                            className="flex-[1_0_0] font-sans font-[500] leading-[14.035px] min-h-px min-w-px overflow-hidden relative text-[9.82px] text-ellipsis text-left whitespace-nowrap"
                            style={{ fontFeatureSettings: "'case', 'cv01', 'cv08', 'cv09', 'cv11', 'cv13'" }}
                          >
                            Hiring Pipeline
                          </p>
                        </div>
                        <div className="bg-[#172820] border-[0.351px] border-[#315f45] border-solid content-stretch flex items-center px-[4.211px] py-[1.404px] relative rounded-[5.614px] shrink-0">
                          <p
                            className="font-sans font-[500] leading-[12.632px] relative shrink-0 text-[#caf7da] text-[8.42px] text-center whitespace-nowrap"
                            style={{ fontFeatureSettings: "'case', 'cv01', 'cv08', 'cv09', 'cv11', 'cv13'" }}
                          >
                            10
                          </p>
                        </div>
                        <div className="overflow-clip relative shrink-0 size-[11.228px] flex items-center justify-center">
                          <ChevronDownIcon size={11.228} />
                        </div>
                      </div>
                    </div>
                  </button>
                  <div className="content-stretch flex flex-col items-start px-[0px] relative shrink-0 w-full">
                    <div className="content-stretch flex h-[28.07px] items-center overflow-clip py-[1.404px] relative shrink-0 w-full">
                      <div className="content-stretch flex flex-[1_0_0] gap-[8.421px] items-center min-h-px min-w-px px-[8.421px] py-[5.614px] relative rounded-[10px] cursor-pointer text-muted-foreground hover:text-foreground transition-colors group">
                        <div className="content-stretch flex flex-[1_0_0] gap-[8.421px] items-center min-h-px min-w-px relative">
                          <div className="overflow-clip relative shrink-0 size-[12.632px] flex items-center justify-center">
                            <MessagingIcon size={12.632} />
                          </div>
                          <p
                            className="flex-[1_0_0] font-sans font-[500] leading-[14.035px] min-h-px min-w-px overflow-hidden relative text-[9.82px] text-ellipsis whitespace-nowrap"
                            style={{ fontFeatureSettings: "'case', 'cv01', 'cv08', 'cv09', 'cv11', 'cv13'" }}
                          >
                            Inbox
                          </p>
                        </div>
                        <div className="bg-[#172820] border-[0.351px] border-[#315f45] border-solid content-stretch flex items-center px-[4.211px] py-[1.404px] relative rounded-[5.614px] shrink-0">
                          <p
                            className="font-sans font-[500] leading-[12.632px] relative shrink-0 text-[#caf7da] text-[8.42px] text-center whitespace-nowrap"
                            style={{ fontFeatureSettings: "'case', 'cv01', 'cv08', 'cv09', 'cv11', 'cv13'" }}
                          >
                            10
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-start px-[0px] relative shrink-0 w-full">
                      <div className="content-stretch flex items-center overflow-clip py-[1.404px] relative shrink-0 w-full">
                        <div className="content-stretch flex flex-[1_0_0] gap-[8.421px] items-center min-h-px min-w-px px-[8.421px] py-[5.614px] relative rounded-[10px] cursor-pointer text-muted-foreground hover:text-foreground transition-colors group">
                          <div className="content-stretch flex flex-[1_0_0] gap-[8.421px] items-center min-h-px min-w-px relative">
                            <div className="overflow-clip relative shrink-0 size-[12.632px] flex items-center justify-center">
                              <EmailAutomationIcon size={12.632} />
                            </div>
                            <p
                              className="flex-[1_0_0] font-sans font-[500] leading-[14.035px] min-h-px min-w-px overflow-hidden relative text-[9.82px] text-ellipsis whitespace-nowrap"
                              style={{ fontFeatureSettings: "'case', 'cv01', 'cv08', 'cv09', 'cv11', 'cv13'" }}
                            >
                              Email Broadcasting
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col items-start relative shrink-0 w-full z-[1]">
            <div className="content-stretch flex flex-col items-start px-[0px] relative shrink-0 w-full">
              <div className="content-stretch flex h-[28.07px] items-center overflow-clip py-[1.404px] relative shrink-0 w-full">
                <div className="content-stretch flex flex-[1_0_0] gap-[8.421px] items-center min-h-px min-w-px px-[8.421px] py-[5.614px] relative rounded-[10px] cursor-pointer text-muted-foreground hover:text-foreground transition-colors group">
                  <div className="content-stretch flex flex-[1_0_0] gap-[8.421px] items-center min-h-px min-w-px relative">
                    <div className="overflow-clip relative shrink-0 size-[12.632px] flex items-center justify-center">
                      <CompanyProfileIcon size={12.632} />
                    </div>
                    <p
                      className="flex-[1_0_0] font-sans font-[500] leading-[14.035px] min-h-px min-w-px overflow-hidden relative text-[9.82px] text-ellipsis whitespace-nowrap"
                      style={{ fontFeatureSettings: "'case', 'cv01', 'cv08', 'cv09', 'cv11', 'cv13'" }}
                    >
                      Career Page
                    </p>
                  </div>
                  <div className="overflow-clip relative shrink-0 size-[11.228px] text-muted-foreground flex items-center justify-center group-hover:text-foreground">
                  </div>
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-col items-start px-[0px] relative shrink-0 w-full">
              <div className="content-stretch flex items-center overflow-clip py-[1.404px] relative shrink-0 w-full">
                <div className="content-stretch flex flex-[1_0_0] gap-[8.421px] items-center min-h-px min-w-px px-[8.421px] py-[5.614px] relative rounded-[10px] cursor-pointer text-muted-foreground hover:text-foreground transition-colors group">
                  <div className="content-stretch flex flex-[1_0_0] gap-[8.421px] items-center min-h-px min-w-px relative">
                    <div className="overflow-clip relative shrink-0 size-[12.632px] flex items-center justify-center">
                      <SettingsIcon size={12.632} />
                    </div>
                    <p
                      className="flex-[1_0_0] font-sans font-[500] leading-[14.035px] min-h-px min-w-px overflow-hidden relative text-[9.82px] text-ellipsis whitespace-nowrap"
                      style={{ fontFeatureSettings: "'case', 'cv01', 'cv08', 'cv09', 'cv11', 'cv13'" }}
                    >
                      Settings
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
