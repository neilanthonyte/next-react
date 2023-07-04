/* tslint:disable */

import * as THREE from "three";

const fragmentShader = [
  "uniform vec2 u_resolution;",
  "uniform float u_time;",
  "uniform sampler2D u_noise;",
  "uniform sampler2D u_buffer;",
  "uniform bool u_rippleupdate;",
  "uniform int u_frame;",
  "",
  "uniform vec3 u_mouse1;",
  "uniform vec3 u_mouse2;",
  "uniform vec3 u_mouse3;",
  "uniform vec3 u_mouse4;",
  "uniform vec3 u_mouse5;",
  "uniform vec3 u_mouse6;",
  "uniform vec3 u_mouse7;",
  "uniform vec3 u_mouse8;",
  "",
  "#define PI 3.141592653589793",
  "#define TAU 6.283185307179586",
  "#define rain 1",
  "#define depth 20.",
  "#define velPropagation 1.4",
  "#define pow2(x) (x * x)",
  "",
  "// Holy fuck balls, fresnel!",
  "const float bias = .2;",
  "const float scale = 10.;",
  "const float power = 10.1;",
  "",
  "// blur constants",
  "const float blurMultiplier = 0.95;",
  "const float blurStrength = 2.98;",
  "const int samples = 8;",
  "const float sigma = float(samples) * 0.25;",
  "",
  "vec2 hash2(vec2 p)",
  "{",
  "  vec2 o = texture2D( u_noise, (p+0.5)/256.0, -100.0 ).xy;",
  "  return o;",
  "}",
  "",
  "vec3 hash33(vec3 p){",
  "",
  "  float n = sin(dot(p, vec3(7, 157, 113)));",
  "  return fract(vec3(2097152, 262144, 32768)*n);",
  "}",
  "",
  "vec3 hsb2rgb( in vec3 c ){",
  "  vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),",
  "    6.0)-3.0)-1.0,",
  "    0.0,",
  "    1.0 );",
  "  rgb = rgb*rgb*(3.0-2.0*rgb);",
  "  return c.z * mix( vec3(1.0), rgb, c.y);",
  "}",
  "",
  "vec3 domain(vec2 z){",
  "  return vec3(hsb2rgb(vec3(atan(z.y,z.x)/TAU,1.,1.)));",
  "}",
  "vec3 colour(vec2 z) {",
  "  return domain(z);",
  "}",
  "",
  "const float delta = .005;",
  "",
  "vec4 renderRipples() {",
  "  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);",
  "  vec3 e = vec3(vec2(3.6)/u_resolution.xy,0.);",
  "  vec2 sample = gl_FragCoord.xy / u_resolution.xy;",
  "  float ratio = u_resolution.x / u_resolution.y;",
  "  vec4 fragcolour = texture2D(u_buffer, sample);",
  "  float shade = 0.;",
  "",
  "  vec2 mouse1 = u_mouse1.xy - uv;",
  "  if(u_mouse1.z == 1.) {",
  "    shade += smoothstep(.02 + abs(sin(u_time*10.) * .006), .0, length(mouse1));",
  "  }",
  "  vec2 mouse2 = u_mouse2.xy - uv;",
  "  if(u_mouse2.z == 1.) {",
  "    shade += smoothstep(.02 + abs(sin(u_time*10.) * .006), .0, length(mouse2));",
  "  }",
  "  vec2 mouse3 = u_mouse1.xy - uv;",
  "  if(u_mouse3.z == 1.) {",
  "    shade += smoothstep(.02 + abs(sin(u_time*10.) * .006), .0, length(mouse3));",
  "  }",
  "  vec2 mouse4 = u_mouse2.xy - uv;",
  "  if(u_mouse4.z == 1.) {",
  "    shade += smoothstep(.02 + abs(sin(u_time*10.) * .006), .0, length(mouse4));",
  "  }",
  "  vec2 mouse5 = u_mouse1.xy - uv;",
  "  if(u_mouse5.z == 1.) {",
  "    shade += smoothstep(.02 + abs(sin(u_time*10.) * .006), .0, length(mouse5));",
  "  }",
  "  vec2 mouse6 = u_mouse2.xy - uv;",
  "  if(u_mouse6.z == 1.) {",
  "    shade += smoothstep(.02 + abs(sin(u_time*10.) * .006), .0, length(mouse6));",
  "  }",
  "  vec2 mouse7 = u_mouse1.xy - uv;",
  "  if(u_mouse7.z == 1.) {",
  "    shade += smoothstep(.02 + abs(sin(u_time*10.) * .006), .0, length(mouse7));",
  "  }",
  "  vec2 mouse8 = u_mouse2.xy - uv;",
  "  if(u_mouse8.z == 1.) {",
  "    shade += smoothstep(.02 + abs(sin(u_time*10.) * .006), .0, length(mouse8));",
  "  }",
  "",
  "  if(mod(u_time, .1) >= .095) {",
  "    vec2 hash = hash2(vec2(u_time*2., sin(u_time*10.)))*3.-1.;",
  "    shade += smoothstep(.012, .0, length(uv-hash+.5));",
  "  }",
  "",
  "  vec4 texcol = fragcolour;",
  "",
  "  float d = shade * 2.;",
  "",
  "  float t = texture2D(u_buffer, sample-e.zy, 1.).x;",
  "  float r = texture2D(u_buffer, sample-e.xz, 1.).x;",
  "  float b = texture2D(u_buffer, sample+e.xz, 1.).x;",
  "  float l = texture2D(u_buffer, sample+e.zy, 1.).x;",
  "",
  "  // fragcolour = (fragcolour + t + r + b + l) / 5.;",
  "  d += -(texcol.y-.5)*2. + (t + r + b + l - 2.);",
  "  d *= .99;",
  "  d *= float(u_frame > 5);",
  "  d = d*.5+.5;",
  "",
  "  fragcolour = vec4(d, texcol.x, 0, 0);",
  "",
  "  return fragcolour;",
  "}",
  "",
  "void main() {",
  "  vec4 fragcolour = vec4(0);",
  "  fragcolour = renderRipples();",
  "  gl_FragColor = fragcolour ;",
  "}",
].join("\n");

const vertexShader = [
  "void main() {",
  "  gl_Position = vec4( position, 1.0 );",
  "}",
].join("\n");

let container: HTMLElement;
let camera: any, scene: any, renderer: any;
let uniforms: any;

const canvasResolution = 1 / 16;
const textureFraction = 1 / canvasResolution;

const MAX_TOUCH_TARGETS = 8;

let renderWave = false;

let texture: any, rtTexture: any, rtTexture2: any, renderData: any;
let width: number, height: number;
let left: number, top: number;

const refreshSize = () => {
  width = container.offsetWidth * canvasResolution;
  height = container.offsetHeight * canvasResolution;
  refreshOffset();
};

const refreshOffset = () => {
  // relative to window
  const rect = container.getBoundingClientRect();
  left = rect.left;
  top = rect.top + window.scrollY;
};

function init(element: any) {
  // container = document.getElementById("container");
  // width = window.innerWidth;
  // height = window.innerHeight;
  container = element;
  refreshSize();

  camera = new THREE.Camera();
  camera.position.z = 1;

  scene = new THREE.Scene();

  const geometry = new THREE.PlaneBufferGeometry(2, 2);

  rtTexture = new THREE.WebGLRenderTarget(
    Math.floor(width * textureFraction),
    Math.floor(height * textureFraction),
    {
      type: THREE.FloatType,
      minFilter: THREE.NearestMipMapNearestFilter,
    },
  );
  rtTexture2 = new THREE.WebGLRenderTarget(
    Math.floor(width * textureFraction),
    Math.floor(height * textureFraction),
    {
      type: THREE.FloatType,
      minFilter: THREE.NearestMipMapNearestFilter,
    },
  );

  renderData = new Uint8Array(rtTexture.width * rtTexture.height * 4);

  uniforms = {
    u_time: {
      type: "f",
      value: 1.0,
    },
    u_resolution: {
      type: "v2",
      value: new THREE.Vector2(),
    },
    u_noise: {
      type: "t",
      value: texture,
    },
    u_buffer: {
      type: "t",
      value: rtTexture.texture,
    },
    u_frame: {
      type: "i",
      value: -1,
    },
    u_rippleupdate: {
      type: "b",
      value: false,
    },
    u_mouse1: {
      type: "v3",
      value: new THREE.Vector3(),
    },
    u_mouse2: {
      type: "v3",
      value: new THREE.Vector3(),
    },
    u_mouse3: {
      type: "v3",
      value: new THREE.Vector3(),
    },
    u_mouse4: {
      type: "v3",
      value: new THREE.Vector3(),
    },
    u_mouse5: {
      type: "v3",
      value: new THREE.Vector3(),
    },
    u_mouse6: {
      type: "v3",
      value: new THREE.Vector3(),
    },
    u_mouse7: {
      type: "v3",
      value: new THREE.Vector3(),
    },
    u_mouse8: {
      type: "v3",
      value: new THREE.Vector3(),
    },
  };

  const material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
  });
  material.extensions.derivatives = true;

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("webgl2", { alpha: false });
  renderer = new THREE.WebGLRenderer({ canvas, context } as any);
  container.appendChild(renderer.domElement);

  onWindowResize();
  // window.addEventListener("resize", onWindowResize, false);
  // window.addEventListener("scroll", refreshOffset, false);

  // container.addEventListener("pointermove", e => {
  //   const containerWidth = width / canvasResolution;
  //   const containerHeight = height / canvasResolution;
  //
  //   let ratio = height / width;
  //
  //   let mouseX = 0;
  //   let mouseY = 0;
  //
  //   if (height > width) {
  //     mouseX = (e.pageX - left - containerWidth / 2) / containerWidth;
  //     mouseY =
  //       ((e.pageY - top - containerHeight / 2) / containerHeight) * -1 * ratio;
  //   } else {
  //     mouseX =
  //       (e.pageX - left - containerWidth / 2) / containerWidth / ratio;
  //     mouseY =
  //       ((e.pageY - top - containerHeight / 2) / containerHeight) * -1;
  //   }
  //
  //   // try rendering two points at once
  //
  //   // testing..
  //   // uniforms.u_mouse1.value.x = mouseX;
  //   // uniforms.u_mouse1.value.y = mouseY;
  //   //
  //   // uniforms.u_mouse2.value.x = mouseX + 0.25;
  //   // uniforms.u_mouse2.value.y = mouseY - 0.25;
  //   // render(0);
  //   // uniforms.u_mouse.value.x = mouseX + 0.25;
  //   // uniforms.u_mouse.value.y = mouseY - 0.25;
  //   // render(0);
  //
  //   e.preventDefault();
  // });
  // container.addEventListener("pointerdown", (e: any) => {
  //   uniforms.u_mouse1.value.z = 1;
  //   uniforms.u_mouse2.value.z = 1;
  // });
  // container.addEventListener("pointerup", () => {
  //   uniforms.u_mouse1.value.z = 0;
  //   uniforms.u_mouse2.value.z = 0;
  // });

  const clearTouch = () => {
    for (let i = 1; i <= MAX_TOUCH_TARGETS; i++) {
      uniforms["u_mouse" + i].value.z = 0;
    }
  };

  const normalisePosition = (pageX: number, pageY: number) => {
    const containerWidth = width / canvasResolution;
    const containerHeight = height / canvasResolution;

    const ratio = height / width;

    let mouseX = 0;
    let mouseY = 0;

    if (height > width) {
      mouseX = (pageX - left - containerWidth / 2) / containerWidth;
      mouseY =
        ((pageY - top - containerHeight / 2) / containerHeight) * -1 * ratio;
    } else {
      mouseX = (pageX - left - containerWidth / 2) / containerWidth / ratio;
      mouseY = ((pageY - top - containerHeight / 2) / containerHeight) * -1;
    }
    return { x: mouseX, y: mouseY };
  };

  const handleTouch = (e: any) => {
    e.preventDefault();

    // touch with as many fingers as there is on screen
    const numberOfFingersOnScreen = Math.min(
      e.targetTouches.length,
      MAX_TOUCH_TARGETS,
    );

    clearTouch();

    // update mouse pos
    for (let i = 0; i < numberOfFingersOnScreen; i++) {
      const { pageX, pageY } = e.targetTouches[i];
      const { x, y } = normalisePosition(pageX, pageY);
      uniforms["u_mouse" + (i + 1)].value = { x, y, z: 1 };
    }
  };

  container.addEventListener("touchstart", handleTouch);
  container.addEventListener("touchend", handleTouch);
  container.addEventListener("touchmove", handleTouch);

  let mouseOn: boolean = false;
  container.addEventListener("mousedown", () => (mouseOn = true));
  container.addEventListener("mouseup", () => (mouseOn = false));
  container.addEventListener("mousemove", (evt) => {
    clearTouch();
    if (mouseOn) {
      const { pageX, pageY } = evt;
      const { x, y } = normalisePosition(pageX, pageY);
      uniforms["u_mouse1"].value = { x, y, z: 1 };
    }
  });
}

function onWindowResize() {
  refreshSize();
  renderer.setSize(width, height);
  uniforms.u_resolution.value.x = renderer.domElement.width;
  uniforms.u_resolution.value.y = renderer.domElement.height;

  rtTexture = new THREE.WebGLRenderTarget(
    width * textureFraction,
    height * textureFraction,
  );
  rtTexture2 = new THREE.WebGLRenderTarget(
    width * textureFraction,
    height * textureFraction,
  );

  uniforms.u_frame.value = -1;
}

function animate(delta = 0) {
  render(delta);
  requestAnimationFrame(animate);
}

// let then = 0;
// let beta = Math.random() * -1000;

function render(delta: number) {
  uniforms.u_frame.value++;

  if (renderWave) {
    uniforms.u_time.value = delta * 0.0005;
    renderer.render(scene, camera);
  }

  // update ripples (?)
  const odims = uniforms.u_resolution.value.clone();
  uniforms.u_resolution.value.x = width * textureFraction;
  uniforms.u_resolution.value.y = height * textureFraction;

  uniforms.u_buffer.value = rtTexture2.texture;
  uniforms.u_rippleupdate.value = true;

  window.rtTexture = rtTexture;
  renderer.setRenderTarget(rtTexture);
  renderer.render(scene, camera, rtTexture, true);

  const buffer = rtTexture;
  rtTexture = rtTexture2;
  rtTexture2 = buffer;

  uniforms.u_buffer.value = rtTexture.texture;
  uniforms.u_resolution.value = odims;
  uniforms.u_rippleupdate.value = true;
}

export const start = (container: any, render: boolean) => {
  setTimeout(() => {
    renderWave = render;
    init(container);

    animate();
  });
};

export const stop = () => {
  // TODO
};

export const exportWaveData = () => {
  if (!renderer) return;
  // read render texture into buffer
  const gl = renderer.getContext();
  gl.readPixels(
    0,
    0,
    rtTexture.width,
    rtTexture.height,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    renderData,
  );
};

export const getWaveHeight = (x: number, y: number): number => {
  if (typeof renderData === "undefined") {
    return 0.5;
  }
  const fX = Math.floor(x);
  const fY = Math.floor(rtTexture.height - y);

  const index = Math.floor(fY * rtTexture.width + fX) * 4;
  if (index > renderData.length) {
    // console.warn("index too big", index);
    return 0.5;
  }
  return (renderData[index] / 256.0) as number;
};
