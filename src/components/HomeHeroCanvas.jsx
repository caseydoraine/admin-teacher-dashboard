import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const seededValue = (index, seed) => {
  const value = Math.sin((index + 1) * (seed + 1) * 12.9898) * 43758.5453
  return value - Math.floor(value)
}

const CARD_DECKS = [
  {
    label: 'ROLE',
    back: '/batangaware-cards/role_back_card.jpg',
    faces: [
      '/batangaware-cards/student_role_card.jpg',
      '/batangaware-cards/doctor_role_card.jpg',
      '/batangaware-cards/caretaker_role_card.jpg',
      '/batangaware-cards/guard_role_card.jpg',
      '/batangaware-cards/vendor_role_card.jpg',
    ],
    tint: ['#1f3b8f', '#5cc8ff'],
  },
  {
    label: 'ITEM',
    back: '/batangaware-cards/item_back_card.jpg',
    faces: [
      '/batangaware-cards/card_accesspass.jpg',
      '/batangaware-cards/card_medicalkit.jpg',
      '/batangaware-cards/card_mask.jpg',
      '/batangaware-cards/card_sanitizer.jpg',
      '/batangaware-cards/card_gloves.jpg',
      '/batangaware-cards/card_idBadge.jpg',
      '/batangaware-cards/card_pen.jpg',
      '/batangaware-cards/card_notebook.jpg',
      '/batangaware-cards/card_coins.jpg',
      '/batangaware-cards/card_whistle.jpg',
      '/batangaware-cards/card_snacks.jpg',
      '/batangaware-cards/card_vitamins.jpg',
    ],
    tint: ['#0f766e', '#34d399'],
  },
  {
    label: 'LOCATION',
    back: '/batangaware-cards/location_back_card.jpg',
    faces: [
      '/batangaware-cards/school_location_card.jpg',
      '/batangaware-cards/canteen_location_card.jpg',
      '/batangaware-cards/clinic_location_card.jpg',
      '/batangaware-cards/market_location_card.jpg',
      '/batangaware-cards/park_location_card.jpg',
    ],
    tint: ['#4c1d95', '#a78bfa'],
  },
]

const loadTexture = (textureLoader, url) => {
  const texture = textureLoader.load(url)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.needsUpdate = true
  return texture
}

function HaloField({ progressRef }) {
  const groupRef = useRef(null)

  const halos = useMemo(
    () => [
      { position: [-1.55, 0.6, -1.7], scale: 1.1, color: '#5cc8ff', tube: 0.06, radius: 0.95 },
      { position: [1.45, -0.1, -1.45], scale: 0.9, color: '#34d399', tube: 0.05, radius: 0.78 },
      { position: [0.35, 1.05, -1.9], scale: 1.2, color: '#a78bfa', tube: 0.045, radius: 1.18 },
    ],
    [],
  )

  useFrame((_, delta) => {
    if (!groupRef.current) return

    groupRef.current.rotation.z = progressRef.current * 0.18
    groupRef.current.rotation.y += delta * 0.12
    groupRef.current.position.y = Math.sin(progressRef.current * Math.PI) * 0.1
  })

  return (
    <group ref={groupRef} position={[0, 0.1, -0.2]}>
      {halos.map((halo, index) => (
        <Float
          key={index}
          speed={0.6 + index * 0.2}
          rotationIntensity={0.35}
          floatIntensity={0.35}
        >
          <mesh position={halo.position} rotation={[Math.PI / 2, 0.35 + index * 0.28, 0]} scale={halo.scale}>
            <torusGeometry args={[halo.radius, halo.tube, 10, 64]} />
            <meshStandardMaterial
              color={halo.color}
              emissive={halo.color}
              emissiveIntensity={0.9}
              transparent
              opacity={0.12}
              roughness={0.08}
              metalness={0.35}
            />
          </mesh>
        </Float>
      ))}

      <mesh position={[0, -0.8, -0.8]} rotation={[-Math.PI / 2.2, 0, 0]}>
        <ringGeometry args={[1.4, 2.6, 64]} />
        <meshBasicMaterial color="#60a5fa" transparent opacity={0.05} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

function CardField({ progressRef }) {
  const groupRef = useRef(null)

  const textureLoader = useMemo(() => new THREE.TextureLoader(), [])

  const deckTextures = useMemo(() => {
    const loadedDecks = CARD_DECKS.map((deck) => ({
      label: deck.label,
      back: loadTexture(textureLoader, deck.back),
      faces: deck.faces.map((faceUrl) => loadTexture(textureLoader, faceUrl)),
      tint: deck.tint,
    }))

    return loadedDecks
  }, [textureLoader])

  useEffect(
    () => () => {
      deckTextures.forEach((deck) => {
        deck.back.dispose()
        deck.faces.forEach((texture) => texture.dispose())
      })
    },
    [deckTextures],
  )

  const cards = useMemo(
    () =>
      Array.from({ length: 28 }, (_, index) => ({
        key: index,
        position: [
          (seededValue(index, 1) - 0.5) * 3.6,
          (seededValue(index, 2) - 0.5) * 2.5,
          (seededValue(index, 3) - 0.5) * 2.8,
        ],
        rotation: [
          seededValue(index, 4) * Math.PI,
          seededValue(index, 5) * Math.PI,
          seededValue(index, 6) * Math.PI,
        ],
        scale: 0.12 + seededValue(index, 7) * 0.16,
        hueShift: seededValue(index, 8),
        deckIndex: index % deckTextures.length,
        faceIndex: Math.floor(seededValue(index, 9) * 12),
      })),
    [deckTextures.length],
  )

  useFrame((_, delta) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += delta * 0.06
    groupRef.current.rotation.x = progressRef.current * 0.24
    groupRef.current.position.y = -0.02 + progressRef.current * 0.2
  })

  return (
    <group ref={groupRef} position={[0.15, -0.1, 0.5]}>
      {cards.map((card) => (
        <Float
          key={card.key}
          speed={1.2 + card.hueShift}
          rotationIntensity={1.1}
          floatIntensity={1.0}
        >
          <CardMesh card={card} deck={deckTextures[card.deckIndex]} faceIndex={card.faceIndex} />
        </Float>
      ))}
    </group>
  )
}

function CardMesh({ card, deck, faceIndex }) {
  const frontTexture = deck.faces[faceIndex % deck.faces.length]
  const backTexture = deck.back
  const tintA = deck.tint[0]
  const tintB = deck.tint[1]

  return (
    <group position={card.position} rotation={card.rotation} scale={card.scale}>
      <mesh>
        <boxGeometry args={[1, 1.45, 0.04]} />
        <meshStandardMaterial
          color={tintB}
          emissive={tintA}
          emissiveIntensity={0.24 + card.hueShift * 0.12}
          roughness={0.8} // Increased roughness is slightly cheaper
          metalness={0.1}
        />
      </mesh>

      {/* Changed to meshBasicMaterial - Unlit, pure texture mapping */}
      <mesh position={[0, 0, 0.026]}>
        <planeGeometry args={[0.9, 1.3]} />
        <meshBasicMaterial map={frontTexture} color="#ffffff" />
      </mesh>

      {/* Changed to meshBasicMaterial */}
      <mesh position={[0, 0, -0.026]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[0.9, 1.3]} />
        <meshBasicMaterial map={backTexture} color="#ffffff" />
      </mesh>
    </group>
  )
}

function CameraRig({ progressRef }) {
  const { camera } = useThree()

  // Static vectors
  const leftPosition = useMemo(() => new THREE.Vector3(-5.35, 0.34, 3.22), [])
  const centerPosition = useMemo(() => new THREE.Vector3(0.08, 0.38, 3.02), [])
  const rightPosition = useMemo(() => new THREE.Vector3(0.4, 0.3, 5.24), [])
  const boardLook = useMemo(() => new THREE.Vector3(0, 0.1, -0.05), [])
  const desksLook = useMemo(() => new THREE.Vector3(0.05, -0.12, 0.18), [])
  const windowsLook = useMemo(() => new THREE.Vector3(0.75, 0.22, 0.52), [])
  
  // Vectors strictly for updating (No new allocations inside loop)
  const currentLook = useMemo(() => new THREE.Vector3(), [])
  const currentPosition = useMemo(() => new THREE.Vector3(), [])
  const targetPosition = useMemo(() => new THREE.Vector3(), [])
  const targetLook = useMemo(() => new THREE.Vector3(), [])
  const tempVec = useMemo(() => new THREE.Vector3(), []) 

  useFrame(() => {
    const progress = progressRef.current
    const phase = progress * Math.PI * 2

    // 1. Reset target to center
    targetPosition.copy(centerPosition)

    // 2. Add left influence
    const leftScale = Math.max(0, Math.sin(phase)) * 0.45
    tempVec.copy(leftPosition).multiplyScalar(leftScale)
    targetPosition.add(tempVec)

    // 3. Add right influence
    const rightScale = Math.max(0, Math.cos(phase * 0.85)) * 0.25
    tempVec.copy(rightPosition).multiplyScalar(rightScale)
    targetPosition.add(tempVec)

    // 4. Add vertical sway (Directly modifying Y instead of making a new Vector3)
    targetPosition.y += Math.sin(phase * 0.55) * 0.05

    // 5. Calculate look target without cloning
    const lookMix = THREE.MathUtils.smoothstep(progress, 0.06, 0.92)
    targetLook.copy(boardLook)
      .lerp(desksLook, lookMix)
      .lerp(windowsLook, Math.max(0, Math.sin(phase * 0.5)) * 0.2)

    // 6. Smooth camera movement
    currentPosition.lerp(targetPosition, 0.22)
    currentLook.lerp(targetLook, 0.22)

    camera.position.copy(currentPosition)
    camera.lookAt(currentLook)
  })

  return null
    }


function Scene({ progressRef }) {
  return (
    <>
      <fog attach="fog" args={["#061020", 0.18]} />

      {/* Reduced from 5 lights to 2 essential lights */}
      <ambientLight intensity={0.6} color="#cfe8ff" />
      <directionalLight position={[2.8, 4.2, 2.6]} intensity={1.5} color="#fff4d8" />

      <GradientSky />
      <Particles />
      <HaloField progressRef={progressRef} />
      <CardField progressRef={progressRef} />
      <CameraRig progressRef={progressRef} />
    </>
  )
}

function GradientSky() {
  const matRef = useRef(null)

  // simple shader that blends two colors based on normal Y
  const uniforms = useMemo(
    () => ({ topColor: { value: new THREE.Color('#07102a') }, bottomColor: { value: new THREE.Color('#091826') }, offset: { value: 0.45 } }),
    [],
  )

  const vertex = `
    varying vec3 vPosition;
    void main() {
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `

  const fragment = `
    uniform vec3 topColor;
    uniform vec3 bottomColor;
    uniform float offset;
    varying vec3 vPosition;
    void main() {
      float h = normalize(vPosition).y * 0.5 + offset;
      vec3 color = mix(bottomColor, topColor, smoothstep(0.0, 1.0, h));
      gl_FragColor = vec4(color, 1.0);
    }
  `

  return (
    <mesh scale={40} rotation={[0, 0.2, 0]}>
      <sphereGeometry args={[1, 32, 32]} />
      <shaderMaterial ref={matRef} attach="material" vertexShader={vertex} fragmentShader={fragment} uniforms={uniforms} side={THREE.BackSide} />
    </mesh>
  )
}

function Particles() {
  const pointsRef = useRef()
  const count = 380

  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      // deterministic pseudo-random values via seededValue to remain pure
      const r1 = seededValue(i, 11)
      const r2 = seededValue(i, 13)
      const r3 = seededValue(i, 17)
      const depth = (r1 - 0.6) * 8
      positions[i3 + 0] = (r2 - 0.5) * 12
      positions[i3 + 1] = (r3 - 0.2) * 6
      positions[i3 + 2] = depth

      const c = new THREE.Color().setHSL(0.56 + seededValue(i, 19) * 0.18, 0.6, 0.5)
      colors[i3 + 0] = c.r
      colors[i3 + 1] = c.g
      colors[i3 + 2] = c.b

      sizes[i] = 2 + seededValue(i, 23) * 6
    }

    return { positions, colors, sizes }
  }, [])

  useFrame((state, delta) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y += delta * 0.02
    pointsRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.08
  })

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attachObject={['attributes', 'position']} count={positions.length / 3} array={positions} itemSize={3} />
        <bufferAttribute attachObject={['attributes', 'color']} count={colors.length / 3} array={colors} itemSize={3} />
        <bufferAttribute attachObject={['attributes', 'size']} count={sizes.length} array={sizes} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial vertexColors size={3} sizeAttenuation transparent opacity={0.85} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  )
}

function ProgressSmoother({ progressRef, targetProgressRef }) {
  useFrame((_, delta) => {
    const damping = 1 - Math.exp(-delta * 7)
    progressRef.current = THREE.MathUtils.lerp(progressRef.current, targetProgressRef.current, damping)
  })

  return null
}

function HomeHeroCanvas({ className = 'hero-canvas' }) {
  const wrapperRef = useRef(null)
  const progressRef = useRef(0)
  const targetProgressRef = useRef(0)
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: '.home-layout',
      start: 'top top',
      endTrigger: '.home-footer',
      end: 'bottom bottom',
      scrub: 0.9,
      invalidateOnRefresh: true,
      fastScrollEnd: true,
      onUpdate: ({ progress }) => {
        targetProgressRef.current = progress
      },
      onRefresh: () => {
        const maxScroll = Math.max(ScrollTrigger.maxScroll(window), 1)
        const current = window.scrollY / maxScroll
        targetProgressRef.current = THREE.MathUtils.clamp(current, 0, 1)
      },
    })

    ScrollTrigger.refresh()

    return () => {
      trigger.kill()
    }
  }, [])
  
  return (
    <div className={className} ref={wrapperRef} aria-hidden="true" style={{ pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0.15, 2.8], fov: 20 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 1.5)}
      >
        <ProgressSmoother progressRef={progressRef} targetProgressRef={targetProgressRef} />
        <Scene progressRef={progressRef} />
      </Canvas>
    </div>
  )
}

export default HomeHeroCanvas
