"use client";

import dynamic from "next/dynamic";

const AIChatBot = dynamic(() => import("@/components/chat/AIChatBot"), {
    ssr: false,
});

export default function ChatBotWrapper() {
    return <AIChatBot />;
}
