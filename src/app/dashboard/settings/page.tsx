"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Bell, Globe, Moon, Shield, CreditCard, LogOut, ChevronRight } from "lucide-react";

export default function SettingsPage() {
    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState(true);
    const [language, setLanguage] = useState("tr");

    return (
        <div className="max-w-[700px] mx-auto space-y-6">
            <h1 className="text-h2 text-[var(--text-primary)]">Ayarlar</h1>

            {/* Profile */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] p-6"
            >
                <h2 className="font-semibold text-[var(--text-primary)] flex items-center gap-2 mb-4">
                    <User className="w-5 h-5" /> Profil
                </h2>
                <div className="flex items-center gap-4 mb-5">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0A84FF] to-[#5E5CE6] flex items-center justify-center text-2xl text-white font-bold">
                        U
                    </div>
                    <div>
                        <p className="font-semibold text-[var(--text-primary)]">Kullanıcı</p>
                        <p className="text-caption text-[var(--text-secondary)]">user@email.com</p>
                        <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-[#0A84FF]/10 text-[#0A84FF] text-xs font-semibold">Premium</span>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                        <label className="text-xs font-medium text-[var(--text-secondary)] mb-1 block">İsim</label>
                        <input
                            defaultValue="Kullanıcı"
                            className="w-full px-3 py-2.5 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-sm text-[var(--text-primary)] outline-none focus:border-[var(--color-primary)] transition-colors"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-medium text-[var(--text-secondary)] mb-1 block">Email</label>
                        <input
                            defaultValue="user@email.com"
                            className="w-full px-3 py-2.5 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-sm text-[var(--text-primary)] outline-none focus:border-[var(--color-primary)] transition-colors"
                        />
                    </div>
                </div>
            </motion.div>

            {/* Preferences */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] p-6 space-y-4"
            >
                <h2 className="font-semibold text-[var(--text-primary)] flex items-center gap-2 mb-2">
                    <Globe className="w-5 h-5" /> Tercihler
                </h2>

                {/* Language */}
                <div className="flex items-center justify-between py-2">
                    <div>
                        <p className="text-sm font-medium text-[var(--text-primary)]">Dil</p>
                        <p className="text-xs text-[var(--text-tertiary)]">Platform arayüz dili</p>
                    </div>
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="px-3 py-2 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-sm text-[var(--text-primary)] outline-none"
                    >
                        <option value="tr">🇹🇷 Türkçe</option>
                        <option value="en">🇬🇧 English</option>
                    </select>
                </div>

                {/* Dark Mode */}
                <div className="flex items-center justify-between py-2 border-t border-[var(--border)]">
                    <div>
                        <p className="text-sm font-medium text-[var(--text-primary)]">Karanlık Mod</p>
                        <p className="text-xs text-[var(--text-tertiary)]">Göz yorgunluğunu azaltır</p>
                    </div>
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className={`relative w-12 h-7 rounded-full transition-colors ${darkMode ? "bg-[var(--color-primary)]" : "bg-[var(--surface)]"}`}
                    >
                        <div
                            className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${darkMode ? "left-6" : "left-1"}`}
                        />
                    </button>
                </div>

                {/* Notifications */}
                <div className="flex items-center justify-between py-2 border-t border-[var(--border)]">
                    <div>
                        <p className="text-sm font-medium text-[var(--text-primary)]">Bildirimler</p>
                        <p className="text-xs text-[var(--text-tertiary)]">E-posta ve uygulama bildirimleri</p>
                    </div>
                    <button
                        onClick={() => setNotifications(!notifications)}
                        className={`relative w-12 h-7 rounded-full transition-colors ${notifications ? "bg-[var(--color-primary)]" : "bg-[var(--surface)]"}`}
                    >
                        <div
                            className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${notifications ? "left-6" : "left-1"}`}
                        />
                    </button>
                </div>
            </motion.div>

            {/* Subscription */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] p-6"
            >
                <h2 className="font-semibold text-[var(--text-primary)] flex items-center gap-2 mb-4">
                    <CreditCard className="w-5 h-5" /> Abonelik
                </h2>
                <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-[#0A84FF]/10 to-[#5E5CE6]/10 border border-[#0A84FF]/20 mb-3">
                    <div>
                        <p className="text-sm font-semibold text-[var(--text-primary)]">Premium Plan</p>
                        <p className="text-xs text-[var(--text-secondary)]">₺299/ay • Yenileme: 15 Mart 2026</p>
                    </div>
                    <button className="btn-ghost !py-2 !px-4 !text-xs">Planı Değiştir</button>
                </div>
            </motion.div>

            {/* Security */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] p-6 space-y-3"
            >
                <h2 className="font-semibold text-[var(--text-primary)] flex items-center gap-2 mb-2">
                    <Shield className="w-5 h-5" /> Güvenlik
                </h2>
                {["Şifreyi Değiştir", "İki Faktörlü Doğrulama", "Aktif Oturumlar", "Veri Dışa Aktarma"].map((item) => (
                    <button key={item} className="w-full flex items-center justify-between py-3 px-1 text-sm text-[var(--text-primary)] hover:text-[var(--color-primary)] transition-colors border-b border-[var(--border)] last:border-0">
                        {item}
                        <ChevronRight className="w-4 h-4 text-[var(--text-tertiary)]" />
                    </button>
                ))}
            </motion.div>

            {/* Logout */}
            <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#FF453A]/10 border border-[#FF453A]/20 text-[#FF453A] text-sm font-semibold hover:bg-[#FF453A]/20 transition-colors">
                <LogOut className="w-4 h-4" /> Çıkış Yap
            </button>
        </div>
    );
}
