"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, BookOpen, TrendingUp, Globe } from "lucide-react";
import { useLocale } from "@/components/providers/LocaleProvider";

const stats = [
    { icon: Users, value: "2.400+", key: "users", gradient: "from-[#0A84FF] to-[#5E5CE6]" },
    { icon: BookOpen, value: "50.000+", key: "lessons", gradient: "from-[#5E5CE6] to-[#BF5AF2]" },
    { icon: TrendingUp, value: "94%", key: "satisfaction", gradient: "from-[#30D158] to-[#34C759]" },
    { icon: Globe, value: "35+", key: "countries", gradient: "from-[#0A84FF] to-[#00C7BE]" },
];

export default function StatsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const { t } = useLocale();

    return (
        <section
            ref={ref}
            className="relative py-20 overflow-hidden"
            style={{ background: "transparent" }}
        >
            {/* Subtle grid background */}
            <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
                    backgroundSize: "60px 60px",
                }}
            />

            <div className="relative z-10 max-w-[1200px] mx-auto px-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.key}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="text-center group"
                        >
                            {/* Icon Container */}
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-4 relative">
                                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.gradient} opacity-10 group-hover:opacity-20 transition-opacity`} />
                                <stat.icon className="w-5 h-5 text-[rgba(255,255,255,0.7)]" />
                            </div>

                            {/* Value */}
                            <p
                                className="text-3xl lg:text-4xl font-bold mb-2 bg-clip-text"
                                style={{ color: "white" }}
                            >
                                {stat.value}
                            </p>

                            {/* Label */}
                            <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>
                                {t("stats", stat.key) as string}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
