"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, useInView, LayoutGroup, AnimatePresence } from "motion/react";
import { useTheme } from "next-themes";
import { Iphone } from "@/components/ui/Iphone";
import Logo from "../logo";

const notifications = [
  {
    id: "notif-1",
    title: "Found your next best hire",
    subtitle: "Senior React Developer matched at 94%",
  },
  {
    id: "notif-2",
    title: "3 profiles shortlisted",
    subtitle: "View your pipeline \u2192",
  },
  {
    id: "notif-3",
    title: "New candidates available",
    subtitle: "2 profiles ready to review",
  },
];

function useLiveClock() {
  const [time, setTime] = useState({ hours: "", minutes: "", date: "" });

  const updateClock = useCallback(() => {
    const now = new Date();
    const h = now.getHours().toString().padStart(2, "0");
    const m = now.getMinutes().toString().padStart(2, "0");
    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    setTime({
      hours: h,
      minutes: m,
      date: `${dayNames[now.getDay()]}, ${monthNames[now.getMonth()]} ${now.getDate()}`,
    });
  }, []);

  useEffect(() => {
    updateClock();
    const id = setInterval(updateClock, 1000);
    return () => clearInterval(id);
  }, [updateClock]);

  return time;
}

function NotificationStack({
  visible,
  isDark,
  restartKey,
  expandToggleKey,
}: {
  visible: boolean;
  isDark: boolean;
  restartKey: number;
  expandToggleKey: number;
}) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (visible) {
      setVisibleCount(0);
      const t1 = setTimeout(() => setVisibleCount(1), 1000);
      const t2 = setTimeout(() => setVisibleCount(2), 2000);
      const t3 = setTimeout(() => setVisibleCount(3), 3000);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [visible, restartKey]);

  useEffect(() => {
    if (expandToggleKey > 0) {
      setIsHovered((h) => !h);
    }
  }, [expandToggleKey]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={visible ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.3, delay: 0.4 }}
      className="flex-1 w-full mt-3 sm:mt-4"
    >
      <LayoutGroup>
        <motion.div
          layout
          animate={{
            height: isHovered ? Math.max(84, visibleCount * 88 - 8) : 84,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative"
        >
          {isHovered && visibleCount > 0 && (
            <div
              className="absolute inset-0 z-0"
              onClick={() => setIsHovered(false)}
            />
          )}
          {notifications.map((notif, i) => {
            const isLatest = i === notifications.length - 1;
            const isVisible = visibleCount > i;
            const pushDepth = Math.max(0, visibleCount - 1 - i);
            const yPos = pushDepth * 15;
            const scale = 1 - pushDepth * 0.08;
            const opacity = 1 - pushDepth * 0.12;
            const isTop = pushDepth === 0;

            if (!isVisible) return null;

            return (
              <motion.div
                key={notif.id}
                layoutId={`notif-${notif.id}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  isHovered
                    ? { opacity: 1, y: (visibleCount - 1 - i) * 88, scale: 1 }
                    : { opacity, y: yPos, scale, boxShadow: "0 2px 12px rgba(0,0,0,0.06), inset 0 1.5px 0 rgba(255,255,255,0.15), inset 0 -1.5px 1px rgba(0,0,0,0.08)" }
                }
                transition={
                  isHovered
                    ? {
                        type: "spring",
                        stiffness: 500,
                        damping: 50,
                      }
                    : {
                        duration: 0.06,
                        ease: "linear",
                      }
                }
                className={`absolute inset-x-0 h-[80px] rounded-4xl p-2.5 sm:p-4 flex items-center gap-2 sm:gap-2.5 overflow-hidden border bg-black/[0.04] ${
                  isDark
                    ? `${isHovered ? "border-white/20" : "border-white/[0.08]"}`
                    : `${isHovered ? "border-black/20" : "border-black/[0.06]"} shadow-lg`
                } ${isTop ? "cursor-pointer hover:brightness-125 hover:ring-1 hover:ring-white/30 hover:ring-inset transition-all" : ""}`}
                style={{ zIndex: i + 1, backdropFilter: "blur(3px)", WebkitBackdropFilter: "blur(3px)" }}
                onClick={isTop ? () => setIsHovered((h) => !h) : undefined}
              >
                <motion.div
                  className="absolute inset-0 rounded-4xl pointer-events-none"
                  animate={{
                    background: [
                      "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.02) 100%)",
                      "linear-gradient(180deg, rgba(255,255,255,0.07) 0%, transparent 45%, transparent 55%, rgba(255,255,255,0.04) 100%)",
                      "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.02) 100%)",
                    ],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="h-full aspect-square rounded-full mr-2 flex items-center justify-center shrink-0 backdrop-blur-md bg-white/10">
                  <img src="/favicon.png" alt="" className="w-5 h-5 object-contain" />
                </div>
                <div
                  className={`flex-1 min-w-0 transition-opacity duration-300 ${!isTop && !isHovered ? "opacity-0" : ""}`}
                >
                  <p
                    className={`text-[11px] sm:text-[12px] font-bold leading-tight ${isDark ? "text-white/95" : "text-black/85"}`}
                  >
                    Redstring
                  </p>
                  <p
                    className={`text-[11px] sm:text-[12px] font-semibold leading-snug mt-0.5 ${isDark ? "text-white/85" : "text-black/75"}`}
                  >
                    {notif.title}
                  </p>
                  <p
                    className={`text-[10px] sm:text-[11px] leading-snug mt-0.5 ${isDark ? "text-white/55" : "text-black/45"}`}
                  >
                    {notif.subtitle}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </LayoutGroup>
    </motion.div>
  );
}

function LockScreen({
  visible,
  isDark,
  restartKey,
  expandToggleKey,
}: {
  visible: boolean;
  isDark: boolean;
  restartKey: number;
  expandToggleKey: number;
}) {
  const clock = useLiveClock();

  return (
    <div className="relative w-full h-full overflow-hidden">
      <Image
        src="/wallpaper.jpg"
        alt=""
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 h-full flex flex-col items-center pt-6 px-4 sm:px-5">
        <motion.div
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-[25%] mb-[10%]"
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={clock.hours + clock.minutes}
              initial={{ filter: "blur(6px)", opacity: 0.5 }}
              animate={{ filter: "blur(0px)", opacity: 1 }}
              exit={{ filter: "blur(6px)", opacity: 0.5 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="text-[56px] sm:text-[72px] mb-2 font-semibold leading-none tracking-tight tabular-nums text-white"
              style={{ textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}
            >
              {clock.hours}:{clock.minutes}
            </motion.p>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.p
              key={clock.date}
              initial={{ filter: "blur(4px)", opacity: 0.5 }}
              animate={{ filter: "blur(0px)", opacity: 1 }}
              exit={{ filter: "blur(4px)", opacity: 0.5 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="text-[12px] sm:text-[13px] font-semibold mt-1 text-white/80"
              style={{ textShadow: "0 1px 8px rgba(0,0,0,0.6)" }}
            >
              {clock.date}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        <NotificationStack
          visible={visible}
          isDark={isDark}
          restartKey={restartKey}
          expandToggleKey={expandToggleKey}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 1.5 }}
          className="mt-auto pb-3 pt-1"
        >
          <div className="w-[100px] h-[4px] rounded-full mx-auto bg-white/40" />
        </motion.div>
      </div>
    </div>
  );
}

export function PhoneAnimation() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [restartKey, setRestartKey] = useState(0);
  const [expandToggleKey, setExpandToggleKey] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-[400px] sm:h-[480px] lg:h-[600px] relative overflow-hidden border-b border-foreground/20"
    >
      {mounted && (
        <>
          <div
            className="absolute z-10 left-1/2 -translate-x-1/2 w-[300px] sm:w-[350px] lg:w-[400px]"
            style={{ bottom: "-240px" }}
          >
            <Iphone className="w-full">
              <LockScreen
                visible={isInView}
                isDark={isDark}
                restartKey={restartKey}
                expandToggleKey={expandToggleKey}
              />
            </Iphone>
          </div>

          <div className="absolute z-0 bottom-0 left-1/2 -translate-x-1/2 w-[240px] sm:w-[288px] lg:w-[312px] h-[40px] rounded-full bg-foreground/[0.06] blur-2xl" />

          <button
            onClick={() => setExpandToggleKey((k) => k + 1)}
            className="absolute bottom-2 right-9 z-20 w-6 h-6 flex items-center justify-center text-xs rounded-full text-foreground/30 hover:text-foreground/60 hover:bg-foreground/5 transition-colors"
            title="Toggle expand"
          >
            ⇅
          </button>
          <button
            onClick={() => setRestartKey((k) => k + 1)}
            className="absolute bottom-2 right-2 z-20 w-6 h-6 flex items-center justify-center text-xs rounded-full text-foreground/30 hover:text-foreground/60 hover:bg-foreground/5 transition-colors"
            title="Restart animation"
          >
            ↻
          </button>
        </>
      )}
    </div>
  );
}
