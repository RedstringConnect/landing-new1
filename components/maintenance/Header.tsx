import React from "react";
import Image from "next/image";
import Logo from "@/public/logo.svg";
// The SVG constants extracted from Figma are kept local to the component to avoid cluttering.
// Instead of SVGs, the user's current version uses "redstring" text.
// We will match the text but apply the Figma flex layout.

export const Header = () => (
  <div
    className="absolute content-stretch flex flex-col gap-[2.948px] items-center justify-center left-[32px] top-[32px] z-50"
    data-node-id="7620:183422"
  >
    <Image src={Logo} alt="Logo" width={100} height={100} />
  </div>
);
