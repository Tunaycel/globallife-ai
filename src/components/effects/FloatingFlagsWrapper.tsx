"use client";

import dynamic from "next/dynamic";

const FloatingFlags = dynamic(() => import("@/components/effects/FloatingFlags"), {
    ssr: false,
});

export default function FloatingFlagsWrapper() {
    return <FloatingFlags />;
}
