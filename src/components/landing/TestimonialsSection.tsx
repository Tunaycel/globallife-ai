"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
    {
        name: "Elif Kılıç",
        role: "Software Engineer, Berlin",
        text: "GlobalLife AI completely transformed my immigration journey. The AI consultant helped me navigate the Blue Card process with precision. What would have taken months of research, I accomplished in weeks.",
        rating: 5,
    },
    {
        name: "Mehmet Arslan",
        role: "Graduate Student, London",
        text: "The IELTS preparation was unlike anything I've tried before. The AI tutor identified my weak points in speaking and created targeted exercises. Went from 6.0 to 7.5 in just two months.",
        rating: 5,
    },
    {
        name: "Anna Kowalski",
        role: "Digital Nomad, Amsterdam",
        text: "As a Polish citizen moving to the Netherlands, the platform guided me through the entire registration and housing process. The document vault feature saved me from losing critical paperwork.",
        rating: 5,
    },
    {
        name: "Yusuf Demirci",
        role: "Entrepreneur, Toronto",
        text: "The Express Entry point calculator and document preparation were incredibly accurate. My application was approved on the first attempt. Worth every penny of the Professional plan.",
        rating: 5,
    },
];

export default function TestimonialsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [current, setCurrent] = useState(0);

    const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
    const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    return (
        <section
            ref={ref}
            className="relative py-24 overflow-hidden"
            style={{ background: "transparent" }}
        >
            <div className="relative z-10 max-w-[800px] mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-14">
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        className="text-xs font-medium uppercase tracking-[0.2em] mb-4"
                        style={{ color: "rgba(255,255,255,0.3)" }}
                    >
                        Testimonials
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        className="text-3xl md:text-4xl font-bold text-white tracking-tight"
                    >
                        Trusted by Thousands
                    </motion.h2>
                </div>

                {/* Testimonial Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 }}
                    className="relative"
                >
                    <div
                        className="rounded-2xl p-8 md:p-10 text-center relative overflow-hidden"
                        style={{
                            background: "rgba(255,255,255,0.02)",
                            border: "1px solid rgba(255,255,255,0.06)",
                        }}
                    >
                        {/* Quote icon */}
                        <Quote className="w-8 h-8 mx-auto mb-6 opacity-20 text-[#0A84FF]" />

                        {/* Stars */}
                        <div className="flex items-center justify-center gap-1 mb-6">
                            {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-[#FFD60A] text-[#FFD60A]" />
                            ))}
                        </div>

                        {/* Text */}
                        <p className="text-lg md:text-xl leading-relaxed mb-8 font-light" style={{ color: "rgba(255,255,255,0.7)" }}>
                            &ldquo;{testimonials[current].text}&rdquo;
                        </p>

                        {/* Author */}
                        <div>
                            <div
                                className="w-12 h-12 rounded-full mx-auto mb-3"
                                style={{
                                    background: `linear-gradient(135deg, hsl(${current * 80 + 200}, 60%, 50%), hsl(${current * 80 + 240}, 50%, 40%))`,
                                }}
                            />
                            <p className="font-semibold text-white">{testimonials[current].name}</p>
                            <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                                {testimonials[current].role}
                            </p>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-center gap-4 mt-6">
                        <button
                            onClick={prev}
                            className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors hover:bg-[rgba(255,255,255,0.06)]"
                            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                        >
                            <ChevronLeft className="w-4 h-4 text-[rgba(255,255,255,0.5)]" />
                        </button>

                        <div className="flex gap-2">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrent(i)}
                                    className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-[#0A84FF] w-6" : "bg-[rgba(255,255,255,0.15)]"
                                        }`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={next}
                            className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors hover:bg-[rgba(255,255,255,0.06)]"
                            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                        >
                            <ChevronRight className="w-4 h-4 text-[rgba(255,255,255,0.5)]" />
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
