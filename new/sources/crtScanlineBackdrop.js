// Ensure Three.js is included in your project
// Create a scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
camera.position.z = 1;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

let element = renderer.domElement
element.style.position = "absolute";
element.style.top = "calc(400vh + 64px)";
element.style.height = "100vh";
element.style.left = "0";
element.style.opacity = "0.5";
element.style.zIndex = "-1";

document.getElementById("section-5").prepend(element);

// Plane geometry for the screen
const geometry = new THREE.PlaneBufferGeometry(2, 2); // Full-screen quad

// Define uniforms for your shader
const uniforms = {
  iTime: { value: 0 },
  iResolution: { value: new THREE.Vector3(window.innerWidth, window.innerHeight, 1) },
  iChannel0: { value: null } // Video texture
};

// Your shader material using the ShaderToy code
const material = new THREE.ShaderMaterial({
  uniforms: uniforms,
  vertexShader: `
	void main() {
	  gl_Position = vec4(position, 1.0);
	}
  `,
  fragmentShader: `
	uniform float iTime;
	uniform vec3 iResolution;
	uniform sampler2D iChannel0;

	vec3 scanline(vec2 coord, vec3 screen) {
	  const float scale = .66;
	  const float amt = 0.02;
	  const float spd = 1.0;
	  screen.rgb += sin((coord.y / scale - (iTime * spd * 6.28))) * amt;
	  return screen;
	}

	vec2 fisheye(vec2 uv, float str) {
	  vec2 neg1to1 = uv * 2.0 - 1.0;
	  vec2 offset = vec2(pow(neg1to1.y, 2.0), pow(neg1to1.x, 2.0)) * str * neg1to1;
	  return uv + offset;
	}

	vec3 channelSplit(sampler2D tex, vec2 coord) {
	  const float spread = 0.004;
	  vec3 frag;
	  frag.r = texture2D(tex, vec2(coord.x - spread * sin(iTime), coord.y)).r;
	  frag.g = texture2D(tex, vec2(coord.x, coord.y)).g;
	  frag.b = texture2D(tex, vec2(coord.x + spread * sin(iTime), coord.y)).b;
	  return frag;
	}

	void mainImage(out vec4 fragColor, in vec2 fragCoord) {
	  vec2 uv = fragCoord.xy / iResolution.xy;
	  vec2 fisheyeUV = fisheye(uv, 0.03);
	  fragColor.rgb = channelSplit(iChannel0, fisheyeUV);
	  vec2 screenSpace = fisheyeUV * iResolution.xy;
	  fragColor.rgb = scanline(screenSpace, fragColor.rgb);
	}

	// Main function for Three.js shaders
	void main() {
	  mainImage(gl_FragColor, gl_FragCoord.xy);
	  gl_FragColor.a = 1.0; // Ensure the alpha is set to 1.0
	}
  `
});

// Add the shader to a full-screen quad and add it to the scene
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Video element
const video = document.createElement('video');
video.src = '../assets/EZWorksheet.mov';
video.loop = true; // Loop the video
video.autoplay = true;
video.playsInline = true;
video.addEventListener('canplay', function() {
  const texture = new THREE.VideoTexture(video);
   texture.minFilter = THREE.LinearFilter;
   texture.magFilter = THREE.LinearFilter;
   texture.format = THREE.RGBAFormat;
 
   // Set video texture to iChannel0 uniform
   uniforms.iChannel0.value = texture;
 
   // Play the video
   video.play();
 });
 
 // Animate function
 function animate() {
   requestAnimationFrame(animate);
 
   // Update uniforms
   uniforms.iTime.value += 0.02;
 
   // Check if video texture needs updating
   if (uniforms.iChannel0.value) {
	 uniforms.iChannel0.value.needsUpdate = true;
   }
 
   // Render the scene
   renderer.render(scene, camera);
 }
 
 animate();
 
 // Handle window resize
 window.addEventListener('resize', onWindowResize, false);
 
 function onWindowResize() {
   // Update camera
   camera.aspect = window.innerWidth / window.innerHeight;
   camera.updateProjectionMatrix();
 
   // Update renderer size
   renderer.setSize(window.innerWidth, window.innerHeight);
 
   // Update resolution uniform
   uniforms.iResolution.value.x = window.innerWidth;
   uniforms.iResolution.value.y = window.innerHeight;
 }