"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Globe, DollarSign, GraduationCap, Heart, Briefcase, Sun } from "lucide-react";

const countries = [
    {
        flag: "🇩🇪",
        name: "Almanya",
        desc: "Avrupa'nın en güçlü ekonomisi",
        visaTypes: ["Öğrenci", "Çalışma", "Aile"],
        lang: "Almanca / İngilizce",
        cost: "€€",
        rating: 4.8,
        highlights: ["Ücretsiz üniversite", "Güçlü iş pazarı", "Merkezi konum"],
    },
    {
        flag: "🇳🇱",
        name: "Hollanda",
        desc: "Bisiklet, lale ve yüksek yaşam kalitesi",
        visaTypes: ["Öğrenci", "Çalışma", "Girişimci"],
        lang: "Hollandaca / İngilizce",
        cost: "€€€",
        rating: 4.7,
        highlights: ["İngilizce eğitim", "Startup ekosistemi", "Çok kültürlü"],
    },
    {
        flag: "🇬🇧",
        name: "İngiltere",
        desc: "Dünya standartlarında eğitim",
        visaTypes: ["Öğrenci", "Skilled Worker", "Aile"],
        lang: "İngilizce",
        cost: "€€€€",
        rating: 4.6,
        highlights: ["Prestijli üniversiteler", "Küresel kariyer", "Kültürel çeşitlilik"],
    },
    {
        flag: "🇨🇦",
        name: "Kanada",
        desc: "Göçmen dostu politikalar",
        visaTypes: ["Express Entry", "Öğrenci", "Aile"],
        lang: "İngilizce / Fransızca",
        cost: "€€",
        rating: 4.9,
        highlights: ["PR fırsatları", "Yüksek yaşam kalitesi", "Doğa"],
    },
    {
        flag: "🇺🇸",
        name: "ABD",
        desc: "Fırsatlar ülkesi",
        visaTypes: ["F-1 Öğrenci", "H-1B Çalışma", "EB-5"],
        lang: "İngilizce",
        cost: "€€€€",
        rating: 4.5,
        highlights: ["Top üniversiteler", "Teknoloji sektörü", "Girişimcilik"],
    },
    {
        flag: "🇦🇺",
        name: "Avustralya",
        desc: "Yaşam kalitesi zirvede",
        visaTypes: ["Skilled", "Öğrenci", "Partner"],
        lang: "İngilizce",
        cost: "€€€",
        rating: 4.7,
        highlights: ["Puan sistemi", "Yüksek maaşlar", "İklim"],
    },
];

export default function CountryGuidesPage() {
    return (
        <div className="max-w-[1100px] mx-auto space-y-6">
            <div>
                <h1 className="text-h2 text-[var(--text-primary)] mb-2">Ülke Rehberleri</h1>
                <p className="text-body text-[var(--text-secondary)]">Hedef ülkenin hakkında detaylı bilgi edin</p>
            </div>

            {/* Country Cards */}
            <div className="grid md:grid-cols-2 gap-5">
                {countries.map((country, i) => (
                    <motion.div
                        key={country.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                    >
                        <Link
                            href="/dashboard/visa/chat"
                            className="block rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] p-6 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                        >
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <span className="text-4xl">{country.flag}</span>
                                    <div>
                                        <h3 className="font-semibold text-[var(--text-primary)]">{country.name}</h3>
                                        <p className="text-xs text-[var(--text-secondary)]">{country.desc}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 text-xs font-semibold text-[#FF9F0A]">
                                    ⭐ {country.rating}
                                </div>
                            </div>

                            {/* Info Grid */}
                            <div className="grid grid-cols-2 gap-3 mb-4">
                                <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                                    <Globe className="w-3.5 h-3.5" /> {country.lang}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                                    <DollarSign className="w-3.5 h-3.5" /> Yaşam: {country.cost}
                                </div>
                            </div>

                            {/* Visa Types */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {country.visaTypes.map((type) => (
                                    <span
                                        key={type}
                                        className="px-2.5 py-1 rounded-full bg-[var(--surface)] text-xs font-medium text-[var(--text-secondary)]"
                                    >
                                        {type}
                                    </span>
                                ))}
                            </div>

                            {/* Highlights */}
                            <div className="space-y-1.5">
                                {country.highlights.map((h) => (
                                    <div key={h} className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                                        <span className="text-[#30D158]">✓</span> {h}
                                    </div>
                                ))}
                            </div>

                            {/* Action */}
                            <div className="mt-4 pt-4 border-t border-[var(--border)] flex items-center justify-between">
                                <span className="text-xs text-[var(--color-primary)] font-semibold">Detaylı Rehber</span>
                                <ArrowRight className="w-4 h-4 text-[var(--color-primary)]" />
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
