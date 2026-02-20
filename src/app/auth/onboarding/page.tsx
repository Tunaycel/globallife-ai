"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, User, Target, BookOpen, Sparkles, Check } from "lucide-react";
import Link from "next/link";

const steps = [
    { icon: User, title: "Kişisel Bilgiler", emoji: "👤" },
    { icon: Target, title: "Hedefin", emoji: "🎯" },
    { icon: BookOpen, title: "Detaylar", emoji: "📋" },
    { icon: Sparkles, title: "Planın Hazır!", emoji: "✨" },
];

const goals = [
    { emoji: "🗣️", title: "Dil Öğrenmek", desc: "AI ile birebir dil dersleri" },
    { emoji: "🎓", title: "Sınava Hazırlanmak", desc: "IELTS, TOEFL, Goethe..." },
    { emoji: "🛂", title: "Vize Almak", desc: "Yurtdışı vize danışmanlığı" },
    { emoji: "✈️", title: "Yurtdışına Taşınmak", desc: "Tam göç planlaması" },
];

const languages = [
    { flag: "🇬🇧", name: "İngilizce" },
    { flag: "🇩🇪", name: "Almanca" },
    { flag: "🇫🇷", name: "Fransızca" },
    { flag: "🇪🇸", name: "İspanyolca" },
    { flag: "🇮🇹", name: "İtalyanca" },
    { flag: "🇳🇱", name: "Hollandaca" },
    { flag: "🇯🇵", name: "Japonca" },
    { flag: "🇰🇷", name: "Korece" },
];

const countries = [
    { flag: "🇩🇪", name: "Almanya" },
    { flag: "🇳🇱", name: "Hollanda" },
    { flag: "🇬🇧", name: "İngiltere" },
    { flag: "🇺🇸", name: "ABD" },
    { flag: "🇨🇦", name: "Kanada" },
    { flag: "🇦🇺", name: "Avustralya" },
    { flag: "🇫🇷", name: "Fransa" },
    { flag: "🇸🇪", name: "İsveç" },
];

const levels = ["Sıfır (A0)", "Başlangıç (A1)", "Temel (A2)", "Orta (B1)", "Orta-İleri (B2)", "İleri (C1)", "Uzman (C2)"];

export default function OnboardingPage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
    const [selectedLanguage, setSelectedLanguage] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedLevel, setSelectedLevel] = useState("");
    const [name, setName] = useState("");

    const toggleGoal = (goal: string) => {
        setSelectedGoals((prev) =>
            prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
        );
    };

    const next = () => setCurrentStep((p) => Math.min(p + 1, 3));
    const prev = () => setCurrentStep((p) => Math.max(p - 1, 0));

    return (
        <div
            className="min-h-screen flex items-center justify-center p-6 relative"
            style={{ background: "var(--bg-primary)" }}
        >
            {/* Background gradient */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-[600px] h-[600px] rounded-full bg-[#0A84FF]/5 -top-60 -right-60 blur-[120px]" />
                <div className="absolute w-[500px] h-[500px] rounded-full bg-[#5E5CE6]/5 -bottom-40 -left-40 blur-[120px]" />
            </div>

            <div className="relative z-10 w-full max-w-[560px]">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2.5 justify-center mb-10">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0A84FF] to-[#5E5CE6] flex items-center justify-center">
                        <span className="text-white font-bold">G</span>
                    </div>
                    <span className="font-bold text-lg text-[var(--text-primary)]">GlobalLife AI</span>
                </Link>

                {/* Progress */}
                <div className="flex items-center gap-2 mb-8">
                    {steps.map((step, i) => (
                        <div key={i} className="flex-1 flex items-center gap-2">
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-all ${i < currentStep
                                        ? "bg-[#30D158] text-white"
                                        : i === currentStep
                                            ? "bg-[var(--color-primary)] text-white"
                                            : "bg-[var(--surface)] text-[var(--text-tertiary)] border border-[var(--border)]"
                                    }`}
                            >
                                {i < currentStep ? <Check className="w-4 h-4" /> : i + 1}
                            </div>
                            {i < 3 && (
                                <div className="flex-1 h-1 rounded-full bg-[var(--surface)]">
                                    <div
                                        className="h-full rounded-full bg-[var(--color-primary)] transition-all duration-500"
                                        style={{ width: i < currentStep ? "100%" : "0%" }}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Card */}
                <div className="rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] p-8 shadow-xl">
                    <AnimatePresence mode="wait">
                        {/* Step 1: Personal */}
                        {currentStep === 0 && (
                            <motion.div
                                key="step0"
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }}
                            >
                                <h2 className="text-h2 text-[var(--text-primary)] mb-2">Hadi tanışalım! 👋</h2>
                                <p className="text-body text-[var(--text-secondary)] mb-6">Seni daha iyi tanımamız için birkaç bilgi</p>

                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium text-[var(--text-primary)] mb-1.5 block">Adın</label>
                                        <input
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="İsminiz"
                                            className="w-full px-4 py-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none focus:border-[var(--color-primary)] text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-[var(--text-primary)] mb-3 block">Hedefin ne?</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {goals.map((goal) => (
                                                <button
                                                    key={goal.title}
                                                    onClick={() => toggleGoal(goal.title)}
                                                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border text-center transition-all ${selectedGoals.includes(goal.title)
                                                            ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5 shadow-sm"
                                                            : "border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-hover)]"
                                                        }`}
                                                >
                                                    <span className="text-2xl">{goal.emoji}</span>
                                                    <span className="text-xs font-semibold text-[var(--text-primary)]">{goal.title}</span>
                                                    <span className="text-[10px] text-[var(--text-tertiary)]">{goal.desc}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 2: Goals */}
                        {currentStep === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }}
                            >
                                <h2 className="text-h2 text-[var(--text-primary)] mb-2">Hangi dil? 🌍</h2>
                                <p className="text-body text-[var(--text-secondary)] mb-6">Öğrenmek istediğin dili seç</p>

                                <div className="grid grid-cols-2 gap-3 mb-6">
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.name}
                                            onClick={() => setSelectedLanguage(lang.name)}
                                            className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${selectedLanguage === lang.name
                                                    ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5"
                                                    : "border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-hover)]"
                                                }`}
                                        >
                                            <span className="text-2xl">{lang.flag}</span>
                                            <span className="text-sm font-medium text-[var(--text-primary)]">{lang.name}</span>
                                        </button>
                                    ))}
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-[var(--text-primary)] mb-3 block">Mevcut seviyen</label>
                                    <div className="space-y-2">
                                        {levels.map((level) => (
                                            <button
                                                key={level}
                                                onClick={() => setSelectedLevel(level)}
                                                className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${selectedLevel === level
                                                        ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5 font-semibold text-[var(--color-primary)]"
                                                        : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]"
                                                    }`}
                                            >
                                                {level}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 3: Details */}
                        {currentStep === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }}
                            >
                                <h2 className="text-h2 text-[var(--text-primary)] mb-2">Hedef ülke 🗺️</h2>
                                <p className="text-body text-[var(--text-secondary)] mb-6">Gitmek istediğin ülkeyi seç</p>

                                <div className="grid grid-cols-2 gap-3">
                                    {countries.map((c) => (
                                        <button
                                            key={c.name}
                                            onClick={() => setSelectedCountry(c.name)}
                                            className={`flex flex-col items-center gap-2 p-5 rounded-xl border transition-all ${selectedCountry === c.name
                                                    ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5 shadow-sm"
                                                    : "border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-hover)]"
                                                }`}
                                        >
                                            <span className="text-3xl">{c.flag}</span>
                                            <span className="text-sm font-medium text-[var(--text-primary)]">{c.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Step 4: Ready */}
                        {currentStep === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-center py-4"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
                                    className="w-20 h-20 rounded-full bg-gradient-to-br from-[#0A84FF] to-[#5E5CE6] flex items-center justify-center mx-auto mb-6 text-4xl"
                                >
                                    🎉
                                </motion.div>
                                <h2 className="text-h2 text-[var(--text-primary)] mb-2">Planın Hazır!</h2>
                                <p className="text-body text-[var(--text-secondary)] mb-6">
                                    {name ? `${name}, ` : ""}AI'mız sana özel bir öğrenme planı oluşturdu
                                </p>

                                <div className="rounded-xl bg-[var(--surface)] border border-[var(--border)] p-5 text-left mb-6 space-y-3">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-[var(--text-secondary)]">Hedefler</span>
                                        <span className="font-semibold text-[var(--text-primary)]">{selectedGoals.join(", ") || "Genel"}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-[var(--text-secondary)]">Dil</span>
                                        <span className="font-semibold text-[var(--text-primary)]">{selectedLanguage || "İngilizce"}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-[var(--text-secondary)]">Seviye</span>
                                        <span className="font-semibold text-[var(--text-primary)]">{selectedLevel || "A1"}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-[var(--text-secondary)]">Hedef Ülke</span>
                                        <span className="font-semibold text-[var(--text-primary)]">{selectedCountry || "—"}</span>
                                    </div>
                                </div>

                                <Link href="/dashboard" className="btn-primary !w-full shimmer !py-3">
                                    Dashboard'a Git 🚀
                                </Link>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Navigation */}
                    {currentStep < 3 && (
                        <div className="flex items-center justify-between mt-8 pt-6 border-t border-[var(--border)]">
                            {currentStep > 0 ? (
                                <button onClick={prev} className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                                    <ArrowLeft className="w-4 h-4" /> Geri
                                </button>
                            ) : (
                                <div />
                            )}
                            <button onClick={next} className="btn-primary !py-2.5 !px-6 !text-sm">
                                Devam <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>

                <p className="text-center text-xs text-[var(--text-tertiary)] mt-6">
                    <Link href="/dashboard" className="hover:text-[var(--color-primary)] transition-colors">
                        Atla ve direkt başla →
                    </Link>
                </p>
            </div>
        </div>
    );
}
