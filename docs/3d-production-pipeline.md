# BatangAware 3D Production Pipeline

This project now uses a canvas-first hero powered by React Three Fiber, GSAP ScrollTrigger, and custom GLSL shaders.

## 1) Modeling and Scene Prep (Blender)

- Keep hero meshes low poly where possible.
- Use one main scene collection for export.
- Apply transforms before export.
- Target one hero scene under 2-4 MB compressed.

## 2) Lighting Bake (Mandatory)

- Bake diffuse + AO + emission where possible.
- Prefer texture-based shadows over runtime shadow maps.
- Keep dynamic lights minimal in web runtime.

Recommended texture budget per hero scene:
- 2K for principal assets
- 1K for secondary assets
- Prefer KTX2/Basis when pipeline is ready

## 3) Export Settings

- Export as .glb
- Use Draco compression when possible
- Embed textures only if reuse is low
- Prefer separate textures for reused materials

## 4) Runtime Integration

- Place scene assets in src/assets/3d/
- Load with @react-three/drei useGLTF
- Keep ScrollTrigger animation logic in component scope and kill triggers on unmount
- Keep shader uniforms minimal and time-based for stability

## 5) Performance Targets

- FPS target: 55-60 desktop, 30+ mobile
- TTI impact: defer heavy 3D with lazy import
- dpr cap: [1, 1.6] to avoid GPU spikes

## 6) Quality Checklist

- Reduced-motion fallback available
- No blocked main-thread interactions
- Camera path tied to scroll progress
- Shader animation remains readable over CTA text
