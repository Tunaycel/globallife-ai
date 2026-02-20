"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";

export default function SceneBackground() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;
        const container = containerRef.current;
        const w = window.innerWidth;
        const h = window.innerHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 500);
        camera.position.set(0, 0, 28);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(w, h);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x030308, 1);
        container.appendChild(renderer.domElement);

        const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
        const scroll = { y: 0 };

        // ── PARTICLES (8000, vivid) ──────────────────────
        const N = 8000;
        const pos = new Float32Array(N * 3);
        const sz = new Float32Array(N);
        const sp = 80;

        for (let i = 0; i < N; i++) {
            pos[i * 3] = (Math.random() - 0.5) * sp;
            pos[i * 3 + 1] = (Math.random() - 0.5) * sp * 3;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 40 - 5;
            sz[i] = Math.random() * 3.0 + 1.0;
        }

        const pGeo = new THREE.BufferGeometry();
        pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
        pGeo.setAttribute("size", new THREE.BufferAttribute(sz, 1));

        const pMat = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uMouse: { value: new THREE.Vector2(0, 0) },
                uPR: { value: renderer.getPixelRatio() },
            },
            vertexShader: `
        attribute float size;
        uniform float uTime;
        uniform vec2 uMouse;
        uniform float uPR;
        varying vec3 vCol;
        varying float vA;

        vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
        vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}
        vec4 perm(vec4 x){return mod289(((x*34.)+1.)*x);}
        float snoise(vec3 v){
          const vec2 C=vec2(1./6.,1./3.);
          vec3 i=floor(v+dot(v,C.yyy));
          vec3 x0=v-i+dot(i,C.xxx);
          vec3 g=step(x0.yzx,x0.xyz);
          vec3 l=1.-g;
          vec3 i1=min(g,l.zxy);
          vec3 i2=max(g,l.zxy);
          vec3 x1=x0-i1+C.xxx;
          vec3 x2=x0-i2+C.yyy;
          vec3 x3=x0-.5;
          i=mod289(i);
          vec4 p=perm(perm(perm(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
          float n_=.142857142857;
          vec3 ns=n_*vec3(2.,1.,0.)-vec3(1.,2./7.,1./7.);
          vec4 j=p-49.*floor(p*ns.z*ns.z);
          vec4 x_=floor(j*ns.z);
          vec4 y_=floor(j-7.*x_);
          vec4 xa=x_*ns.x+ns.yyyy;
          vec4 ya=y_*ns.x+ns.yyyy;
          vec4 h=1.-abs(xa)-abs(ya);
          vec4 b0=vec4(xa.xy,ya.xy);
          vec4 b1=vec4(xa.zw,ya.zw);
          vec4 s0=floor(b0)*2.+1.;
          vec4 s1=floor(b1)*2.+1.;
          vec4 sh=-step(h,vec4(0.));
          vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
          vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
          vec3 p0=vec3(a0.xy,h.x);
          vec3 p1=vec3(a0.zw,h.y);
          vec3 p2=vec3(a1.xy,h.z);
          vec3 p3=vec3(a1.zw,h.w);
          vec4 nr=1.79284291400159-.85373472095314*vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3));
          p0*=nr.x;p1*=nr.y;p2*=nr.z;p3*=nr.w;
          vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);
          m=m*m;
          return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
        }

        void main(){
          vec3 p=position;
          float n1=snoise(vec3(p.x*.04,p.y*.04+uTime*.12,p.z*.04));
          float n2=snoise(vec3(p.x*.06+uTime*.07,p.y*.06,p.z*.06+uTime*.09));
          p.x+=n1*4.;
          p.y+=n2*3.;
          p.z+=sin(uTime*.25+p.x*.06+p.y*.04)*3.;

          float mi=smoothstep(25.,0.,length(p.xy-uMouse*30.));
          p.z+=mi*10.;

          float cm=sin(p.x*.03+uTime*.18)*.5+.5;
          float cm2=cos(p.y*.02+uTime*.12)*.5+.5;

          // Emerald→Cyan→Gold→Magenta
          vec3 c1=vec3(0.,0.86,0.51);  // Emerald #00DC82
          vec3 c2=vec3(0.,0.9,1.);     // Cyan #00E5FF
          vec3 c3=vec3(.96,.65,.14);   // Gold #F5A623
          vec3 c4=vec3(1.,0.,.43);     // Magenta #FF006E

          vec3 c=mix(c1,c2,cm);
          c=mix(c,mix(c3,c4,cm),cm2);
          c+=mi*.5;

          vCol=c;
          vA=.55+mi*.5+n1*.2;

          vec4 mv=modelViewMatrix*vec4(p,1.);
          gl_PointSize=size*uPR*(25./-mv.z);
          gl_Position=projectionMatrix*mv;
        }
      `,
            fragmentShader: `
        varying vec3 vCol;
        varying float vA;
        void main(){
          float d=length(gl_PointCoord-vec2(.5));
          if(d>.5)discard;
          float glow=exp(-d*3.5);
          float core=smoothstep(.5,.0,d);
          vec3 c=vCol*glow+vCol*2.*core;
          gl_FragColor=vec4(c,vA*glow);
        }
      `,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        });

        const particles = new THREE.Points(pGeo, pMat);
        scene.add(particles);

        // ── NETWORK LINES ────────────────────────────────
        const LC = 600;
        const lPos = new Float32Array(LC * 6);
        const lCol = new Float32Array(LC * 6);
        const lGeo = new THREE.BufferGeometry();
        lGeo.setAttribute("position", new THREE.BufferAttribute(lPos, 3));
        lGeo.setAttribute("color", new THREE.BufferAttribute(lCol, 3));
        const lMat = new THREE.LineBasicMaterial({
            vertexColors: true, transparent: true, opacity: 0.25,
            blending: THREE.AdditiveBlending,
        });
        scene.add(new THREE.LineSegments(lGeo, lMat));

        // ── WIREFRAME SHAPES ─────────────────────────────
        const shapes: THREE.Mesh[] = [];
        const geos = [
            new THREE.IcosahedronGeometry(5, 1),
            new THREE.OctahedronGeometry(4, 0),
            new THREE.TorusGeometry(3, 0.6, 8, 24),
            new THREE.IcosahedronGeometry(6, 0),
        ];
        for (let i = 0; i < 8; i++) {
            const m = new THREE.MeshBasicMaterial({
                color: new THREE.Color().setHSL(0.45 + i * 0.08, 0.8, 0.5),
                wireframe: true, transparent: true,
                opacity: 0.04 + Math.random() * 0.04,
                blending: THREE.AdditiveBlending,
            });
            const mesh = new THREE.Mesh(geos[i % geos.length], m);
            mesh.position.set(
                (Math.random() - 0.5) * 70,
                (Math.random() - 0.5) * 180,
                -15 - Math.random() * 20
            );
            scene.add(mesh);
            shapes.push(mesh);
        }

        // ── ANIMATION ────────────────────────────────────
        const clock = new THREE.Clock();
        let raf: number;

        const tick = () => {
            raf = requestAnimationFrame(tick);
            const t = clock.getElapsedTime();

            mouse.x += (mouse.tx - mouse.x) * 0.06;
            mouse.y += (mouse.ty - mouse.y) * 0.06;

            pMat.uniforms.uTime.value = t;
            pMat.uniforms.uMouse.value.set(mouse.x, mouse.y);

            camera.position.y = -(scroll.y * 0.015);
            camera.position.z = 28 + Math.sin(t * 0.08) * 1.5;
            camera.rotation.x = mouse.y * 0.015;
            camera.rotation.y = mouse.x * 0.015;

            // Lines
            const pa = pGeo.attributes.position;
            let li = 0;
            for (let i = 0; i < 300 && li < LC; i++) {
                const a = Math.floor(Math.random() * N);
                const b = Math.floor(Math.random() * N);
                if (a === b) continue;
                const dx = pa.getX(a) - pa.getX(b);
                const dy = pa.getY(a) - pa.getY(b);
                const dz = pa.getZ(a) - pa.getZ(b);
                const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
                if (d < 6) {
                    const al = 1 - d / 6;
                    const o = li * 6;
                    lPos[o] = pa.getX(a); lPos[o + 1] = pa.getY(a); lPos[o + 2] = pa.getZ(a);
                    lPos[o + 3] = pa.getX(b); lPos[o + 4] = pa.getY(b); lPos[o + 5] = pa.getZ(b);
                    const v = 0.1 + al * 0.3;
                    lCol[o] = v * 0.3; lCol[o + 1] = v; lCol[o + 2] = v * 0.8;
                    lCol[o + 3] = v * 0.3; lCol[o + 4] = v; lCol[o + 5] = v * 0.8;
                    li++;
                }
            }
            lGeo.attributes.position.needsUpdate = true;
            lGeo.attributes.color.needsUpdate = true;

            shapes.forEach((s, i) => {
                s.rotation.x += 0.0012 + i * 0.0002;
                s.rotation.y += 0.0018 + i * 0.00015;
            });

            renderer.render(scene, camera);
        };

        const onMM = (e: MouseEvent) => {
            mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.ty = -(e.clientY / window.innerHeight) * 2 + 1;
        };
        const onS = () => { scroll.y = window.scrollY; };
        const onR = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener("mousemove", onMM, { passive: true });
        window.addEventListener("scroll", onS, { passive: true });
        window.addEventListener("resize", onR);
        tick();

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("mousemove", onMM);
            window.removeEventListener("scroll", onS);
            window.removeEventListener("resize", onR);
            renderer.dispose();
            pGeo.dispose(); pMat.dispose();
            lGeo.dispose(); lMat.dispose();
            geos.forEach(g => g.dispose());
            shapes.forEach(s => (s.material as THREE.Material).dispose());
            if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-0 pointer-events-none"
            style={{ background: "#030308" }}
        />
    );
}
