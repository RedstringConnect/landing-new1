"use client";

import React from "react";
import { Share2 } from "lucide-react";
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
    <div className="w-[158px] flex flex-col justify-between py-[11px] pr-[11.5px] h-[647px] shrink-0">
      <div className="flex flex-col gap-[14.5px] flex-1">
        {/* Navigation / Header */}
        <div className="flex items-center justify-between pl-2 pt-1">
          <div className="text-white text-[17px] flex items-center gap-[1px]"
          >
            <span className="font-serif">LoopX</span>
          </div>
          <button className="bg-[#1A1A1E] border border-[#26272B] p-1 rounded-md flex items-center justify-center">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-white">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
        </div>

        {/* Projects header */}
        <div className="flex flex-col gap-[14px]">
          <div className="flex flex-col">
            <div className="px-2 pb-1">
              <span className="text-[#70707B] text-[10px] font-medium leading-[14px]">Projects</span>
            </div>
            
            <div className="flex flex-col gap-0.5">
              <div className="bg-[#875BF7] text-white rounded-[7.2px] py-1.5 px-2 flex items-center justify-center gap-[3px] cursor-pointer">
                <span className="text-[10px] font-semibold">Create new form</span>
                <PlusIcon size={11.5} className="shrink-0" />
              </div>

              <div className="flex items-center gap-2 py-1.5 px-2 text-[#A0A0AB] hover:text-white transition-colors cursor-pointer rounded-[10px]">
                <AllWorkspacesIcon size={13} className="shrink-0" />
                <span className="text-[10px] font-medium flex-1 truncate">Workspaces</span>
                <button className="p-1 rounded-[6px] bg-[#1A1A1E] border border-[#26272B] flex items-center justify-center">
                  <PlusIcon size={10} className="text-white shrink-0" />
                </button>
              </div>

              <div className="flex items-center gap-2 py-1.5 px-2 border border-[#1A1A1E] rounded-[10px] cursor-pointer">
                <WorkspaceIcon size={13} className="text-[#A48AFB] shrink-0" />
                <span className="text-[10px] font-medium text-[#A48AFB] flex-1 truncate">UX intern</span>
                <ChevronDownIcon size={11} className="text-[#70707B] shrink-0" />
              </div>

              {/* Sub-items */}
              <div className="flex flex-col pl-[28px] pr-2 gap-0.5 mt-0.5">
                <div className="py-1 rounded-[10px]">
                  <span className="text-[10px] font-medium text-[#A0A0AB] truncate block">Consultant in London...</span>
                </div>
                <div className="bg-[#0E0E10] py-1 px-2 rounded-[10px] -ml-2 w-[calc(100%+8px)]">
                  <span className="text-[10px] font-medium text-white truncate block">Marketing Manager...</span>
                </div>
                <div className="py-1 rounded-[10px]">
                  <span className="text-[10px] font-medium text-[#A0A0AB] truncate block">+1</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full h-[1px] bg-[#26272B]" />

          {/* General header */}
          <div className="flex flex-col">
            <div className="px-2 pb-1">
              <span className="text-[#70707B] text-[10px] font-medium leading-[14px]">General</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2 py-1.5 px-2 text-[#A0A0AB] hover:text-white cursor-pointer rounded-[10px]">
                <ShortlistNavIcon size={13} className="shrink-0" />
                <span className="text-[10px] font-medium flex-1 truncate">Shortlist</span>
                <div className="bg-[#172820] border border-[#315F45] text-[#CAF7DA] text-[8.6px] font-medium px-1.5 py-[1px] rounded-[6px]">
                  10
                </div>
                <ChevronDownIcon size={11.5} className="shrink-0" />
              </div>

              <div className="flex items-center gap-2 py-1.5 px-2 text-[#A0A0AB] hover:text-white cursor-pointer rounded-[10px]">
                <MessagingIcon size={13} className="shrink-0" />
                <span className="text-[10px] font-medium flex-1 truncate">Messages</span>
                <div className="bg-[#172820] border border-[#315F45] text-[#CAF7DA] text-[8.6px] font-medium px-1.5 py-[1px] rounded-[6px]">
                  10
                </div>
              </div>

              <div className="flex items-center gap-2 py-1.5 px-2 text-[#A0A0AB] hover:text-white cursor-pointer rounded-[10px]">
                <EmailAutomationIcon size={13} className="shrink-0" />
                <span className="text-[10px] font-medium truncate">Email Automation</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Profile Settings */}
      <div className="flex flex-col pt-3 border-t border-[#26272B]">
        <div className="flex items-center gap-2 py-1.5 px-2 text-[#A0A0AB] hover:text-white cursor-pointer rounded-[10px]">
          <CompanyProfileIcon size={13} className="shrink-0" />
          <span className="text-[10px] font-medium flex-1 truncate">Company Profile</span>
          <Share2 size={11.5} className="shrink-0" />
        </div>
        <div className="flex items-center gap-2 py-1.5 px-2 text-[#A0A0AB] hover:text-white cursor-pointer rounded-[10px]">
          <SettingsIcon size={13} className="shrink-0" />
          <span className="text-[10px] font-medium truncate">Settings</span>
        </div>
      </div>
    </div>
  );
}
