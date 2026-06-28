"use client";
"use no memo";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { DotLoader } from "@/components/ui/dot-loader";

export type DotFlowProps = {
    items: {
        title: string;
        frames: number[][];
        duration?: number;
        repeatCount?: number;
    }[];
    href?: string;
};

export const DotFlow = ({ items, href }: DotFlowProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const [index, setIndex] = useState(0);
    const [textIndex, setTextIndex] = useState(0);

    const { contextSafe } = useGSAP();

    useEffect(() => {
        if (!containerRef.current || !textRef.current) return;

        const newWidth = textRef.current.offsetWidth + 1;

        gsap.to(containerRef.current, {
            width: newWidth,
            duration: 0.5,
            ease: "power2.out",
        });
    }, [textIndex]);

    const handleNext = useCallback(() => {
        const el = containerRef.current;
        if (!el) return;
        gsap.to(el, {
            y: 20,
            opacity: 0,
            filter: "blur(8px)",
            duration: 0.5,
            ease: "power2.in",
            onComplete: () => {
                setTextIndex((prev) => (prev + 1) % items.length);
                gsap.fromTo(
                    el,
                    { y: -20, opacity: 0, filter: "blur(4px)" },
                    {
                        y: 0,
                        opacity: 1,
                        filter: "blur(0px)",
                        duration: 0.7,
                        ease: "power2.out",
                    },
                );
            },
        });

        setIndex((prev) => (prev + 1) % items.length);
    }, [items.length]);

    // eslint-disable-next-line
    const next = contextSafe(handleNext);

    const content = (
        <>
            <DotLoader
                frames={items[index].frames}
                onComplete={next}
                className="gap-px"
                repeatCount={items[index].repeatCount ?? 1}
                duration={items[index].duration ?? 150}
                dotClassName="bg-primary-foreground/30 [&.active]:bg-primary-foreground size-[3px]"
            />
            <div ref={containerRef} className="relative overflow-hidden" style={{ width: 'auto', minWidth: '120px' }}>
                <div 
                    ref={textRef} 
                    className="inline-block text-[16px] font-medium whitespace-nowrap text-primary-foreground"
                    style={{ fontFeatureSettings: "'case', 'cv01', 'cv08', 'cv09', 'cv11', 'cv13'" }}
                >
                    {items[textIndex].title}
                </div>
            </div>
        </>
    );

    const cls = "flex items-center gap-4 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-4 transition-colors cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-300";

    if (href) {
        const isExternal = href.startsWith('http');
        return (
            <Link 
                href={href} 
                className={cls}
                {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
                {content}
            </Link>
        );
    }

    return <div className={cls}>{content}</div>;
};
