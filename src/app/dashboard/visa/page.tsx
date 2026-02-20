"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const countries = [
    { flag: "🇩🇪", name: "Almanya", popular: true },
    { flag: "🇳🇱", name: "Hollanda", popular: true },
    { flag: "🇬🇧", name: "İngiltere", popular: true },
    { flag: "🇺🇸", name: "ABD", popular: true },
    { flag: "🇨🇦", name: "Kanada", popular: true },
    { flag: "🇦🇺", name: "Avustralya", popular: true },
    { flag: "🇫🇷", name: "Fransa", popular: false },
    { flag: "🇮🇹", name: "İtalya", popular: false },
    { flag: "🇪🇸", name: "İspanya", popular: false },
    { flag: "🇸🇪", name: "İsveç", popular: false },
    { flag: "🇳🇴", name: "Norveç", popular: false },
    { flag: "🇦🇹", name: "Avusturya", popular: false },
    { flag: "🇮🇪", name: "İrlanda", popular: false },
    { flag: "🇵🇱", name: "Polonya", popular: false },
    { flag: "🇯🇵", name: "Japonya", popular: false },
    { flag: "🇰🇷", name: "G. Kore", popular: false },
];

const visaTypes = [
    { emoji: "🎓", title: "Öğrenci Vizesi", desc: "Eğitim amaçlı uzun süreli" },
    { emoji: "💼", title: "Çalışma Vizesi", desc: "İş ve kariyer amaçlı" },
    { emoji: "🏖️", title: "Turist Vizesi", desc: "Schengen / kısa süreli" },
    { emoji: "🏠", title: "Aile Birleşimi", desc: "Aile yanına yerleşme" },
    { emoji: "🏡", title: "Kalıcı Oturma", desc: "PR / kalıcı izin" },
    { emoji: "💍", title: "Partner Vizesi", desc: "Evlilik / birliktelik" },
    { emoji: "🏢", title: "Yatırımcı Vizesi", desc: "Girişimci / yatırımcı" },
    { emoji: "🔄", title: "Transit Vize", desc: "Aktarma / geçiş" },
];

export default function VisaPage() {
    return (
        <div className="max-w-[1100px] mx-auto space-y-8">
            <div>
                <h1 className="text-h2 text-[var(--text-primary)] mb-2">Vize & Göç Danışmanlık</h1>
                <p className="text-body text-[var(--text-secondary)]">Hedef ülkeni ve vize türünü seç, AI danışmanın hazır</p>
            </div>

            {/* Popular Countries */}
            <div>
                <h2 className="text-h3 text-[var(--text-primary)] mb-4">Popüler Ülkeler</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    {countries.filter(c => c.popular).map((country, i) => (
                        <motion.div
                            key={country.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                        >
                            <Link
                                href="/dashboard/visa/chat"
                                className="flex flex-col items-center gap-2 p-5 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] hover:-translate-y-1 hover:shadow-lg hover:border-[var(--color-primary)]/30 transition-all duration-300"
                            >
                                <span className="text-4xl">{country.flag}</span>
                                <span className="text-sm font-medium text-[var(--text-primary)]">{country.name}</span>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* All Countries */}
            <div>
                <h2 className="text-h3 text-[var(--text-primary)] mb-4">Tüm Ülkeler</h2>
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 gap-2">
                    {countries.filter(c => !c.popular).map((country, i) => (
                        <Link
                            key={country.name}
                            href="/dashboard/visa/chat"
                            className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)] hover:bg-[var(--surface-hover)] transition-all text-center"
                        >
                            <span className="text-2xl">{country.flag}</span>
                            <span className="text-xs text-[var(--text-secondary)]">{country.name}</span>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Visa Types */}
            <div>
                <h2 className="text-h3 text-[var(--text-primary)] mb-4">Vize Türleri</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {visaTypes.map((type, i) => (
                        <motion.div
                            key={type.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + i * 0.05 }}
                        >
                            <Link
                                href="/dashboard/visa/chat"
                                className="block p-5 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                            >
                                <span className="text-3xl block mb-3">{type.emoji}</span>
                                <h3 className="font-semibold text-sm text-[var(--text-primary)] mb-1">{type.title}</h3>
                                <p className="text-xs text-[var(--text-secondary)]">{type.desc}</p>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
