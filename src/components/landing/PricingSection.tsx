"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";

const plans = [
    {
        name: "Starter",
        desc: "Perfect for exploration",
        monthly: 0,
        yearly: 0,
        features: ["3 AI lessons per week", "Basic IELTS preparation", "1 country guide", "Community access", "Email support"],
        cta: "Start Free",
        highlighted: false,
    },
    {
        name: "Professional",
        desc: "Most popular choice",
        monthly: 29,
        yearly: 19,
        features: ["Unlimited AI lessons", "Full IELTS/TOEFL prep", "All 35+ country guides", "AI visa consultant", "Document review", "Priority support", "Progress analytics"],
        cta: "Get Professional",
        highlighted: true,
    },
    {
        name: "Enterprise",
        desc: "For organizations",
        monthly: 79,
        yearly: 59,
        features: ["Everything in Professional", "Team management", "Custom AI training", "API access", "Dedicated success manager", "White-label options", "SLA guarantee"],
        cta: "Contact Sales",
        highlighted: false,
    },
];

export default function PricingSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [yearly, setYearly] = useState(true);

    return (
        <section
            ref={ref}
            id="pricing"
            className="relative py-24 overflow-hidden"
            style={{ background: "transparent" }}
        >
            {/* Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
                style={{ background: "radial-gradient(ellipse, rgba(94,92,230,0.06), transparent 70%)" }}
            />

            <div className="relative z-10 max-w-[1100px] mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-12">
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        className="text-xs font-medium uppercase tracking-[0.2em] mb-4"
                        style={{ color: "rgba(255,255,255,0.3)" }}
                    >
                        Pricing
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6"
                    >
                        Transparent Pricing
                    </motion.h2>

                    {/* Toggle */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.1 }}
                        className="inline-flex items-center gap-3 px-1 py-1 rounded-xl"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                    >
                        <button
                            onClick={() => setYearly(false)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${!yearly ? "text-white bg-[rgba(255,255,255,0.08)]" : "text-[rgba(255,255,255,0.4)]"
                                }`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setYearly(true)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${yearly ? "text-white bg-[rgba(255,255,255,0.08)]" : "text-[rgba(255,255,255,0.4)]"
                                }`}
                        >
                            Yearly
                            <span className="ml-1.5 text-[10px] text-[#30D158] font-semibold">-35%</span>
                        </button>
                    </motion.div>
                </div>

                {/* Cards */}
                <div className="grid md:grid-cols-3 gap-5">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.15 + i * 0.08 }}
                            className={`rounded-2xl p-7 relative transition-all duration-300 ${plan.highlighted ? "hover:-translate-y-2" : "hover:-translate-y-1"
                                }`}
                            style={{
                                background: plan.highlighted ? "rgba(10,132,255,0.06)" : "rgba(255,255,255,0.02)",
                                border: plan.highlighted ? "1px solid rgba(10,132,255,0.15)" : "1px solid rgba(255,255,255,0.05)",
                            }}
                        >
                            {plan.highlighted && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-semibold text-white"
                                    style={{ background: "linear-gradient(135deg, #0A84FF, #5E5CE6)" }}
                                >
                                    RECOMMENDED
                                </div>
                            )}

                            <h3 className="font-semibold text-white text-lg">{plan.name}</h3>
                            <p className="text-xs mt-1 mb-5" style={{ color: "rgba(255,255,255,0.4)" }}>{plan.desc}</p>

                            <div className="mb-6">
                                <span className="text-4xl font-bold text-white">
                                    ${yearly ? plan.yearly : plan.monthly}
                                </span>
                                {plan.monthly > 0 && (
                                    <span className="text-sm ml-1" style={{ color: "rgba(255,255,255,0.3)" }}>/mo</span>
                                )}
                            </div>

                            <div className="space-y-3 mb-8">
                                {plan.features.map((feature) => (
                                    <div key={feature} className="flex items-start gap-2.5">
                                        <Check className="w-4 h-4 text-[#30D158] mt-0.5 shrink-0" />
                                        <span className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <Link
                                href="/auth/register"
                                className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold transition-all ${plan.highlighted
                                    ? "text-white hover:shadow-[0_0_20px_rgba(10,132,255,0.3)]"
                                    : "text-white hover:bg-[rgba(255,255,255,0.06)]"
                                    }`}
                                style={
                                    plan.highlighted
                                        ? { background: "linear-gradient(135deg, #0A84FF, #5E5CE6)" }
                                        : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }
                                }
                            >
                                {plan.cta}
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
