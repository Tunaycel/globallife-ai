"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";

interface Globe3DProps {
  size?: number;
  className?: string;
}

export default function Globe3D({ size = 40, className = "" }: Globe3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const w = size;
    const h = size;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.z = 2.6;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x334466, 1.2);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 2.5);
    sunLight.position.set(5, 3, 5);
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0x0A84FF, 0.8);
    rimLight.position.set(-3, 0, -3);
    scene.add(rimLight);

    // Earth sphere with real texture
    const sphereGeo = new THREE.SphereGeometry(1, 64, 64);
    const textureLoader = new THREE.TextureLoader();

    // Load Earth textures
    const earthMat = new THREE.MeshPhongMaterial({
      color: 0x2244aa,
      emissive: 0x112244,
      emissiveIntensity: 0.15,
      shininess: 25,
      transparent: false,
    });

    const earth = new THREE.Mesh(sphereGeo, earthMat);
    globeGroup.add(earth);

    // Load real Earth texture
    textureLoader.load(
      "https://unpkg.com/three-globe@2.31.1/example/img/earth-night.jpg",
      (texture) => {
        earthMat.map = texture;
        earthMat.color = new THREE.Color(0xffffff);
        earthMat.emissive = new THREE.Color(0x000000);
        earthMat.needsUpdate = true;
      },
      undefined,
      () => {
        // Fallback: try alternative texture
        textureLoader.load(
          "https://unpkg.com/three-globe@2.24.2/example/img/earth-night.jpg",
          (texture) => {
            earthMat.map = texture;
            earthMat.color = new THREE.Color(0xffffff);
            earthMat.emissive = new THREE.Color(0x000000);
            earthMat.needsUpdate = true;
          },
          undefined,
          () => {
            // Final fallback: procedural earth look
            createProceduralEarth(earth, globeGroup);
          }
        );
      }
    );

    // Atmosphere glow (outer shell)
    const atmosphereGeo = new THREE.SphereGeometry(1.08, 64, 64);
    const atmosphereMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.5);
          vec3 color = mix(vec3(0.04, 0.52, 1.0), vec3(0.37, 0.36, 0.9), intensity);
          gl_FragColor = vec4(color, intensity * 0.6);
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
    const atmosphere = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    globeGroup.add(atmosphere);

    // Tilt
    globeGroup.rotation.x = 0.4;
    globeGroup.rotation.z = -0.15;

    // Animate
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      globeGroup.rotation.y += 0.006;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      renderer.dispose();
      sphereGeo.dispose();
      earthMat.dispose();
      atmosphereGeo.dispose();
      atmosphereMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [size]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: size, height: size, display: "inline-block" }}
    />
  );
}

// Fallback: procedural continent-like dots if texture can't load
function createProceduralEarth(earth: THREE.Mesh, group: THREE.Group) {
  // Simplified continent boundaries using lat/lon rectangles
  const continents: [number, number, number, number][] = [
    // [latMin, latMax, lonMin, lonMax] - rough continent shapes
    // North America
    [25, 70, -130, -60],
    [30, 50, -130, -100],
    [50, 70, -140, -55],
    // South America
    [-55, 12, -80, -35],
    [-20, 5, -75, -40],
    // Europe
    [35, 70, -10, 40],
    [45, 60, -10, 50],
    // Africa
    [-35, 37, -20, 50],
    [-10, 25, -15, 45],
    // Asia
    [10, 70, 60, 140],
    [25, 55, 40, 130],
    [5, 20, 95, 120],
    // Australia
    [-40, -12, 113, 155],
    // India
    [8, 35, 68, 90],
  ];

  const isContinent = (lat: number, lon: number): boolean => {
    for (const [latMin, latMax, lonMin, lonMax] of continents) {
      if (lat >= latMin && lat <= latMax && lon >= lonMin && lon <= lonMax) {
        return true;
      }
    }
    return false;
  };

  const dotPositions: number[] = [];
  const dotColors: number[] = [];
  const radius = 1.005;

  for (let lat = -90; lat <= 90; lat += 2) {
    for (let lon = -180; lon <= 180; lon += 2) {
      const phi = ((90 - lat) * Math.PI) / 180;
      const theta = ((lon + 180) * Math.PI) / 180;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);

      if (isContinent(lat, lon)) {
        dotPositions.push(x, y, z);
        dotColors.push(0.15, 0.7, 0.3); // green continents
      } else if (Math.random() < 0.15) {
        dotPositions.push(x, y, z);
        dotColors.push(0.04, 0.35, 0.85); // blue ocean dots (sparse)
      }
    }
  }

  const dotGeo = new THREE.BufferGeometry();
  dotGeo.setAttribute("position", new THREE.Float32BufferAttribute(dotPositions, 3));
  dotGeo.setAttribute("color", new THREE.Float32BufferAttribute(dotColors, 3));

  const dotMat = new THREE.PointsMaterial({
    size: 0.02,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    sizeAttenuation: true,
  });

  const dots = new THREE.Points(dotGeo, dotMat);
  group.add(dots);

  // Make the base sphere dark ocean
  const mat = earth.material as THREE.MeshPhongMaterial;
  mat.color = new THREE.Color(0x0a1628);
  mat.emissive = new THREE.Color(0x050d1a);
  mat.emissiveIntensity = 0.3;
  mat.needsUpdate = true;
}
