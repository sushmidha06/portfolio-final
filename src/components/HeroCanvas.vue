<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const host = ref(null)

let renderer = null
let scene, camera, points, raf = 0
let visible = true
let disposed = false

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

// pointer state — target and eased position, in world coords on the field plane
const pointer = { tx: 999, tz: 999, x: 999, z: 999, camX: 0, camTX: 0 }

const raycaster = new THREE.Raycaster()
const fieldPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)
const ndc = new THREE.Vector2()
const hit = new THREE.Vector3()

const VERT = `
uniform float uTime;
uniform vec2 uMouse;
uniform float uPix;
attribute vec3 aColor;
varying vec3 vColor;
varying float vDepth;

void main() {
  vec3 p = position;
  float t = uTime * 0.55;

  float wave =
      sin(p.x * 0.32 + t)        * cos(p.z * 0.38 + t * 0.7) * 0.6
    + sin(p.x * 0.11 - t * 0.45) * 0.85
    + cos(p.z * 0.16 + t * 0.3)  * 0.4;

  float d = distance(p.xz, uMouse);
  float bump = 2.1 * exp(-d * d * 0.09);

  p.y += wave + bump;

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;

  float size = (1.9 + bump * 2.6) * uPix;
  gl_PointSize = size * (11.0 / -mv.z);

  vColor = aColor;
  vDepth = smoothstep(30.0, 8.0, -mv.z);
}
`

const FRAG = `
varying vec3 vColor;
varying float vDepth;

void main() {
  float a = smoothstep(0.5, 0.26, length(gl_PointCoord - 0.5));
  gl_FragColor = vec4(vColor, a * (0.28 + 0.55 * vDepth));
}
`

function init() {
  const el = host.value
  if (!el) return

  try {
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'high-performance' })
  } catch {
    return // no WebGL — hero simply stays flat paper
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(el.clientWidth, el.clientHeight)
  el.appendChild(renderer.domElement)

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(42, el.clientWidth / el.clientHeight, 0.1, 100)
  camera.position.set(0, 7.4, 11.5)
  camera.lookAt(0, 0.4, 0)

  const geo = new THREE.PlaneGeometry(48, 28, 230, 125)
  geo.rotateX(-Math.PI / 2)

  const count = geo.attributes.position.count
  const colors = new Float32Array(count * 3)
  const ink = [0.11, 0.1, 0.08]
  const cobalt = [0.114, 0.227, 0.95]
  for (let i = 0; i < count; i++) {
    const c = Math.random() < 0.075 ? cobalt : ink
    colors[i * 3] = c[0]
    colors[i * 3 + 1] = c[1]
    colors[i * 3 + 2] = c[2]
  }
  geo.setAttribute('aColor', new THREE.BufferAttribute(colors, 3))

  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(999, 999) },
      uPix: { value: renderer.getPixelRatio() },
    },
    vertexShader: VERT,
    fragmentShader: FRAG,
  })

  points = new THREE.Points(geo, mat)
  scene.add(points)

  if (reduced) {
    mat.uniforms.uTime.value = 2.5
    renderer.render(scene, camera)
    return
  }

  const t0 = performance.now()
  const loop = () => {
    if (disposed) return
    raf = requestAnimationFrame(loop)
    if (!visible) return

    pointer.x += (pointer.tx - pointer.x) * 0.07
    pointer.z += (pointer.tz - pointer.z) * 0.07
    pointer.camX += (pointer.camTX - pointer.camX) * 0.04

    camera.position.x = pointer.camX
    camera.lookAt(0, 0.4, 0)

    mat.uniforms.uTime.value = (performance.now() - t0) / 1000
    mat.uniforms.uMouse.value.set(pointer.x, pointer.z)
    renderer.render(scene, camera)
  }
  loop()
}

function onPointerMove(e) {
  const el = host.value
  if (!el || !camera) return
  const r = el.getBoundingClientRect()
  ndc.x = ((e.clientX - r.left) / r.width) * 2 - 1
  ndc.y = -((e.clientY - r.top) / r.height) * 2 + 1
  pointer.camTX = ndc.x * 1.1
  raycaster.setFromCamera(ndc, camera)
  if (raycaster.ray.intersectPlane(fieldPlane, hit)) {
    pointer.tx = hit.x
    pointer.tz = hit.z
  }
}

let resizeObs = null
let io = null

onMounted(() => {
  init()
  if (!renderer) return

  window.addEventListener('pointermove', onPointerMove, { passive: true })

  resizeObs = new ResizeObserver(() => {
    const el = host.value
    if (!el || !renderer) return
    renderer.setSize(el.clientWidth, el.clientHeight)
    camera.aspect = el.clientWidth / el.clientHeight
    camera.updateProjectionMatrix()
    if (reduced) renderer.render(scene, camera)
  })
  resizeObs.observe(host.value)

  io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
  })
  io.observe(host.value)
})

onUnmounted(() => {
  disposed = true
  cancelAnimationFrame(raf)
  window.removeEventListener('pointermove', onPointerMove)
  resizeObs?.disconnect()
  io?.disconnect()
  if (points) {
    points.geometry.dispose()
    points.material.dispose()
  }
  renderer?.dispose()
  renderer?.domElement?.remove()
})
</script>

<template>
  <div ref="host" class="field" aria-hidden="true"></div>
</template>

<style scoped>
.field {
  position: absolute;
  inset: 0;
  overflow: hidden;
  /* fade the dot terrain out near the top so the display type stays crisp */
  mask-image: linear-gradient(180deg, transparent 4%, black 38%, black 92%, transparent 100%);
  -webkit-mask-image: linear-gradient(180deg, transparent 4%, black 38%, black 92%, transparent 100%);
}
.field :deep(canvas) {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
