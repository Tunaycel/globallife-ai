"use client";

import { useEffect, useRef } from "react";

export default function MatrixRain() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let w = (canvas.width = window.innerWidth);
        let h = (canvas.height = window.innerHeight);

        // Characters for the matrix rain (Katakana + Numbers + Latin)
        const katakana =
            "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポ";
        const latin = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const nums = "0123456789";
        const alphabet = katakana + latin + nums;

        const fontSize = 16;
        const columns = Math.ceil(w / fontSize);
        const drops = Array(columns).fill(1);

        // Brighter, glitchy colors
        const colors = ["#00DC82", "#00E5FF", "#50fa7b", "#8be9fd"];

        const draw = () => {
            // Semi-transparent black for trail effect
            ctx.fillStyle = "rgba(3, 3, 8, 0.08)";
            ctx.fillRect(0, 0, w, h);

            ctx.font = `bold ${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));

                // Random color selection for glitch effect
                ctx.fillStyle = Math.random() > 0.95 ? "#FFF" : colors[Math.floor(Math.random() * colors.length)];

                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > h && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        let animationId: number;
        const animate = () => {
            draw();
            animationId = requestAnimationFrame(animate);
        };
        animate();

        const handleResize = () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", handleResize);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-40" />;
}
