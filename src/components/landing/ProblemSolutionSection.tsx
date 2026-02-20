"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { XCircle, CheckCircle, AlertTriangle, Sparkles } from "lucide-react";
import { useLocale } from "@/components/providers/LocaleProvider";

export default function ProblemSolutionSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const { t } = useLocale();

    const problems = t("problem", "problems") as string[];
    const solutions = t("problem", "solutions") as string[];

    return (
        <section
            ref={ref}
            className="relative py-24 overflow-hidden"
            style={{ background: "transparent" }}
        >
            {/* Subtle gradient glow */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none opacity-30"
                style={{
                    background: "radial-gradient(ellipse, rgba(10,132,255,0.08), transparent 70%)",
                }}
            />

            <div className="relative z-10 max-w-[1100px] mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                    >
                        <AlertTriangle className="w-3.5 h-3.5 text-[#FF9F0A]" />
                        <span className="text-xs font-medium uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.5)" }}>
                            {t("problem", "subtitle") as string}
                        </span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl font-bold text-white tracking-tight"
                    >
                        {t("problem", "title") as string}
                    </motion.h2>
                </div>

                {/* Comparison Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Problems Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="rounded-2xl p-8"
                        style={{
                            background: "rgba(255,59,48,0.03)",
                            border: "1px solid rgba(255,59,48,0.08)",
                        }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,59,48,0.1)" }}>
                                <XCircle className="w-4 h-4 text-[#FF453A]" />
                            </div>
                            <h3 className="font-semibold text-white">{t("problem", "oldWay") as string}</h3>
                        </div>
                        <div className="space-y-4">
                            {problems.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: 0.3 + i * 0.05 }}
                                    className="flex items-start gap-3"
                                >
                                    <XCircle className="w-4 h-4 text-[#FF453A] mt-0.5 shrink-0 opacity-60" />
                                    <span className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{item}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Solutions Column */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="rounded-2xl p-8 relative overflow-hidden"
                        style={{
                            background: "rgba(10,132,255,0.03)",
                            border: "1px solid rgba(10,132,255,0.1)",
                        }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(10,132,255,0.1)" }}>
                                <Sparkles className="w-4 h-4 text-[#0A84FF]" />
                            </div>
                            <h3 className="font-semibold text-white">{t("problem", "newWay") as string}</h3>
                        </div>
                        <div className="space-y-4">
                            {solutions.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: 0.4 + i * 0.05 }}
                                    className="flex items-start gap-3"
                                >
                                    <CheckCircle className="w-4 h-4 text-[#30D158] mt-0.5 shrink-0" />
                                    <span className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>{item}</span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Glow effect */}
                        <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full bg-[#0A84FF] opacity-[0.04] blur-3xl" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
