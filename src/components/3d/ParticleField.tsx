"use client";

import { useRef, useEffect, useCallback } from "react";
import * as THREE from "three";

export default function ParticleField() {
    const containerRef = useRef<HTMLDivElement>(null);
    const cleanupRef = useRef<(() => void) | null>(null);

    const init = useCallback(() => {
        if (!containerRef.current || cleanupRef.current) return;

        const container = containerRef.current;
        const width = container.clientWidth;
        const height = container.clientHeight;

        // Scene
        const scene = new THREE.Scene();

        // Camera
        const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
        camera.position.z = 30;
        camera.position.y = 5;

        // Renderer
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);

        // Particle geometry — Grid pattern
        const particleCount = 8000;
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);
        const originalPositions = new Float32Array(particleCount * 3);

        const cols = 80;
        const rows = 100;
        const spacing = 0.8;

        for (let i = 0; i < particleCount; i++) {
            const col = i % cols;
            const row = Math.floor(i / cols);

            const x = (col - cols / 2) * spacing;
            const z = (row - rows / 2) * spacing * 0.5;

            // Create a wave surface
            const distFromCenter = Math.sqrt(x * x + z * z);
            const y = Math.sin(distFromCenter * 0.3) * 3 * Math.exp(-distFromCenter * 0.03);

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            originalPositions[i * 3] = x;
            originalPositions[i * 3 + 1] = y;
            originalPositions[i * 3 + 2] = z;

            // Color: cyan/blue gradient based on height
            const t = (y + 3) / 6;
            colors[i * 3] = 0.04 + t * 0.3;          // R
            colors[i * 3 + 1] = 0.3 + t * 0.5;       // G
            colors[i * 3 + 2] = 0.8 + t * 0.2;       // B

            sizes[i] = 1.5 + Math.random() * 1.5;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

        // Shader material for glowing dots
        const material = new THREE.ShaderMaterial({
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true,
            uniforms: {
                uTime: { value: 0 },
                uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
            },
            vertexShader: `
        attribute float size;
        varying vec3 vColor;
        varying float vAlpha;
        uniform float uTime;
        uniform float uPixelRatio;

        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          float dist = length(mvPosition.xyz);
          vAlpha = smoothstep(50.0, 5.0, dist) * 0.9;
          gl_PointSize = size * uPixelRatio * (15.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
            fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float glow = smoothstep(0.5, 0.0, d);
          gl_FragColor = vec4(vColor * 1.5, glow * vAlpha);
        }
      `,
        });

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        // Mouse interaction
        const mouse = { x: 0, y: 0 };
        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = (e.clientX / width) * 2 - 1;
            mouse.y = -(e.clientY / height) * 2 + 1;
        };
        window.addEventListener("mousemove", handleMouseMove);

        // Resize
        const handleResize = () => {
            const w = container.clientWidth;
            const h = container.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };
        window.addEventListener("resize", handleResize);

        // Animate
        let animationId: number;
        const clock = new THREE.Clock();

        const animate = () => {
            animationId = requestAnimationFrame(animate);
            const elapsed = clock.getElapsedTime();

            material.uniforms.uTime.value = elapsed;

            // Animate the Y positions as a wave
            const posArray = geometry.attributes.position.array as Float32Array;
            for (let i = 0; i < particleCount; i++) {
                const ox = originalPositions[i * 3];
                const oz = originalPositions[i * 3 + 2];
                const dist = Math.sqrt(ox * ox + oz * oz);

                posArray[i * 3 + 1] =
                    Math.sin(dist * 0.3 - elapsed * 0.8) * 3 * Math.exp(-dist * 0.03) +
                    Math.sin(ox * 0.5 + elapsed * 0.3) * 0.5;

                // Color shift
                const t = (posArray[i * 3 + 1] + 4) / 8;
                const cArr = geometry.attributes.color.array as Float32Array;
                cArr[i * 3] = 0.04 + t * 0.4;
                cArr[i * 3 + 1] = 0.3 + t * 0.5;
                cArr[i * 3 + 2] = 0.8 + t * 0.2;
            }
            geometry.attributes.position.needsUpdate = true;
            geometry.attributes.color.needsUpdate = true;

            // Camera rotation from mouse
            camera.position.x += (mouse.x * 5 - camera.position.x) * 0.02;
            camera.position.y += (mouse.y * 3 + 8 - camera.position.y) * 0.02;
            camera.lookAt(0, 0, -5);

            renderer.render(scene, camera);
        };

        animate();

        cleanupRef.current = () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", handleResize);
            renderer.dispose();
            geometry.dispose();
            material.dispose();
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
    }, []);

    useEffect(() => {
        init();
        return () => {
            cleanupRef.current?.();
            cleanupRef.current = null;
        };
    }, [init]);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 z-0"
            style={{ background: "linear-gradient(180deg, #000000 0%, #050510 50%, #0a0a1a 100%)" }}
        />
    );
}
