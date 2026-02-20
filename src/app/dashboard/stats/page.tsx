"use client";

import { motion } from "framer-motion";
import { BarChart3, Clock, BookOpen, MessageCircle, Flame, TrendingUp, Calendar, Globe } from "lucide-react";

const monthlyData = [
    { month: "Eyl", lessons: 12, hours: 6 },
    { month: "Eki", lessons: 18, hours: 9 },
    { month: "Kas", lessons: 24, hours: 12 },
    { month: "Ara", lessons: 20, hours: 10 },
    { month: "Oca", lessons: 30, hours: 15 },
    { month: "Şub", lessons: 28, hours: 14 },
];

const maxLessons = Math.max(...monthlyData.map((d) => d.lessons));

export default function StatsPage() {
    return (
        <div className="max-w-[1100px] mx-auto space-y-6">
            <div>
                <h1 className="text-h2 text-[var(--text-primary)] mb-2">İstatistikler</h1>
                <p className="text-body text-[var(--text-secondary)]">Tüm platform kullanım verileriniz</p>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { icon: Clock, label: "Toplam Süre", value: "68 saat", sub: "Bu ay: 14 saat", color: "#0A84FF" },
                    { icon: BookOpen, label: "Dil Dersleri", value: "127", sub: "Bu ay: 28", color: "#5E5CE6" },
                    { icon: MessageCircle, label: "AI Mesajlar", value: "2,340", sub: "Bu ay: 460", color: "#30D158" },
                    { icon: Flame, label: "Aktif Streak", value: "12 Gün", sub: "En uzun: 24 gün", color: "#FF9F0A" },
                ].map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] p-5"
                    >
                        <stat.icon className="w-5 h-5 mb-3" style={{ color: stat.color }} />
                        <p className="text-h3 text-[var(--text-primary)]">{stat.value}</p>
                        <p className="text-caption text-[var(--text-secondary)] mb-1">{stat.label}</p>
                        <p className="text-[10px] text-[var(--text-tertiary)]">{stat.sub}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Monthly Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] p-6"
                >
                    <h3 className="font-semibold text-[var(--text-primary)] flex items-center gap-2 mb-6">
                        <Calendar className="w-5 h-5 text-[#0A84FF]" /> Aylık Ders Sayısı
                    </h3>
                    <div className="flex items-end gap-4 h-[180px]">
                        {monthlyData.map((d, i) => (
                            <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                                <span className="text-xs font-semibold text-[var(--text-primary)]">{d.lessons}</span>
                                <motion.div
                                    className="w-full rounded-xl bg-gradient-to-t from-[#0A84FF] to-[#5E5CE6]"
                                    initial={{ height: 0 }}
                                    animate={{ height: `${(d.lessons / maxLessons) * 100}%` }}
                                    transition={{ delay: 0.3 + i * 0.08, duration: 0.6 }}
                                />
                                <span className="text-[10px] text-[var(--text-tertiary)] font-medium">{d.month}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Usage Breakdown */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] p-6"
                >
                    <h3 className="font-semibold text-[var(--text-primary)] flex items-center gap-2 mb-6">
                        <BarChart3 className="w-5 h-5 text-[#5E5CE6]" /> Kullanım Dağılımı
                    </h3>
                    <div className="space-y-4">
                        {[
                            { label: "AI Dil Dersleri", pct: 45, color: "#0A84FF", value: "30.6 saat" },
                            { label: "AI Vize Chat", pct: 25, color: "#5E5CE6", value: "17 saat" },
                            { label: "Döküman Analizi", pct: 15, color: "#30D158", value: "10.2 saat" },
                            { label: "Sesli Görüşme", pct: 10, color: "#FF9F0A", value: "6.8 saat" },
                            { label: "Diğer", pct: 5, color: "#86868B", value: "3.4 saat" },
                        ].map((item, i) => (
                            <div key={item.label}>
                                <div className="flex items-center justify-between text-sm mb-1.5">
                                    <span className="text-[var(--text-secondary)]">{item.label}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-[var(--text-tertiary)]">{item.value}</span>
                                        <span className="font-semibold text-[var(--text-primary)]">{item.pct}%</span>
                                    </div>
                                </div>
                                <div className="h-2 rounded-full bg-[var(--surface)]">
                                    <motion.div
                                        className="h-full rounded-full"
                                        style={{ background: item.color }}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${item.pct}%` }}
                                        transition={{ delay: 0.4 + i * 0.08, duration: 0.5 }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Comparison */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-2xl bg-gradient-to-r from-[#0A84FF]/10 to-[#5E5CE6]/10 border border-[#0A84FF]/20 p-6"
            >
                <h3 className="font-semibold text-[var(--text-primary)] flex items-center gap-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-[#30D158]" /> Geçen Aya Göre
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { label: "Ders Sayısı", change: "+40%", positive: true },
                        { label: "Çalışma Süresi", change: "+25%", positive: true },
                        { label: "Speaking Skoru", change: "+12", positive: true },
                        { label: "Yeni Kelime", change: "+180", positive: true },
                    ].map((item) => (
                        <div key={item.label} className="text-center">
                            <p className={`text-xl font-bold ${item.positive ? "text-[#30D158]" : "text-[#FF453A]"}`}>
                                {item.change}
                            </p>
                            <p className="text-xs text-[var(--text-secondary)] mt-1">{item.label}</p>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
