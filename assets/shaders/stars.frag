precision highp float;

uniform float time;
uniform vec2 resolution;

#define iTime time
#define iResolution resolution

float rand(in vec2 st) {
  vec2 r = fract(sin(st) * 2.7644437);
  return fract(r.y * 276.44437 + r.x);
}

float particles(in vec2 st) {
  float r = rand(floor(st));
  return 0.01 + smoothstep(0.995, 1.0, r) * max(0.0, sin(r * 34433.0 + iTime));
}

const vec3 BLUE = vec3(0.0, 0.1, 0.2);

#define p(st) particles(st)
vec3 avg(in vec2 st, in float a) {
  vec2 A = vec2(0.0, a);
  return BLUE * (p(st) + p(st + A) + p(st + A.yx) + p(st - A) + p(st - A.yx));
}

vec3 stars(in vec2 st) {
  vec3 color = vec3(0.0);
  for (float i = 5.0; i > 0.0; --i) color += mix(color, avg(st, i), 1.5);
  return color + p(st);
}

#define scale 150.0

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 st = (fragCoord - 0.5 * iResolution.xy) / iResolution.y;
  st *= scale;

  vec3 color = stars(st);

  fragColor = vec4(color, 1.0);
}
  
void main(void) {
  mainImage(gl_FragColor, gl_FragCoord.xy);
}