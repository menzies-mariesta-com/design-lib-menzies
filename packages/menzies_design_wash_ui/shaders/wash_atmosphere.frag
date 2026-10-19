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
uniform float uBrushOpacity;
uniform float uBrushFlow;
uniform float uBrushWater;
uniform float uGrainOpacity;

out vec4 fragColor;

float hash21(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float ellipseWash(vec2 uv, vec2 center, vec2 radii, float strength) {
  vec2 d = (uv - center) / radii;
  float t = dot(d, d);
  return strength * smoothstep(1.0, 0.0, t);
}

vec3 mixWash(vec3 base, vec3 wash, float a) {
  return mix(base, wash, clamp(a, 0.0, 1.0));
}

float fiberLines(vec2 uv) {
  float angle = 1.832596; // ~105deg
  mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
  vec2 p = rot * (uv * uSize);
  float line = fract(p.y / 12.0);
  float fiber = smoothstep(0.75, 0.78, line) * smoothstep(0.92, 0.88, line);
  return fiber * 0.35;
}

void main() {
  vec2 frag = FlutterFragCoord().xy;
  vec2 uv = frag / uSize;

  vec3 color = uBase.rgb;

  float op = uBrushOpacity;
  float flow = uBrushFlow;
  float water = uBrushWater;

  float w1 = ellipseWash(uv, vec2(0.06, -0.05), vec2(0.55 + water * 0.002, 0.38 + flow * 0.001), 0.55 + op * 0.3);
  float w2 = ellipseWash(uv, vec2(0.96, 0.04), vec2(0.42, 0.28 + flow * 0.003), 0.5 + flow * 0.003);
  float w3 = ellipseWash(uv, vec2(0.72, 1.0), vec2(0.35, 0.26 + water * 0.0035), 0.42 + water * 0.0035);
  float w4 = ellipseWash(uv, vec2(0.40, 0.45), vec2(0.28, 0.22), 0.28);

  color = mixWash(color, uWashA.rgb, w1);
  color = mixWash(color, uWashB.rgb, w2);
  color = mixWash(color, uWashC.rgb, w3);
  color = mixWash(color, uWashA.rgb, w4 * 0.7);

  if (uGrainEnabled > 0.5) {
    vec2 gUv = uv * uSize;
    float speck1 = ellipseWash(uv, vec2(0.12, 0.18), vec2(0.08, 0.08), 0.12);
    float speck2 = ellipseWash(uv, vec2(0.68, 0.32), vec2(0.07, 0.07), 0.08);
    float speck3 = ellipseWash(uv, vec2(0.42, 0.78), vec2(0.09, 0.09), 0.1);
    float speck4 = ellipseWash(uv, vec2(0.88, 0.64), vec2(0.08, 0.08), 0.09);

    vec3 grainTint = uPigmentGrain.rgb * speck1 * 0.35;
    grainTint += uBase.rgb * speck2 * 0.1;
    grainTint += uPrimary.rgb * speck3 * 0.22;
    grainTint += uAccent.rgb * speck4 * 0.2;

    float n = hash21(floor(gUv / 3.0)) * 0.04;
    float fiber = fiberLines(uv);
    vec3 grain = grainTint + uPaperFiber.rgb * (fiber + n);

    float g = uGrainOpacity;
    color = mix(color, color * (1.0 - g * 0.15) + grain * g * 0.35, clamp(g, 0.0, 1.0));
  }

  fragColor = vec4(color, 1.0);
}
