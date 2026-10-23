#version 460 core

#include <flutter/runtime_effect.glsl>

uniform vec2 uSize;
uniform float uGrainEnabled;
uniform vec4 uBase;
uniform vec4 uWashA;
uniform vec4 uWashB;
uniform vec4 uWashC;
uniform vec4 uPrimary;
uniform vec4 uAccent;
uniform vec4 uPaperFiber;
uniform vec4 uPigmentGrain;
uniform float uGrainSoftLight;
uniform float uBrushOpacity;
uniform float uBrushFlow;
uniform float uBrushWater;
uniform float uGrainOpacity;

out vec4 fragColor;

float hash21(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

// CSS radial-gradient(ellipse rx ry at cx cy, colour A, transparent stop):
// alpha falls linearly from A at the centre to zero at [stop] of the ellipse.
float ellipseWash(
  vec2 uv,
  vec2 center,
  vec2 radii,
  float strength,
  float stop
) {
  vec2 d = (uv - center) / radii;
  float t = sqrt(dot(d, d));
  return strength * clamp(1.0 - t / stop, 0.0, 1.0);
}

vec3 mixWash(vec3 base, vec3 wash, float a) {
  return mix(base, wash, clamp(a, 0.0, 1.0));
}

float dotMask(
  vec2 px,
  float tile,
  vec2 centerFrac,
  float radius,
  float fade
) {
  vec2 cell = mod(px, vec2(tile));
  vec2 center = centerFrac * tile;
  float d = length(cell - center);
  return 1.0 - smoothstep(radius, fade, d);
}

void compositeOver(
  inout vec3 dst,
  inout float dstA,
  vec3 src,
  float srcA
) {
  float a = clamp(srcA, 0.0, 1.0);
  float outA = a + dstA * (1.0 - a);
  if (outA > 0.0001) {
    dst = (src * a + dst * dstA * (1.0 - a)) / outA;
  }
  dstA = outA;
}

vec3 softLight(vec3 base, vec3 blend) {
  vec3 lo = 2.0 * base * blend + base * base * (1.0 - 2.0 * blend);
  vec3 hi = sqrt(base) * (2.0 * blend - 1.0) + 2.0 * base * (1.0 - blend);
  return mix(lo, hi, step(vec3(0.5), blend));
}

void main() {
  vec2 frag = FlutterFragCoord().xy;
  vec2 uv = frag / uSize;

  vec3 color = uBase.rgb;

  float op = uBrushOpacity;
  float flow = uBrushFlow;
  float water = uBrushWater;

  // Match .page-wash in the web stylesheet: four CSS ellipses. Layer order is
  // bottom-up here so the first CSS gradient ends up on top.
  float w1 = ellipseWash(
    uv,
    vec2(0.06, -0.05),
    vec2(0.80 + water * 0.002, 0.50 + flow * 0.001),
    0.55 + op * 0.30,
    0.58
  );
  float w2 = ellipseWash(
    uv,
    vec2(0.96, 0.04),
    vec2(0.70, 0.45),
    0.50 + flow * 0.30,
    0.52
  );
  float w3 = ellipseWash(
    uv,
    vec2(0.72, 1.00),
    vec2(0.55, 0.40),
    0.42 + water * 0.35,
    0.58
  );
  float w4 = ellipseWash(
    uv,
    vec2(0.40, 0.45),
    vec2(0.40, 0.30),
    0.28,
    0.70
  );

  color = mixWash(color, uWashA.rgb, w4);
  color = mixWash(color, uWashC.rgb, w3);
  color = mixWash(color, uWashB.rgb, w2);
  color = mixWash(color, uWashA.rgb, w1);

  if (uGrainEnabled > 0.5) {
    // .paper-grain: four tiled pigment dots plus a one-pixel fibre band every
    // 12px on a 105deg repeating gradient, composited once with multiply (or
    // soft-light in the dark themes).
    float linePhase = mod(dot(frag, vec2(0.9659258, 0.2588190)), 12.0);
    float lineMask =
      smoothstep(2.75, 3.0, linePhase) *
      (1.0 - smoothstep(4.0, 4.25, linePhase));

    float d1 = dotMask(frag, 180.0, vec2(0.12, 0.18), 0.6, 1.2);
    float d2 = dotMask(frag, 140.0, vec2(0.68, 0.32), 0.5, 1.0);
    float d3 = dotMask(frag, 200.0, vec2(0.42, 0.78), 0.7, 1.3);
    float d4 = dotMask(frag, 160.0, vec2(0.88, 0.64), 0.5, 1.0);

    vec3 grain = uPaperFiber.rgb;
    float grainA = lineMask * 0.55;
    compositeOver(grain, grainA, uAccent.rgb, d4 * 0.20);
    compositeOver(grain, grainA, uPrimary.rgb, d3 * 0.22);
    compositeOver(grain, grainA, uBase.rgb, d2 * 0.10);
    compositeOver(grain, grainA, uPigmentGrain.rgb, d1 * 0.35);

    vec3 blended = mix(color * grain, softLight(color, grain), uGrainSoftLight);
    color = mix(color, blended, clamp(uGrainOpacity * grainA, 0.0, 1.0));
  }

  fragColor = vec4(color, 1.0);
}
