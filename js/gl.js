/* Hero 背景：原生 WebGL 流体噪声着色器（鼠标扰动 + 滚动溶解） */
(function () {
  const canvas = document.getElementById("gl");
  if (!canvas) return;
  const gl = canvas.getContext("webgl", { antialias: false, premultipliedAlpha: false });
  if (!gl) { canvas.style.background = "radial-gradient(circle at 70% 40%, #ff4d1f, #0c0b0a 60%)"; return; }

  const vert = `attribute vec2 p; void main(){ gl_Position = vec4(p,0.,1.); }`;
  const frag = `
  precision highp float;
  uniform vec2 uRes; uniform float uTime; uniform vec2 uMouse; uniform float uHover;
  uniform float uScroll; uniform float uIntro;

  vec3 hash3(vec2 p){ vec3 q = vec3(dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3)), dot(p,vec2(419.2,371.9))); return fract(sin(q)*43758.5453); }
  float noise(vec2 p){
    vec2 i=floor(p), f=fract(p); vec2 u=f*f*(3.-2.*f);
    float a=hash3(i).x, b=hash3(i+vec2(1,0)).x, c=hash3(i+vec2(0,1)).x, d=hash3(i+vec2(1,1)).x;
    return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
  }
  float fbm(vec2 p){ float v=0., a=.5; mat2 m=mat2(1.6,1.2,-1.2,1.6); for(int i=0;i<4;i++){ v+=a*noise(p); p=m*p; a*=.5; } return v; }

  void main(){
    vec2 uv = gl_FragCoord.xy / uRes;
    vec2 p = (gl_FragCoord.xy - .5*uRes) / min(uRes.x, uRes.y);
    vec2 m = (uMouse - .5*uRes) / min(uRes.x, uRes.y);

    float t = uTime * .08;
    // 鼠标附近的漩涡
    vec2 d = p - m; float r = length(d);
    float swirl = exp(-r*3.5) * (0.6 + uHover*0.8);
    float ang = swirl * 2.2;
    p = m + mat2(cos(ang),-sin(ang),sin(ang),cos(ang)) * d;

    vec2 q = vec2(fbm(p*1.4 + t), fbm(p*1.4 + vec2(5.2,1.3) - t));
    vec2 w = vec2(fbm(p*1.6 + 4.*q + vec2(1.7,9.2) + t*1.3), fbm(p*1.6 + 4.*q + vec2(8.3,2.8) - t));
    float f = fbm(p*1.2 + 3.5*w + uScroll*1.5);

    vec3 ink   = vec3(0.047, 0.043, 0.039);
    vec3 ember = vec3(0.32, 0.06, 0.02);
    vec3 chili = vec3(1.0, 0.30, 0.12);
    vec3 gold  = vec3(1.0, 0.72, 0.0);

    float k = smoothstep(.35, .95, f + length(w)*.25);
    vec3 col = mix(ink, ember, smoothstep(.35, .85, k));
    col = mix(col, chili, smoothstep(.78, 1.0, k));
    col = mix(col, gold, smoothstep(.95, 1.1, k) * .6);

    // 等高线细纹
    float lines = smoothstep(.0, .02, abs(fract(f*14.) - .5) - .46);
    col += (1.-lines) * .05 * (1.-uScroll);

    // 暗角 + 入场 + 滚动淡出
    float vig = smoothstep(1.25, .25, length(uv-.5)*1.4);
    col *= mix(.55, 1., vig);
    col = mix(ink, col, uIntro * (1. - uScroll*.85));
    gl_FragColor = vec4(col, 1.);
  }`;

  function sh(type, src) {
    const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(s));
    return s;
  }
  const prog = gl.createProgram();
  gl.attachShader(prog, sh(gl.VERTEX_SHADER, vert));
  gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, frag));
  gl.linkProgram(prog); gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, "p");
  gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const U = {};
  ["uRes", "uTime", "uMouse", "uHover", "uScroll", "uIntro"].forEach((n) => (U[n] = gl.getUniformLocation(prog, n)));

  const state = { mx: 0, my: 0, tx: 0, ty: 0, hover: 0, thover: 0, scroll: 0, intro: 0, visible: true };
  const DPR = Math.min(window.devicePixelRatio || 1, 1.25);
  const SCALE = 0.5; // 降采样渲染，省性能

  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    canvas.width = Math.round(w * DPR * SCALE); canvas.height = Math.round(h * DPR * SCALE);
    gl.viewport(0, 0, canvas.width, canvas.height);
    if (!state.tx) { state.tx = state.mx = canvas.width * .65; state.ty = state.my = canvas.height * .55; }
  }
  resize(); window.addEventListener("resize", resize);

  window.addEventListener("pointermove", (e) => {
    const r = canvas.getBoundingClientRect();
    state.tx = (e.clientX - r.left) / r.width * canvas.width;
    state.ty = (1 - (e.clientY - r.top) / r.height) * canvas.height;
    state.thover = 1;
    clearTimeout(state.idle); state.idle = setTimeout(() => (state.thover = 0), 600);
  });

  new IntersectionObserver(([e]) => (state.visible = e.isIntersecting)).observe(canvas);

  const start = performance.now();
  function frame(now) {
    requestAnimationFrame(frame);
    // 首屏被完全盖住后停止渲染，把性能留给滚动
    if (!state.visible || state.scroll > 0.98) return;
    state.mx += (state.tx - state.mx) * .06; state.my += (state.ty - state.my) * .06;
    state.hover += (state.thover - state.hover) * .05;
    gl.uniform2f(U.uRes, canvas.width, canvas.height);
    gl.uniform1f(U.uTime, (now - start) / 1000);
    gl.uniform2f(U.uMouse, state.mx, state.my);
    gl.uniform1f(U.uHover, state.hover);
    gl.uniform1f(U.uScroll, state.scroll);
    gl.uniform1f(U.uIntro, state.intro);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }
  requestAnimationFrame(frame);

  window.HeroGL = state;
})();
