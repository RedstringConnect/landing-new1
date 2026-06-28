import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "./logo";
import { FooterBookDemo } from "./FooterBookDemo";
import { NewsletterForm } from "./NewsletterForm";

const backedByLogos = [
  { url: "/backedby/tie.png", name: "TiE", className: "bg-white border-[1px] border-gray-400 p-[2px] object-contain" },
  { url: "/backedby/iiml.png", name: "IIML Incubator", className: "bg-black p-[2px] object-contain dark:invert" },
  { url: "/backedby/dhandho.png", name: "Dhandho Fellowship", className: "bg-white border-[1px] border-gray-400 p-[2px] object-contain" },
];

export function Footer() {
  return (
    <footer className="border-t border-border pt-16 pb-8 font-sans">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 flex flex-col gap-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Brand & Intro */}
          <div className="flex flex-col gap-6">
            <Logo className="h-8 text-foreground" />
            <p className="text-xl max-w-sm font-medium tracking-tight">
              Hiring doesn&lsquo;t have to be boring, let&lsquo;s make it fun with us!
            </p>
            <div className="flex items-center gap-4 mt-2">
              <div className="border border-border rounded-full px-4 py-1.5 flex items-center gap-3">
                <span className="text-sm font-medium">Backed by</span>
                <div className="flex -space-x-1.5">
                  {backedByLogos.map((logo, i) => (
                    <div key={i} className="relative group cursor-pointer flex">
                      <Image
                        src={logo.url}
                        width={24}
                        height={24}
                        alt={logo.name}
                        className={`size-6 rounded-full border-2 border-background relative z-10 transition-transform duration-200 group-hover:scale-110 group-hover:z-20 ${logo.className}`}
                      />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-foreground text-background text-[11px] font-medium rounded-md shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap pointer-events-none z-50 translate-y-1 group-hover:translate-y-0">
                        {logo.name}
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <a href="https://x.com/redstringhire" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.005 4.223H5.078z" />
                </svg>
              </a>
              <a href="https://linkedin.com/company/redstring-invisible-thread" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 md:justify-items-end pt-2">
            <div className="flex flex-col gap-2">
              <h3 className="font-medium text-2sxl mb-1 tracking-tight">Tools</h3>
              <Link href="/tools/runway-to-roi" className="text-foreground hover:opacity-70 transition-opacity text-lg">Hiring Planner</Link>
              <Link href="/tools/hiring-playbook-generator" className="text-foreground hover:opacity-70 transition-opacity text-lg">Hiring Playbook</Link>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-medium text-2xl mb-1 tracking-tight">Company</h3>
              <Link href="/#faq" className="text-foreground hover:opacity-70 transition-opacity text-lg">FAQ</Link>
              <Link href="/about" className="text-foreground hover:opacity-70 transition-opacity text-lg">About</Link>
              <Link href="/blog" className="text-foreground hover:opacity-70 transition-opacity text-lg">Blog</Link>
              <Link href="/playbooks" className="text-foreground hover:opacity-70 transition-opacity text-lg">Playbooks & Guides</Link>
              <Link href="/jobs-map" className="text-foreground hover:opacity-70 transition-opacity text-lg">Jobs Map</Link>
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-border" />

        {/* Middle Section - Built for Founders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-3">
            <h2 className="text-[28px] font-medium tracking-tight">Built For Founders</h2>
            <p className="text-foreground/80 max-w-md text-[15px] leading-relaxed">
              A private community where founders exchange ideas, share experiences, and help each other build better companies.<br/>
              Each Application Handpicked by our Founder!
            </p>
          </div>
          
          <div className="md:ml-auto w-full max-w-[360px]">
            <NewsletterForm />
          </div>
        </div>

        <div className="h-px w-full bg-border" />

        {/* Bottom Section - Book A Demo */}
        <div className="flex justify-center py-2">
          <FooterBookDemo />
        </div>

        {/* Very Bottom - Legal */}
        <div className="flex justify-end gap-8 text-[15px] font-medium text-foreground pt-4">
          <Link href="/privacy-policy" className="hover:opacity-70 transition-opacity">Privacy policy</Link>
          <Link href="/terms-and-conditions" className="hover:opacity-70 transition-opacity">Terms and conditions</Link>
        </div>

      </div>
    </footer>
  );
}
