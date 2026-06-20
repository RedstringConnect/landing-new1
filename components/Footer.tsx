import React from "react";
import Logo from "./logo";

const footerLinks = {
  Product: ["LoopX", "Hiring Tools", "Screening AI", "Analytics", "Integrations"],
  Company: ["About", "Blog", "Careers", "Press", "Contact"],
  Resources: ["Documentation", "API Reference", "Changelog", "Status", "Support"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR"],
};

export function Footer() {
  return (
    <footer className="border-t border-border pt-[80px]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 flex flex-col h-full">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-24">
          <div className="flex-shrink-0">
            <Logo className="h-[28px] w-auto text-foreground" />
          </div>

          <div className="grid grid-cols-2 gap-x-[100px] gap-y-12">
            <div className="flex flex-col gap-6">
              <a href="#" className="text-[16px] text-foreground hover:text-primary transition-colors">Home</a>
              <a href="#" className="text-[16px] text-foreground hover:text-primary transition-colors">Templates</a>
              <a href="#" className="text-[16px] text-foreground hover:text-primary transition-colors">Tools</a>
              <a href="#" className="text-[16px] text-foreground hover:text-primary transition-colors">Blog</a>
              <a href="#" className="text-[16px] text-foreground hover:text-primary transition-colors">Contact</a>
            </div>
            <div className="flex flex-col gap-6">
              <a href="#" className="text-[16px] text-foreground hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="text-[16px] text-foreground hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="text-[16px] text-foreground hover:text-primary transition-colors">Cookie Policy</a>
              <a href="#" className="text-[16px] text-foreground hover:text-primary transition-colors">Twitter</a>
              <a href="#" className="text-[16px] text-foreground hover:text-primary transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>

        {/* <div className="mt-auto w-full flex h-max justify-center overflow-hidden">
          <h2 
            className="text-[clamp(1vw,15vw,280px)] font-bold text-foreground leading-none tracking-tight select-none w-full text-center"
          >
            Redstring
          </h2>
        </div> */}
      </div>
    </footer>
  );
}
