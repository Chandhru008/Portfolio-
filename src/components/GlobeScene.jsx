import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { GLOBE_SKILLS } from '../data/globeSkills'

const R = 3.2
const STEPS = 120
const LAT_N = 14
const LON_N = 22
const DAMP = 0.915
const AUTO_V = 0.0022

function ll2v(lat, lon, r = R) {
  const ph = (lat * Math.PI) / 180
  const th = (lon * Math.PI) / 180
  return new THREE.Vector3(
    r * Math.cos(ph) * Math.cos(th),
    r * Math.sin(ph),
    r * Math.cos(ph) * Math.sin(th),
  )
}

function fibPos(i, N, radius) {
  const phi = Math.PI * (3 - Math.sqrt(5))
  const y = 1 - (i / (N - 1)) * 2
  const r = Math.sqrt(1 - y * y)
  const theta = phi * i
  return new THREE.Vector3(
    Math.cos(theta) * r * radius,
    y * radius,
    Math.sin(theta) * r * radius
  )
}

function mkLine(pts, color, opacity) {
  return new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(pts),
    new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity: opacity * 0.15,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  )
}

export default function GlobeScene({ sectionRef, cardRefs, parallaxOffset }) {
  const canvasRef = useRef(null)
  const globeGroupRef = useRef(null)
  const bloomRef = useRef(null)
  const coreLightRef = useRef(null)
  const hitMeshRef = useRef(null)
  const skillLocalPosRef = useRef(GLOBE_SKILLS.map((s, i) => {
    const radius = R * (i % 5 === 0 || i % 8 === 0 ? 1.45 : 1.05)
    return fibPos(i, GLOBE_SKILLS.length, radius)
  }))
  if (skillLocalPosRef.current.length !== GLOBE_SKILLS.length) {
    skillLocalPosRef.current = GLOBE_SKILLS.map((s, i) => {
      const radius = R * (i % 5 === 0 || i % 8 === 0 ? 1.45 : 1.05)
      return fibPos(i, GLOBE_SKILLS.length, radius)
    })
  }
  const stateRef = useRef({
    isDragging: false,
    prevM: { x: 0, y: 0 },
    rotVel: { x: 0, y: 0 },
    isHovered: false,
  })

  useEffect(() => {
    const section = sectionRef.current
    const canvas = canvasRef.current
    if (!section || !canvas) return

    const DPR = Math.min(window.devicePixelRatio, 2)
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(DPR)
    renderer.setClearColor(0x000000, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.0

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 600)
    camera.position.z = 12

    const composer = new EffectComposer(renderer)
    composer.addPass(new RenderPass(scene, camera))
    const bloom = new UnrealBloomPass(
      new THREE.Vector2(section.clientWidth, section.clientHeight),
      0.9,
      0.55,
      0.78,
    )
    composer.addPass(bloom)
    bloomRef.current = bloom

    const onResize = () => {
      const w = section.clientWidth
      const h = section.clientHeight
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      composer.setSize(w, h)
    }
    onResize()
    window.addEventListener('resize', onResize)

    const globeGroup = new THREE.Group()
    globeGroup.position.y = -1
    globeGroup.rotation.x = 0.25
    globeGroup.rotation.z = 0.15
    scene.add(globeGroup)
    globeGroupRef.current = globeGroup

    globeGroup.add(
      new THREE.Mesh(
        new THREE.SphereGeometry(R * 0.985, 48, 48),
        new THREE.MeshBasicMaterial({
          color: 0x010a10,
          transparent: true,
          opacity: 0.55,
          depthWrite: false,
        }),
      ),
    )
    globeGroup.add(
      new THREE.Mesh(
        new THREE.SphereGeometry(R * 1.07, 32, 32),
        new THREE.MeshBasicMaterial({
          color: 0x007888,
          transparent: true,
          opacity: 0.045,
          blending: THREE.AdditiveBlending,
          side: THREE.BackSide,
          depthWrite: false,
        }),
      ),
    )

    const wireGroup = new THREE.Group()
    globeGroup.add(wireGroup)

    for (let i = 0; i <= LAT_N; i++) {
      const lat = -90 + (180 / LAT_N) * i
      const pts = []
      for (let s = 0; s <= STEPS; s++) pts.push(ll2v(lat, -180 + (360 / STEPS) * s))
      const eq = Math.abs(lat) < 1
      const tr = [30, 60, -30, -60].some((v) => Math.abs(lat - v) < 2)
      const color = eq ? 0x50fff0 : tr ? 0x23e0c8 : 0x007a88
      const opacity = eq ? 0.92 : tr ? 0.66 : 0.46
      wireGroup.add(mkLine(pts, color, opacity))
    }

    for (let i = 0; i < LON_N; i++) {
      const lon = -180 + (360 / LON_N) * i
      const pts = []
      for (let s = 0; s <= STEPS; s++) pts.push(ll2v(-90 + (180 / STEPS) * s, lon))
      const prime = i % (LON_N / 2) === 0
      const color = prime ? 0x50fff0 : 0x007a88
      const opacity = prime ? 0.78 : 0.42
      wireGroup.add(mkLine(pts, color, opacity))
    }

    const glowGroup = new THREE.Group()
    wireGroup.children.forEach((ln) => {
      const g = new THREE.Line(
        ln.geometry,
        new THREE.LineBasicMaterial({
          color: ln.material.color.getHex(),
          transparent: true,
          opacity: 0.04,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      )
      glowGroup.add(g)
    })
    glowGroup.scale.set(1.03, 1.03, 1.03)
    globeGroup.add(glowGroup)

    {
      const arr = []
      ;[-60, -30, 0, 30, 60].forEach((lat) =>
        Array.from({ length: LON_N }, (_, i) => -180 + (360 / LON_N) * i).forEach((lon) => {
          const v = ll2v(lat, lon)
          arr.push(v.x, v.y, v.z)
        }),
      )
      const g = new THREE.BufferGeometry()
      g.setAttribute('position', new THREE.Float32BufferAttribute(arr, 3))
      globeGroup.add(
        new THREE.Points(
          g,
          new THREE.PointsMaterial({
            color: 0x60ffe0,
            size: 0.038,
            transparent: true,
            opacity: 0.85,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          }),
        ),
      )
    }

    const coreLight = new THREE.PointLight(0x00d9ff, 3.0, 12.0)
    globeGroup.add(coreLight)
    coreLightRef.current = coreLight
    globeGroup.add(
      new THREE.Mesh(
        new THREE.SphereGeometry(0.06, 12, 12),
        new THREE.MeshBasicMaterial({ color: 0x90fff5, blending: THREE.AdditiveBlending }),
      ),
    )

    const hitMesh = new THREE.Mesh(
      new THREE.SphereGeometry(R * 1.12, 16, 16),
      new THREE.MeshBasicMaterial({ visible: false }),
    )
    globeGroup.add(hitMesh)
    hitMeshRef.current = hitMesh

    {
      const cnt = 1800
      const ps = new Float32Array(cnt * 3)
      const cs = new Float32Array(cnt * 3)
      for (let i = 0; i < cnt; i++) {
        const rad = 16 + Math.random() * 38
        const th = Math.random() * Math.PI * 2
        const ph = Math.acos(2 * Math.random() - 1)
        ps[i * 3] = rad * Math.sin(ph) * Math.cos(th)
        ps[i * 3 + 1] = rad * Math.cos(ph)
        ps[i * 3 + 2] = rad * Math.sin(ph) * Math.sin(th)
        const c = Math.random() > 0.5
        cs[i * 3] = c ? 0.4 : 1
        cs[i * 3 + 1] = 1
        cs[i * 3 + 2] = 1
      }
      const g = new THREE.BufferGeometry()
      g.setAttribute('position', new THREE.Float32BufferAttribute(ps, 3))
      g.setAttribute('color', new THREE.Float32BufferAttribute(cs, 3))
      scene.add(
        new THREE.Points(
          g,
          new THREE.PointsMaterial({
            size: 0.036,
            vertexColors: true,
            transparent: true,
            opacity: 0.48,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          }),
        ),
      )
    }

    scene.add(new THREE.AmbientLight(0x001825, 2))

    const rcaster = new THREE.Raycaster()
    const mNDC = new THREE.Vector2()
    const _pv = new THREE.Vector3()

    const project = (lp) => {
      _pv.copy(lp).applyEuler(globeGroup.rotation)
      _pv.y += globeGroup.position.y
      const wz = _pv.z
      _pv.project(camera)
      const w = section.clientWidth
      const h = section.clientHeight
      const sx = ((_pv.x + 1) / 2) * w
      const sy = (1 - (_pv.y + 1) / 2) * h
      const normZ = wz / (R * 1.05)
      const vis = Math.max(0, Math.min(1, (normZ + 0.25) * 2.1))
      const scale = 0.6 + 0.4 * Math.max(0, normZ + 0.5)
      return { sx, sy, vis, scale, behind: wz < -R * 0.05 }
    }

    const onMouseDown = (e) => {
      if (!stateRef.current.isHovered) return
      stateRef.current.isDragging = true
      stateRef.current.prevM = { x: e.clientX, y: e.clientY }
      stateRef.current.rotVel = { x: 0, y: 0 }
      section.style.cursor = 'grabbing'
    }
    const onMouseMove = (e) => {
      const rect = section.getBoundingClientRect()
      mNDC.set(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1,
      )
      const st = stateRef.current
      if (!st.isDragging) {
        rcaster.setFromCamera(mNDC, camera)
        st.isHovered = rcaster.intersectObject(hitMesh).length > 0
        section.style.cursor = st.isHovered ? 'grab' : 'default'
      }
      if (st.isDragging) {
        const dx = e.clientX - st.prevM.x
        const dy = e.clientY - st.prevM.y
        st.rotVel.y = dx * 0.006
        st.rotVel.x = dy * 0.006
        globeGroup.rotation.y += st.rotVel.y
        globeGroup.rotation.x += st.rotVel.x
        globeGroup.rotation.x = Math.max(-Math.PI / 2.1, Math.min(Math.PI / 2.1, globeGroup.rotation.x))
        st.prevM = { x: e.clientX, y: e.clientY }
      }
    }
    const onMouseUp = () => {
      const st = stateRef.current
      st.isDragging = false
      section.style.cursor = st.isHovered ? 'grab' : 'default'
    }
    const onTouchStart = (e) => {
      if (e.target.closest('.skills-panel')) return
      
      const rect = section.getBoundingClientRect()
      mNDC.set(
        ((e.touches[0].clientX - rect.left) / rect.width) * 2 - 1,
        -((e.touches[0].clientY - rect.top) / rect.height) * 2 + 1,
      )
      rcaster.setFromCamera(mNDC, camera)
      if (rcaster.intersectObject(hitMesh).length === 0) return

      stateRef.current.isDragging = true
      stateRef.current.prevM = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      stateRef.current.rotVel = { x: 0, y: 0 }
    }
    const onTouchMove = (e) => {
      const st = stateRef.current
      if (!st.isDragging) return
      const t = e.touches[0]
      const dx = t.clientX - st.prevM.x
      const dy = t.clientY - st.prevM.y
      st.rotVel.y = dx * 0.006
      st.rotVel.x = dy * 0.006
      globeGroup.rotation.y += st.rotVel.y
      globeGroup.rotation.x += st.rotVel.x
      globeGroup.rotation.x = Math.max(-Math.PI / 2.1, Math.min(Math.PI / 2.1, globeGroup.rotation.x))
      st.prevM = { x: t.clientX, y: t.clientY }
    }
    const onTouchEnd = () => {
      stateRef.current.isDragging = false
    }

    section.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    window.addEventListener('mouseleave', onMouseUp)
    section.addEventListener('touchstart', onTouchStart, { passive: true })
    section.addEventListener('touchmove', onTouchMove, { passive: true })
    section.addEventListener('touchend', onTouchEnd)

    const clock = new THREE.Clock()
    let animId

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const et = clock.getElapsedTime()
      const st = stateRef.current

      if (!st.isDragging) {
        globeGroup.rotation.y += st.rotVel.y
        globeGroup.rotation.x += st.rotVel.x
        globeGroup.rotation.x = Math.max(-Math.PI / 2.1, Math.min(Math.PI / 2.1, globeGroup.rotation.x))
        st.rotVel.x *= DAMP
        st.rotVel.y *= DAMP
        if (Math.abs(st.rotVel.y) < 0.0006) globeGroup.rotation.y += AUTO_V
      }

      coreLight.intensity = 2.8 + Math.sin(et * 2.1) * 0.7
      bloom.strength = st.isHovered ? 1.08 : 0.82

      const { nx, ny } = parallaxOffset.current
      canvas.style.translate = `${-nx * 12}px ${-ny * 8}px`

      const heading = sectionRef.current?.querySelector('.expertise-heading')
      const panel = sectionRef.current?.querySelector('.skills-panel')
      if (heading) heading.style.translate = `${nx * 15}px ${ny * 10}px`
      if (panel) panel.style.translate = `${-nx * 8}px ${-ny * 5}px`

      GLOBE_SKILLS.forEach((_, i) => {
        const el = cardRefs.current?.[i]
        if (!el) return
        const { sx, sy, vis, scale, behind } = project(skillLocalPosRef.current[i])
        const depth = 0.3 + ((i % 6) / 6) * 0.9
        const tx = nx * 22 * depth
        const ty = ny * 12 * depth
        if (vis < 0.02) {
          el.style.opacity = '0'
          el.style.pointerEvents = 'none'
          return
        }
        el.style.left = `${sx}px`
        el.style.top = `${sy}px`
        el.style.opacity = vis.toFixed(3)
        el.style.transform = `translate(-50%,-50%) scale(${scale.toFixed(3)})`
        el.style.translate = `${tx}px ${ty}px`
        el.style.zIndex = Math.floor(vis * 18).toString()
        el.style.pointerEvents = behind ? 'none' : 'auto'
      })

      composer.render()
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
      section.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('mouseleave', onMouseUp)
      section.removeEventListener('touchstart', onTouchStart)
      section.removeEventListener('touchmove', onTouchMove)
      section.removeEventListener('touchend', onTouchEnd)
      renderer.dispose()
    }
  }, [sectionRef, cardRefs, parallaxOffset])

  return (
    <canvas
      ref={canvasRef}
      id="threeCanvas"
      className="globe-canvas"
      aria-hidden="true"
    />
  )
}
