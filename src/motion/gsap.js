// Single entry point for GSAP. Import from here, never from "gsap" directly,
// so plugins, defaults and the house rhythm are registered exactly once.
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, CustomEase, SplitText, useGSAP);

// House rhythm: one duration, one ease (mirrored as `duration-house` / `ease-house` in Tailwind).
export const DURATION = 1 / ((1 + Math.sqrt(5)) / 2); // ≈ 0.618s
export const EASE = CustomEase.create("house", "0.175, 0.885, 0.32, 1");

gsap.config({ autoSleep: 60, nullTargetWarn: false });
gsap.defaults({ duration: DURATION, ease: EASE });

// `?debug` shows ScrollTrigger markers and the stack HUD.
export const DEBUG = new URLSearchParams(window.location.search).has("debug");
export const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export { gsap, ScrollTrigger, SplitText, useGSAP };
