"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, Plane, TrendingUp, Trophy, Flame, Calendar, Lightbulb, ArrowRight } from "lucide-react";

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
};

export default function DashboardPage() {
    return (
        <div className="max-w-[1100px] mx-auto space-y-6">
            {/* Welcome */}
            <motion.div {...fadeInUp} transition={{ duration: 0.4 }}>
                <h1 className="text-h2 text-[var(--text-primary)]">Merhaba, Kullanıcı! 👋</h1>
                <p className="text-body text-[var(--text-secondary)] mt-1">
                    {new Date().toLocaleDateString("tr-TR", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                </p>
            </motion.div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Daily Goal */}
                <motion.div
                    {...fadeInUp}
                    transition={{ delay: 0.1 }}
                    className="lg:col-span-2 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] p-6"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-[var(--text-primary)] flex items-center gap-2">
                            🎯 Günlük Hedef
                        </h3>
                        <span className="text-caption text-[var(--text-secondary)]">3/5 tamamlandı</span>
                    </div>
                    <div className="flex items-center gap-6">
                        {/* Circular Progress */}
                        <div className="relative w-24 h-24 shrink-0">
                            <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="42" fill="none" stroke="var(--border)" strokeWidth="8" />
                                <motion.circle
                                    cx="50" cy="50" r="42" fill="none" stroke="#0A84FF" strokeWidth="8"
                                    strokeLinecap="round"
                                    strokeDasharray={264}
                                    initial={{ strokeDashoffset: 264 }}
                                    animate={{ strokeDashoffset: 264 * 0.4 }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                />
                            </svg>
                            <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-[var(--text-primary)]">60%</span>
                        </div>
                        <div className="space-y-2 flex-1">
                            {["AI Ders tamamla", "10 kelime öğren", "Speaking pratiği yap", "Belge yükle", "Günlük quizi çöz"].map((task, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm">
                                    <div className={`w-4 h-4 rounded-md flex items-center justify-center text-[10px] ${i < 3 ? "bg-[#30D158] text-white" : "border border-[var(--text-tertiary)]"}`}>
                                        {i < 3 && "✓"}
                                    </div>
                                    <span className={i < 3 ? "text-[var(--text-secondary)] line-through" : "text-[var(--text-primary)]"}>{task}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Streak */}
                <motion.div
                    {...fadeInUp}
                    transition={{ delay: 0.15 }}
                    className="lg:col-span-2 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] p-6"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-[var(--text-primary)] flex items-center gap-2">
                            <Flame className="w-5 h-5 text-[#FF9F0A]" /> Streak
                        </h3>
                        <span className="text-2xl font-bold text-[#FF9F0A]">12 Gün 🔥</span>
                    </div>
                    <div className="grid grid-cols-7 gap-1.5">
                        {Array.from({ length: 28 }).map((_, i) => {
                            const active = Math.random() > 0.3;
                            return (
                                <div
                                    key={i}
                                    className={`aspect-square rounded-sm ${active
                                            ? "bg-[#30D158]" + (Math.random() > 0.5 ? "/80" : "")
                                            : "bg-[var(--surface)]"
                                        }`}
                                    title={active ? "Aktif" : "Eksik"}
                                />
                            );
                        })}
                    </div>
                    <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-[var(--text-tertiary)]">4 hafta önce</span>
                        <span className="text-xs text-[var(--text-tertiary)]">Bugün</span>
                    </div>
                </motion.div>

                {/* Language Progress */}
                <motion.div
                    {...fadeInUp}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-2 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] p-6"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-[var(--text-primary)] flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-[#0A84FF]" /> Dil Öğrenme
                        </h3>
                        <span className="px-2.5 py-1 rounded-full bg-[#0A84FF]/10 text-[#0A84FF] text-xs font-semibold">B1</span>
                    </div>
                    <div className="space-y-3">
                        <div>
                            <div className="flex items-center justify-between text-sm mb-1.5">
                                <span className="text-[var(--text-secondary)]">İngilizce İlerleme</span>
                                <span className="font-semibold text-[var(--text-primary)]">62%</span>
                            </div>
                            <div className="h-2 rounded-full bg-[var(--surface)]">
                                <motion.div
                                    className="h-full rounded-full bg-gradient-to-r from-[#0A84FF] to-[#5E5CE6]"
                                    initial={{ width: 0 }}
                                    animate={{ width: "62%" }}
                                    transition={{ duration: 1, delay: 0.3 }}
                                />
                            </div>
                        </div>
                        <p className="text-caption text-[var(--text-secondary)]">Son ders: Serbest Konuşma — 45 dk</p>
                        <Link
                            href="/dashboard/language"
                            className="btn-primary !py-2.5 !px-5 !text-sm w-full text-center"
                        >
                            Derse Devam Et →
                        </Link>
                    </div>
                </motion.div>

                {/* Visa Status */}
                <motion.div
                    {...fadeInUp}
                    transition={{ delay: 0.25 }}
                    className="lg:col-span-2 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] p-6"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-[var(--text-primary)] flex items-center gap-2">
                            <Plane className="w-5 h-5 text-[#5E5CE6]" /> Vize Durumu
                        </h3>
                        <span className="text-lg">🇩🇪</span>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 text-sm">
                            <span className="text-[var(--text-secondary)]">Almanya — Öğrenci Vizesi</span>
                        </div>
                        <div className="space-y-2">
                            {["Üniversite Araştırma", "Dil Yeterliliği", "Belgeler", "Randevu"].map((step, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm">
                                    <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${i < 2 ? "bg-[#30D158] text-white" : i === 2 ? "bg-[#0A84FF] text-white" : "border border-[var(--text-tertiary)]"
                                        }`}>
                                        {i < 2 ? "✓" : i === 2 ? "•" : ""}
                                    </div>
                                    <span className={i < 2 ? "text-[var(--text-secondary)]" : "text-[var(--text-primary)]"}>{step}</span>
                                    {i === 2 && <span className="ml-auto text-xs text-[#0A84FF] font-medium">%60</span>}
                                </div>
                            ))}
                        </div>
                        <Link
                            href="/dashboard/visa/roadmap"
                            className="btn-ghost !py-2.5 !px-5 !text-sm w-full text-center"
                        >
                            Devam Et →
                        </Link>
                    </div>
                </motion.div>

                {/* Achievements */}
                <motion.div
                    {...fadeInUp}
                    transition={{ delay: 0.3 }}
                    className="rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] p-6"
                >
                    <h3 className="font-semibold text-[var(--text-primary)] flex items-center gap-2 mb-4">
                        <Trophy className="w-5 h-5 text-[#FF9F0A]" /> Son Başarılar
                    </h3>
                    <div className="space-y-3">
                        {[
                            { emoji: "🏆", text: "10 Ders Tamamlandı", date: "2 gün önce" },
                            { emoji: "⭐", text: "İlk IELTS Mock", date: "5 gün önce" },
                            { emoji: "🔥", text: "7 Gün Streak", date: "1 hafta önce" },
                        ].map((badge, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <span className="text-xl">{badge.emoji}</span>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium text-[var(--text-primary)] truncate">{badge.text}</p>
                                    <p className="text-[10px] text-[var(--text-tertiary)]">{badge.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* AI Recommendations */}
                <motion.div
                    {...fadeInUp}
                    transition={{ delay: 0.35 }}
                    className="lg:col-span-3 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] p-6"
                >
                    <h3 className="font-semibold text-[var(--text-primary)] flex items-center gap-2 mb-4">
                        <Lightbulb className="w-5 h-5 text-[#FF9F0A]" /> AI Önerileri
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                        {[
                            { emoji: "🎯", title: "IELTS Speaking Part 2 çalış", desc: "Bu hafta speaking pratiğin düşük, Part 2 cue card'lara odaklan." },
                            { emoji: "📄", title: "Banka dökümünü yükle", desc: "Schengen belgelerinden 3 tanesi eksik. Banka dökümü ile başla." },
                            { emoji: "📖", title: "Kelime çalışması yap", desc: "Dünkü derste 8 yeni kelime öğrendin. Tekrar zamanı!" },
                            { emoji: "🗣️", title: "Telaffuz pratiği", desc: "Son derslerde 'th' sesleri skor: 65. Özel pratik önerilir." },
                        ].map((rec, i) => (
                            <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-[var(--surface)] hover:bg-[var(--surface-hover)] transition-colors cursor-pointer">
                                <span className="text-xl shrink-0">{rec.emoji}</span>
                                <div>
                                    <p className="text-sm font-medium text-[var(--text-primary)]">{rec.title}</p>
                                    <p className="text-xs text-[var(--text-secondary)] mt-0.5 line-clamp-2">{rec.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
