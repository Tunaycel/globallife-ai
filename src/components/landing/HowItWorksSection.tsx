"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { UserPlus, Settings, Rocket, Crown } from "lucide-react";

const steps = [
    {
        icon: UserPlus,
        step: "01",
        title: "Create Your Profile",
        desc: "Quick onboarding to understand your goals, current level, and timeline.",
    },
    {
        icon: Settings,
        step: "02",
        title: "AI Builds Your Plan",
        desc: "Our neural engine generates a personalized learning and immigration roadmap.",
    },
    {
        icon: Rocket,
        step: "03",
        title: "Learn & Prepare",
        desc: "Practice with AI tutors, prepare documents, and track your progress in real-time.",
    },
    {
        icon: Crown,
        step: "04",
        title: "Achieve Your Goal",
        desc: "Get your visa approved, ace your exam, and start your new chapter abroad.",
    },
];

export default function HowItWorksSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section
            ref={ref}
            className="relative py-24 overflow-hidden"
            style={{ background: "transparent" }}
        >
            <div className="relative z-10 max-w-[1100px] mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        className="text-xs font-medium uppercase tracking-[0.2em] mb-4"
                        style={{ color: "rgba(255,255,255,0.3)" }}
                    >
                        How It Works
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        className="text-3xl md:text-4xl font-bold text-white tracking-tight"
                    >
                        Four Steps to Your New Life
                    </motion.h2>
                </div>

                {/* Steps */}
                <div className="grid md:grid-cols-4 gap-6">
                    {steps.map((step, i) => (
                        <motion.div
                            key={step.step}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                            className="relative group"
                        >
                            {/* Connector line */}
                            {i < steps.length - 1 && (
                                <div
                                    className="hidden md:block absolute top-8 left-[calc(50%+24px)] w-[calc(100%-48px)] h-px"
                                    style={{ background: "linear-gradient(90deg, rgba(10,132,255,0.2), rgba(94,92,230,0.1))" }}
                                />
                            )}

                            <div className="text-center">
                                {/* Step Number */}
                                <div className="relative inline-flex mb-4">
                                    <div
                                        className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all group-hover:shadow-[0_0_30px_rgba(10,132,255,0.15)]"
                                        style={{
                                            background: "rgba(10,132,255,0.06)",
                                            border: "1px solid rgba(10,132,255,0.1)",
                                        }}
                                    >
                                        <step.icon className="w-6 h-6 text-[#0A84FF]" />
                                    </div>
                                    <span
                                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold"
                                        style={{
                                            background: "linear-gradient(135deg, #0A84FF, #5E5CE6)",
                                            color: "white",
                                        }}
                                    >
                                        {step.step}
                                    </span>
                                </div>

                                <h3 className="font-semibold text-white mb-2">{step.title}</h3>
                                <p className="text-sm leading-relaxed max-w-[200px] mx-auto" style={{ color: "rgba(255,255,255,0.4)" }}>
                                    {step.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
