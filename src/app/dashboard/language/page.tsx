"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const categories = [
    { emoji: "💬", title: "Serbest Konuşma", desc: "AI ile doğal sohbet", progress: "12/24", color: "#0A84FF" },
    { emoji: "🎭", title: "Rol Yapma", desc: "Gerçek yaşam senaryoları", progress: "5/16", color: "#5E5CE6" },
    { emoji: "📚", title: "Gramer Dersleri", desc: "Yapısal gramer eğitimi", progress: "8/20", color: "#BF5AF2" },
    { emoji: "🗣️", title: "Telaffuz Pratiği", desc: "AI destekli söyleyiş", progress: "3/12", color: "#30D158" },
    { emoji: "📝", title: "Yazma Pratiği", desc: "Essay ve mektup yazımı", progress: "2/10", color: "#FF9F0A" },
    { emoji: "👂", title: "Dinleme Pratiği", desc: "Anlama becerileri", progress: "6/15", color: "#FF453A" },
    { emoji: "🎯", title: "IELTS Hazırlık", desc: "Tam sınav simülasyonu", progress: "4/20", color: "#0A84FF" },
    { emoji: "🎯", title: "TOEFL Hazırlık", desc: "TOEFL iBT hazırlık", progress: "1/16", color: "#5E5CE6" },
    { emoji: "🎯", title: "Goethe Hazırlık", desc: "Almanca sertifika", progress: "0/12", color: "#FF9F0A" },
    { emoji: "🛂", title: "Vize Mülakat", desc: "Konsolosluk pratiği", progress: "2/8", color: "#BF5AF2" },
    { emoji: "💼", title: "İş İngilizcesi", desc: "Profesyonel dil", progress: "3/14", color: "#30D158" },
    { emoji: "🏠", title: "Günlük Yaşam", desc: "Pratik konuşmalar", progress: "7/18", color: "#0A84FF" },
];

const languages = [
    { flag: "🇬🇧", name: "İngilizce", active: true },
    { flag: "🇩🇪", name: "Almanca", active: false },
    { flag: "🇫🇷", name: "Fransızca", active: false },
    { flag: "🇪🇸", name: "İspanyolca", active: false },
    { flag: "🇮🇹", name: "İtalyanca", active: false },
    { flag: "🇳🇱", name: "Hollandaca", active: false },
    { flag: "🇯🇵", name: "Japonca", active: false },
    { flag: "🇰🇷", name: "Korece", active: false },
];

const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];

export default function LanguagePage() {
    return (
        <div className="max-w-[1100px] mx-auto space-y-8">
            {/* Language Selector */}
            <div>
                <h1 className="text-h2 text-[var(--text-primary)] mb-6">Dil Öğrenme</h1>
                <div className="flex flex-wrap gap-2 mb-6">
                    {languages.map((lang) => (
                        <button
                            key={lang.name}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${lang.active
                                    ? "bg-[var(--color-primary)] text-white shadow-md"
                                    : "bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]"
                                }`}
                        >
                            <span className="text-lg">{lang.flag}</span>
                            {lang.name}
                        </button>
                    ))}
                </div>

                {/* Level */}
                <div className="flex items-center gap-2 mb-8">
                    <span className="text-sm font-medium text-[var(--text-secondary)] mr-2">Seviye:</span>
                    {levels.map((level, i) => (
                        <button
                            key={level}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${i === 2
                                    ? "bg-[var(--color-primary)] text-white"
                                    : i < 2
                                        ? "bg-[#30D158]/10 text-[#30D158]"
                                        : "bg-[var(--surface)] text-[var(--text-tertiary)]"
                                }`}
                        >
                            {level}
                        </button>
                    ))}
                </div>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((cat, i) => (
                    <motion.div
                        key={cat.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                    >
                        <Link
                            href="/dashboard/language/lesson"
                            className="block rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] p-5 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <span className="text-3xl">{cat.emoji}</span>
                                <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: `${cat.color}15`, color: cat.color }}>
                                    {cat.progress}
                                </span>
                            </div>
                            <h3 className="font-semibold text-[var(--text-primary)] mb-1">{cat.title}</h3>
                            <p className="text-caption text-[var(--text-secondary)] mb-3">{cat.desc}</p>
                            <div className="h-1.5 rounded-full bg-[var(--surface)]">
                                <div
                                    className="h-full rounded-full"
                                    style={{
                                        width: `${(parseInt(cat.progress.split("/")[0]) / parseInt(cat.progress.split("/")[1])) * 100}%`,
                                        background: cat.color,
                                    }}
                                />
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
