"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLocale } from "@/components/providers/LocaleProvider";

export default function FinalCTASection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const { t } = useLocale();

    return (
        <section
            ref={ref}
            className="relative py-32 overflow-hidden"
            style={{ background: "transparent" }}
        >
            {/* Grid background */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
                    backgroundSize: "80px 80px",
                }}
            />

            {/* Radial glow */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
                style={{
                    background: "radial-gradient(circle, rgba(10,132,255,0.08), transparent 60%)",
                }}
            />

            <div className="relative z-10 max-w-[700px] mx-auto px-6 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight"
                >
                    {t("cta", "title") as string}
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.1 }}
                    className="text-lg mb-10 leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                >
                    {t("cta", "subtitle") as string}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 }}
                >
                    <Link
                        href="/auth/register"
                        className="group inline-flex items-center gap-2 px-10 py-4 rounded-xl font-semibold text-white text-lg transition-all hover:scale-105 active:scale-[0.98]"
                        style={{
                            background: "linear-gradient(135deg, #0A84FF, #5E5CE6)",
                            boxShadow: "0 0 60px rgba(10,132,255,0.2), inset 0 1px 0 rgba(255,255,255,0.1)",
                        }}
                    >
                        {t("cta", "button") as string}
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
