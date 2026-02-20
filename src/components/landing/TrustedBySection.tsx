"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLocale } from "@/components/providers/LocaleProvider";

const logos = [
    "Cambridge", "Oxford", "MIT", "Stanford", "Harvard",
    "IELTS", "TOEFL", "Goethe", "BC", "EF",
    "Cambridge", "Oxford", "MIT", "Stanford", "Harvard",
];

export default function TrustedBySection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const { t } = useLocale();

    return (
        <section ref={ref} className="relative py-16 overflow-hidden">
            <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8 }}
            >
                <p className="text-center text-xs font-medium uppercase tracking-[0.2em] mb-8" style={{ color: "rgba(255,255,255,0.25)" }}>
                    {t("trusted", "title") as string}
                </p>

                {/* Marquee */}
                <div className="relative">
                    <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-[#050510] to-transparent" />
                    <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-[#050510] to-transparent" />

                    <div className="flex gap-12 animate-marquee whitespace-nowrap">
                        {logos.concat(logos).map((name, i) => (
                            <div
                                key={`${name}-${i}`}
                                className="flex items-center gap-2 shrink-0 opacity-30 hover:opacity-60 transition-opacity duration-300"
                            >
                                <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[rgba(255,255,255,0.15)] to-[rgba(255,255,255,0.05)] flex items-center justify-center">
                                    <span className="text-[8px] font-bold text-white/60">{name.charAt(0)}</span>
                                </div>
                                <span className="text-sm font-medium text-white/40 tracking-wide">{name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
