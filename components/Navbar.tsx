"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Map as MapIcon } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/logo";
import { BookDemoButton } from "@/components/ui/book-demo-button";
import { motion, AnimatePresence, Variants, useScroll, useMotionValueEvent } from "motion/react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

const navLinks = [
  { label: "LoopX", href: "https://loopx.redstring.co.in" },
  { label: "Jobs Map", href: "/jobs-map" },
];

const contentLinks = [
  {
    title: "Blog",
    href: "/blog",
    description: "Read our latest articles, insights, and company updates.",
  },
  {
    title: "Playbooks & Guides",
    href: "/playbooks",
    description: "Free Excel sheets, hiring Playbooks, and top startup reports.",
  }
];

const hiringTools = [
  {
    title: "Runway to ROI Hiring Planner",
    href: "/tools/runway-to-roi",
    description: "Map out your hiring strategy, evaluate timelines, and forecast budget with our intelligent planner.",
  },
  {
    title: "Hiring Playbook Generator",
    href: "/tools/hiring-playbook-generator",
    description: "Generate a custom, AI-driven hiring strategy tailored for your specific role and industry.",
  }
];

interface NavbarProps {
  mapLayout?: boolean;
}

const menuVariants: Variants = {
  hidden: { height: 0, opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } },
  visible: { 
    height: "auto", 
    opacity: 1, 
    transition: { duration: 0.4, ease: "easeInOut", staggerChildren: 0.05, delayChildren: 0.1 } 
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 }
};

export function Navbar({ mapLayout = false }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isFloating, setIsFloating] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 64) {
      setIsFloating(true);
    } else {
      setIsFloating(false);
    }
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (mapLayout) {
    return (
      <motion.nav 
        layoutId="global-navbar"
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="absolute top-6 left-6 md:left-8 z-40 w-full max-w-sm sm:max-w-md bg-background/80 backdrop-blur-xl border border-border rounded-2xl shadow-lg p-6 pointer-events-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <Link href="/">
            <motion.div layoutId="nav-logo" transition={{ duration: 0.4, ease: "easeInOut" }} className="flex items-center">
              <Logo className="h-[28px] w-auto text-foreground" />
            </motion.div>
          </Link>
          <div className="flex items-center gap-3">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full hover:bg-secondary text-foreground transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            )}
            <button
              className="text-foreground p-2 hover:bg-secondary rounded-full transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                {mobileOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <>
                    <path d="M4 8h16" />
                    <path d="M4 16h16" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* The collapsed header content */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
          className="overflow-hidden"
        >
          <h1
            className="font-[540] font-denton text-foreground text-[28px] md:text-[36px] leading-[1.1] tracking-tight mb-2"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Who is hiring on Redstring?
          </h1>
          <p className="text-muted-foreground text-sm font-light leading-relaxed mb-2">
            Explore the map to discover actively hiring companies in your city and see live job openings.
          </p>
        </motion.div>

        {/* Mobile menu expanded state for Map Layout */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="overflow-hidden"
            >
              <div className="mt-6 pt-4 border-t border-border flex flex-col">
                {navLinks.map((link) => (
                  <motion.div key={link.label} variants={itemVariants}>
                    <Link
                      href={link.href}
                      className="block py-2 text-[15px] text-foreground hover:text-primary transition-colors"
                      onClick={() => setMobileOpen(false)}
                      {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div variants={itemVariants}>
                  <Link
                    href="/tools/runway-to-roi"
                    className="block py-2 text-[15px] text-foreground hover:text-primary transition-colors"
                  >
                    Runway to ROI Hiring Planner
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    );
  }

  // STANDARD LAYOUT
  return (
    <>
      {/* Invisible spacer to push the page down and align Hero lines correctly */}
      <div className="relative w-full h-10 pointer-events-none opacity-0" aria-hidden="true" />

      <motion.nav 
        layout
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className={`z-50 transition-colors duration-300 flex flex-col ${
          isFloating
            ? "fixed top-4 inset-x-0 mx-auto w-[95%] max-w-[1280px] bg-background/80 backdrop-blur-xl border border-border rounded-[24px] shadow-md"
            : "absolute top-0 inset-x-0 w-full bg-transparent border-transparent"
        }`}
      >

        <div className={`flex items-center justify-between shrink-0 transition-all duration-300 ${
            isFloating ? "h-[72px] px-6 lg:px-8" : "h-16 px-6 md:px-20"
          }`}
        >
        <div className="flex items-center">
          <Link href="/">
            <motion.div layoutId="nav-logo" transition={{ duration: 0.4, ease: "easeInOut" }} className="flex items-center">
              <Logo className="h-[28px] w-auto text-foreground" />
            </motion.div>
          </Link>
        </div>

        <motion.div layoutId="nav-links" transition={{ duration: 0.4, ease: "easeInOut" }} className="hidden md:flex items-center gap-[16px]">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-[15px] px-4 py-2 transition-colors duration-200 text-muted-foreground hover:text-foreground`}
              style={{ fontFeatureSettings: "'case', 'cv01', 'cv08', 'cv09', 'cv11', 'cv13'" }}
              {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {link.label}
            </Link>
          ))}
          
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-[15px] text-muted-foreground hover:text-foreground bg-transparent hover:bg-transparent data-[state=open]:bg-transparent">
                  Resources
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <li className="flex flex-col gap-1">
                      <h4 className="text-[13px] font-medium text-muted-foreground mb-1 uppercase tracking-wider px-3 pt-2">Content & Guides</h4>
                      <ul className="flex flex-col gap-1 w-full">
                        {contentLinks.map((link) => (
                          <li key={link.title}>
                            <NavigationMenuLink>
                              <Link
                                href={link.href}
                                className="flex flex-col items-start gap-2 p-3 h-auto"
                              >
                                <div className="text-sm font-medium leading-none text-foreground">{link.title}</div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  {link.description}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li className="flex flex-col gap-1">
                      <h4 className="text-[13px] font-medium text-muted-foreground mb-1 uppercase tracking-wider px-3 pt-2">Hiring Tools</h4>
                      <ul className="flex flex-col gap-1 w-full">
                        {hiringTools.map((tool) => (
                          <li key={tool.title}>
                            <NavigationMenuLink>
                              <Link
                                href={tool.href}
                                className="flex flex-col items-start gap-2 p-3 h-auto"
                              >
                                <div className="text-sm font-medium leading-none text-foreground">{tool.title}</div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  {tool.description}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </motion.div>

        <motion.div layoutId="nav-auth" transition={{ duration: 0.4, ease: "easeInOut" }} className="hidden md:flex items-center gap-4">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-secondary text-foreground transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          )}
          <div className="hidden md:block">
            <BookDemoButton variant="primary" size="sm" />
          </div>
        </motion.div>

        <button
          className="md:hidden text-foreground p-2 -mr-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            {mobileOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <>
                <path d="M4 8h16" />
                <path d="M4 16h16" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Top Banner integrated into Navbar (Bottom) */}
      <div className={`h-10 flex items-center justify-center text-sm font-medium shrink-0 transition-all duration-300 ${
          isFloating 
            ? "w-full px-4 bg-primary/10 text-primary border-t border-border rounded-b-[24px]" 
            : "self-stretch mx-4 md:mx-16 px-4 bg-primary text-primary-foreground"
        }`}
      >
        <span className="truncate">
          We were selected by The Founding Co(backed by residency) for their first cohort
        </span>
        <Link href="/blog/the-founding.co" className={`ml-3 underline underline-offset-2 font-semibold shrink-0 transition-colors ${isFloating ? "hover:text-primary/80" : "hover:text-primary-foreground/80"}`}>
          View announcement &rarr;
        </Link>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={`md:hidden overflow-hidden bg-background/95 backdrop-blur-xl border-t border-border rounded-b-3xl absolute left-0 w-full ${
              isFloating ? "top-[112px]" : "top-[104px]"
            }`}
          >
            <div className="px-6 pb-6 pt-4">
              <motion.div variants={itemVariants} className="flex items-center justify-between mb-4 border-b border-border pb-4">
                <span className="text-sm font-medium text-muted-foreground">Theme</span>
                {mounted && (
                  <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="p-2 rounded-full hover:bg-secondary text-foreground transition-colors"
                    aria-label="Toggle theme"
                  >
                    {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  </button>
                )}
              </motion.div>
              
              <div className="flex flex-col">
                {navLinks.map((link) => (
                  <motion.div key={link.label} variants={itemVariants}>
                    <Link
                      href={link.href}
                      className={`block py-3 text-[15px] border-b border-border text-foreground hover:text-primary transition-colors`}
                      style={{ fontFeatureSettings: "'case', 'cv01', 'cv08', 'cv09', 'cv11', 'cv13'" }}
                      onClick={() => setMobileOpen(false)}
                      {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                <motion.div variants={itemVariants} className="py-3 border-b border-border">
                  <span className="text-[15px] text-muted-foreground font-medium mb-2 block">Content & Guides</span>
                  <div className="flex flex-col gap-2 pl-4">
                    {contentLinks.map((link) => (
                      <Link
                        key={link.title}
                        href={link.href}
                        className="block py-2 text-[14px] text-foreground hover:text-primary transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        {link.title}
                      </Link>
                    ))}
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="py-3 border-b border-border">
                  <span className="text-[15px] text-muted-foreground font-medium mb-2 block">Hiring Tools</span>
                  <div className="flex flex-col gap-2 pl-4">
                    {hiringTools.map((tool) => (
                      <Link
                        key={tool.title}
                        href={tool.href}
                        className="block py-2 text-[14px] text-foreground hover:text-primary transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        {tool.title}
                      </Link>
                    ))}
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <div className="mt-6">
                    <BookDemoButton variant="primary" size="md" className="w-full text-center" />
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
    </>
  );
}
