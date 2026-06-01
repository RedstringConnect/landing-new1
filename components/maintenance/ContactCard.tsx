import React from "react";

interface ContactCardProps {
  title: string;
  description: string;
  value: string;
  href: string;
  icon: React.ReactNode;
}

export const ContactCard = ({ title, description, value, href, icon }: ContactCardProps) => (
  <div className="content-stretch flex flex-[1_0_0] flex-col gap-[0px] items-center min-h-px min-w-px pt-[24px] relative">
    <div className="bg-card border-[0.6px] border-border border-solid content-stretch flex flex-col gap-[32px] items-center pb-[32px] pt-[44px] px-[24px] relative rounded-[20px] shrink-0 w-full hover:opacity-80 transition-opacity cursor-pointer">
      <div className="content-stretch flex flex-col gap-[20px] items-center relative shrink-0 w-full">
        <div className="content-stretch flex flex-col gap-[4px] items-center relative shrink-0 text-center w-full">
          <p
            className="font-sans font-[500] leading-[24px] relative shrink-0 text-foreground text-[16px] w-full"
            style={{ fontFeatureSettings: "'case', 'cv01', 'cv08', 'cv09', 'cv11', 'cv13'" }}
          >
            {title}
          </p>
          <p
            className="font-sans font-[400] leading-[20px] relative shrink-0 text-muted-foreground text-[14px] w-full"
            style={{ fontFeatureSettings: "'case', 'cv01', 'cv08', 'cv09', 'cv11', 'cv13'" }}
          >
            {description}
          </p>
        </div>
        <div className="content-stretch flex gap-[4px] items-center justify-center overflow-clip relative rounded-full shrink-0">
          <a
            href={href}
            className="font-sans font-[600] leading-[20px] relative shrink-0 text-primary text-[14px] whitespace-nowrap hover:underline"
            style={{ fontFeatureSettings: "'case', 'cv01', 'cv08', 'cv09', 'cv11', 'cv13'" }}
          >
            {value}
          </a>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute bg-secondary content-stretch flex items-center left-1/2 overflow-clip p-[12px] rounded-[12px] shadow-[0px_0px_0px_0.5px_#26272b] top-[-24.6px]">
        <div className="overflow-clip relative shrink-0 size-[24px]">
          {icon}
        </div>
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#131316]" />
      </div>
    </div>
  </div>
);
