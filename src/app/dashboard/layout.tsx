"use client";

import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Home, MessageCircle, BookOpen, GraduationCap, Award, FileText,
    Globe2, Map, BarChart3, Settings, ChevronLeft, Bell, Search,
    User, LogOut, Plane, Headphones, Menu, X
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
    { icon: Home, label: "Ana Sayfa", href: "/dashboard", group: "main" },
    {
        icon: BookOpen, label: "Dil Öğrenme", href: "/dashboard/language", group: "language",
        children: [
            { label: "AI Ders", href: "/dashboard/language" },
            { label: "IELTS Hazırlık", href: "/dashboard/language/ielts" },
            { label: "İlerleme", href: "/dashboard/language/progress" },
        ],
    },
    {
        icon: Plane, label: "Vize & Göç", href: "/dashboard/visa", group: "visa",
        children: [
            { label: "AI Danışman", href: "/dashboard/visa/chat" },
            { label: "Döküman Merkezi", href: "/dashboard/visa/documents" },
            { label: "Yol Haritam", href: "/dashboard/visa/roadmap" },
            { label: "Ülke Rehberleri", href: "/dashboard/visa/countries" },
        ],
    },
    { icon: MessageCircle, label: "AI Asistan", href: "/dashboard/assistant", group: "main" },
    { icon: Headphones, label: "Canlı Destek", href: "/dashboard/support/voice", group: "main" },
    { icon: BarChart3, label: "İstatistikler", href: "/dashboard/stats", group: "main" },
    { icon: Settings, label: "Ayarlar", href: "/dashboard/settings", group: "settings" },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const pathname = usePathname();

    const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
        <div
            className={cn(
                "h-full flex flex-col bg-[var(--bg-primary)] border-r border-[var(--border)]",
                !mobile && (collapsed ? "w-[68px]" : "w-[260px]"),
                mobile && "w-[280px]"
            )}
        >
            {/* Logo */}
            <div className="h-16 flex items-center gap-2.5 px-4 border-b border-[var(--border)] shrink-0">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0A84FF] to-[#5E5CE6] flex items-center justify-center shrink-0">
                    <span className="text-white font-bold text-sm">G</span>
                </div>
                {(!collapsed || mobile) && (
                    <span className="font-bold text-sm text-[var(--text-primary)]">GlobalLife AI</span>
                )}
            </div>

            {/* Nav */}
            <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
                {sidebarItems.map((item) => {
                    const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
                    const Icon = item.icon;

                    return (
                        <div key={item.label}>
                            <Link
                                href={item.href}
                                onClick={mobile ? () => setMobileOpen(false) : undefined}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                                    isActive
                                        ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)]"
                                )}
                            >
                                <Icon className="w-[18px] h-[18px] shrink-0" />
                                {(!collapsed || mobile) && <span>{item.label}</span>}
                            </Link>

                            {/* Children */}
                            {(!collapsed || mobile) && item.children && isActive && (
                                <div className="ml-9 mt-1 space-y-0.5">
                                    {item.children.map((child) => (
                                        <Link
                                            key={child.label}
                                            href={child.href}
                                            onClick={mobile ? () => setMobileOpen(false) : undefined}
                                            className={cn(
                                                "block px-3 py-2 rounded-lg text-xs font-medium transition-colors",
                                                pathname === child.href
                                                    ? "text-[var(--color-primary)] bg-[var(--color-primary)]/5"
                                                    : "text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]"
                                            )}
                                        >
                                            {child.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </nav>

            {/* Profile */}
            {(!collapsed || mobile) && (
                <div className="p-3 border-t border-[var(--border)]">
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[var(--surface)]">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0A84FF] to-[#5E5CE6] flex items-center justify-center text-white text-xs font-bold">
                            U
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-[var(--text-primary)] truncate">Kullanıcı</p>
                            <p className="text-[10px] text-[var(--text-tertiary)]">Premium</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Collapse toggle (desktop only) */}
            {!mobile && (
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="absolute top-[72px] -right-3 w-6 h-6 rounded-full bg-[var(--surface-elevated)] border border-[var(--border)] flex items-center justify-center hover:bg-[var(--surface-hover)] transition-colors z-10"
                >
                    <ChevronLeft className={cn("w-3 h-3 text-[var(--text-tertiary)] transition-transform", collapsed && "rotate-180")} />
                </button>
            )}
        </div>
    );

    return (
        <div className="h-screen flex overflow-hidden bg-[var(--bg-secondary)]">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block relative shrink-0 transition-all duration-300">
                <Sidebar />
            </div>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileOpen(false)}
                            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                        />
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="fixed left-0 top-0 bottom-0 z-50 lg:hidden"
                        >
                            <Sidebar mobile />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Bar */}
                <header className="h-16 bg-[var(--bg-primary)] border-b border-[var(--border)] flex items-center justify-between px-6 shrink-0">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setMobileOpen(true)}
                            className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-[var(--surface)] transition-colors"
                        >
                            <Menu className="w-5 h-5 text-[var(--text-primary)]" />
                        </button>
                        <div className="hidden sm:flex items-center gap-3 bg-[var(--surface)] rounded-xl px-4 py-2 w-[280px]">
                            <Search className="w-4 h-4 text-[var(--text-tertiary)]" />
                            <input
                                type="text"
                                placeholder="Ara..."
                                className="bg-transparent text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none w-full"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="relative p-2 rounded-lg hover:bg-[var(--surface)] transition-colors">
                            <Bell className="w-5 h-5 text-[var(--text-secondary)]" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FF453A]" />
                        </button>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0A84FF] to-[#5E5CE6] flex items-center justify-center text-white text-xs font-bold cursor-pointer">
                            U
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
