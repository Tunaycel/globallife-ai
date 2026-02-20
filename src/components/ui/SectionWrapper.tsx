"use client";

import { ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
    children: ReactNode;
    className?: string;
    id?: string;
    dark?: boolean;
}

export default function SectionWrapper({
    children,
    className,
    id,
    dark,
}: SectionWrapperProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.section
            id={id}
            ref={ref}
            variants={staggerContainer}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            className={cn(
                "relative py-24 md:py-32 px-6",
                dark && "bg-[var(--bg-secondary)]",
                className
            )}
        >
            <div className="max-w-[1200px] mx-auto">{children}</div>
        </motion.section>
    );
}
