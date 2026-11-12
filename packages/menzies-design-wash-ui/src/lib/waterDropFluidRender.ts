/**
 * Renders fluid drops on one full-viewport canvas (Canvas2D default; WebGL opt-in).
 */

export type FluidDropDraw = {
  points: Array<{ x: number; y: number; r: number }>
  activity: number
}

export type FluidRendererMode = 'canvas2d' | 'webgl' | 'auto'

export type FluidRendererOptions = {
  mode?: FluidRendererMode
}

export type FluidDrawBounds = {
  x: number
  y: number
  width: number
  height: number
}

export type FluidRenderer = {
  resize: (w: number, h: number) => void
  setPigmentRgb: (rgb: [number, number, number]) => void
  beginFrame: () => void
  drawDrop: (drop: FluidDropDraw) => void
  endFrame: () => void
  dispose: () => void
  mode: 'webgl' | 'canvas2d'
}

const MAX_PARTICLES = 32
const MAX_DRAW_BOX = 120
const PAD_PX = 8

export function dropDrawBounds(
  points: Array<{ x: number; y: number; r: number }>,
  pad = PAD_PX,
  maxBox = MAX_DRAW_BOX,
): FluidDrawBounds | null {
  if (points.length === 0) return null
  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity
  for (const p of points) {
    const reach = p.r * 1.6
    minX = Math.min(minX, p.x - reach)
    minY = Math.min(minY, p.y - reach)
    maxX = Math.max(maxX, p.x + reach)
    maxY = Math.max(maxY, p.y + reach)
  }
  minX -= pad
  minY -= pad
  maxX += pad
  maxY += pad
  const cx = (minX + maxX) * 0.5
  const cy = (minY + maxY) * 0.5
  let w = maxX - minX
  let h = maxY - minY
  if (w > maxBox) w = maxBox
  if (h > maxBox) h = maxBox
  return {
    x: cx - w * 0.5,
    y: cy - h * 0.5,
    width: w,
    height: h,
  }
}

const VERT_SRC = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`

const FRAG_SRC = `
precision mediump float;
uniform vec2 u_resolution;
uniform vec3 u_color;
uniform float u_activity;
uniform int u_count;
uniform vec3 u_particles[${MAX_PARTICLES}];

void main() {
  vec2 frag = gl_FragCoord.xy;
  float field = 0.0;
  for (int i = 0; i < ${MAX_PARTICLES}; i++) {
    if (i >= u_count) continue;
    vec3 p = u_particles[i];
    vec2 d = frag - p.xy;
    float r = max(p.z, 1.0);
    float q = dot(d, d) + r * r * 0.55;
    field += (r * r * 0.55) / q;
  }
  float edge = smoothstep(1.25, 1.75, field);
  if (edge < 0.03) discard;
  vec2 eps = vec2(1.0, 0.0);
  float fx = 0.0;
  float fy = 0.0;
  for (int i = 0; i < ${MAX_PARTICLES}; i++) {
    if (i >= u_count) continue;
    vec3 p = u_particles[i];
    vec2 d = (frag + eps.xy) - p.xy;
    float r = max(p.z, 1.0);
    fx += (r * r * 0.55) / (dot(d, d) + r * r * 0.55);
    d = (frag + eps.yx) - p.xy;
    fy += (r * r * 0.55) / (dot(d, d) + r * r * 0.55);
  }
  vec3 n = normalize(vec3(fx - field, fy - field, 0.4));
  float spec = pow(max(dot(n, normalize(vec3(0.35, -0.65, 0.5))), 0.0), 12.0);
  vec3 col = u_color * (0.5 + edge * 0.45) + spec * (0.2 + u_activity * 0.25);
  float alpha = min(0.55, edge * (0.45 + u_activity * 0.15));
  gl_FragColor = vec4(col, alpha);
}
`

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  src: string,
): WebGLShader | null {
  const sh = gl.createShader(type)
  if (!sh) return null
  gl.shaderSource(sh, src)
  gl.compileShader(sh)
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh)
    return null
  }
  return sh
}

function createGlProgram(gl: WebGLRenderingContext): WebGLProgram | null {
  const vs = compileShader(gl, gl.VERTEX_SHADER, VERT_SRC)
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAG_SRC)
  if (!vs || !fs) return null
  const prog = gl.createProgram()
  if (!prog) return null
  gl.attachShader(prog, vs)
  gl.attachShader(prog, fs)
  gl.linkProgram(prog)
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    gl.deleteProgram(prog)
    return null
  }
  return prog
}

export function parseWaterDropPigmentRgb(
  fallback: [number, number, number],
): [number, number, number] {
  if (typeof document === 'undefined') return fallback
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue('--wash-water-drop-core')
    .trim()
  if (!raw) return fallback
  const probe = document.createElement('span')
  probe.style.color = raw
  probe.style.display = 'none'
  document.body.appendChild(probe)
  const rgb = getComputedStyle(probe).color
  probe.remove()
  const m = rgb.match(/[\d.]+/g)
  if (!m || m.length < 3) return fallback
  return [Number(m[0]) / 255, Number(m[1]) / 255, Number(m[2]) / 255]
}

function createWebGlRenderer(canvas: HTMLCanvasElement): FluidRenderer | null {
  const gl = canvas.getContext('webgl', {
    alpha: true,
    premultipliedAlpha: true,
    antialias: true,
  })
  if (!gl) return null
  const program = createGlProgram(gl)
  if (!program) return null

  const buf = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buf)
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
    gl.STATIC_DRAW,
  )
  const aPos = gl.getAttribLocation(program, 'a_pos')
  const uResolution = gl.getUniformLocation(program, 'u_resolution')
  const uColor = gl.getUniformLocation(program, 'u_color')
  const uActivity = gl.getUniformLocation(program, 'u_activity')
  const uCount = gl.getUniformLocation(program, 'u_count')
  const uParticles = gl.getUniformLocation(program, 'u_particles')

  let width = 0
  let height = 0
  let pigment: [number, number, number] = parseWaterDropPigmentRgb([0.35, 0.52, 0.78])

  const drawDrop = (drop: FluidDropDraw) => {
    if (drop.points.length === 0) return
    const box = dropDrawBounds(drop.points)
    if (!box || box.width <= 0 || box.height <= 0) return

    const sx = Math.floor(box.x)
    const sy = Math.floor(height - box.y - box.height)
    const sw = Math.ceil(box.width)
    const sh = Math.ceil(box.height)

    gl.useProgram(program)
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const flat: number[] = []
    const count = Math.min(drop.points.length, MAX_PARTICLES)
    for (let i = 0; i < count; i++) {
      const p = drop.points[i]
      flat.push(p.x, p.y, p.r)
    }
    while (flat.length < MAX_PARTICLES * 3) flat.push(0, 0, 0)

    gl.enable(gl.SCISSOR_TEST)
    gl.viewport(sx, sy, sw, sh)
    gl.scissor(sx, sy, sw, sh)

    gl.uniform2f(uResolution, width, height)
    gl.uniform3fv(uColor, pigment)
    gl.uniform1f(uActivity, drop.activity)
    gl.uniform1i(uCount, count)
    gl.uniform3fv(uParticles, new Float32Array(flat))

    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

    gl.disable(gl.SCISSOR_TEST)
    gl.viewport(0, 0, width, height)
  }

  return {
    mode: 'webgl',
    resize: (w, h) => {
      width = w
      height = h
      canvas.width = w
      canvas.height = h
      gl.viewport(0, 0, w, h)
    },
    setPigmentRgb: (rgb) => {
      pigment = rgb
    },
    beginFrame: () => {
      pigment = parseWaterDropPigmentRgb(pigment)
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
    },
    drawDrop,
    endFrame: () => {},
    dispose: () => {
      gl.deleteProgram(program)
      gl.deleteBuffer(buf)
    },
  }
}

function createCanvas2dRenderer(canvas: HTMLCanvasElement): FluidRenderer {
  let width = 0
  let height = 0
  let pigmentRgb: [number, number, number] = [0.45, 0.55, 0.72]
  const ctx = canvas.getContext('2d')

  const pigmentRgba = (alpha: number) =>
    `rgba(${Math.round(pigmentRgb[0] * 255)},${Math.round(pigmentRgb[1] * 255)},${Math.round(pigmentRgb[2] * 255)},${alpha})`

  const drawDrop = (drop: FluidDropDraw) => {
    if (!ctx || drop.points.length === 0) return
    const box = dropDrawBounds(drop.points)
    if (!box) return

    let cx = 0
    let cy = 0
    for (const p of drop.points) {
      cx += p.x
      cy += p.y
    }
    cx /= drop.points.length
    cy /= drop.points.length

    ctx.save()
    ctx.beginPath()
    ctx.rect(box.x, box.y, box.width, box.height)
    ctx.clip()

    ctx.globalCompositeOperation = 'lighter'
    const baseAlpha = 0.12 + drop.activity * 0.06
    for (const p of drop.points) {
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 1.35)
      g.addColorStop(0, pigmentRgba(baseAlpha * 1.4))
      g.addColorStop(0.45, pigmentRgba(baseAlpha))
      g.addColorStop(1, pigmentRgba(0))
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r * 1.2, 0, Math.PI * 2)
      ctx.fill()
    }

    ctx.globalCompositeOperation = 'source-over'
    const g0 = ctx.createRadialGradient(cx, cy, 0, cx, cy, 4)
    g0.addColorStop(0, 'rgba(255,255,255,0.35)')
    g0.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = g0
    ctx.beginPath()
    ctx.arc(cx - 2, cy - 2, 3, 0, Math.PI * 2)
    ctx.fill()

    ctx.restore()
  }

  return {
    mode: 'canvas2d',
    resize: (w, h) => {
      width = w
      height = h
      canvas.width = w
      canvas.height = h
    },
    setPigmentRgb: (rgb) => {
      pigmentRgb = rgb
    },
    beginFrame: () => {
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)
      pigmentRgb = parseWaterDropPigmentRgb(pigmentRgb)
    },
    drawDrop,
    endFrame: () => {},
    dispose: () => {},
  }
}

export function createFluidRenderer(
  canvas: HTMLCanvasElement,
  options: FluidRendererOptions = {},
): FluidRenderer {
  const mode = options.mode ?? 'canvas2d'
  if (mode === 'webgl' || mode === 'auto') {
    const gl = createWebGlRenderer(canvas)
    if (gl) return gl
    if (mode === 'webgl') {
      return createCanvas2dRenderer(canvas)
    }
  }
  return createCanvas2dRenderer(canvas)
}
