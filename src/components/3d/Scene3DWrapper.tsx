"use client";

import dynamic from "next/dynamic";

const SceneBackground = dynamic(() => import("@/components/3d/SceneBackground"), {
    ssr: false,
    loading: () => <div className="fixed inset-0 z-0" style={{ background: "#030308" }} />,
});

export default function Scene3DWrapper() {
    return <SceneBackground />;
}
