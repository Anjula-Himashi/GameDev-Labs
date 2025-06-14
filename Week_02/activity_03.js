// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color("black");

// Camera
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(-10, 7, 6);
camera.lookAt(0, 0, 0);

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; // ✅ Enable shadows
document.body.appendChild(renderer.domElement);

// Helper function to create geometry mesh
function createMesh(geometry, color, position, cast = true, receive = false) {
  const material = new THREE.MeshStandardMaterial({ color });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(...position);
  mesh.castShadow = cast;
  mesh.receiveShadow = receive;
  scene.add(mesh);
  return mesh;
}

// 1. Plane (receive shadow only)
const plane = createMesh(
  new THREE.PlaneGeometry(14, 5),
  "gray",
  [0, 0, 0],
  false,
  true
);
plane.rotation.x = -Math.PI / 2; // Rotate 90° to lie flat

// 2. Box (Cube - cast shadow)
const cube = createMesh(
  new THREE.BoxGeometry(1.5, 1.5, 1.5),
  "green",
  [-5, 0.75, 0.75]
);

// 3. Sphere (cast shadow)
const sphere = createMesh(
  new THREE.SphereGeometry(0.9, 32, 32),
  "red",
  [2, 0.9, 0.75]
);

// Ambient Light – soft global light (no shadow)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Directional Light – like sunlight (cast shadow)
const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
directionalLight.position.set(-5, 10, -5);
directionalLight.castShadow = true; // ✅ Enable shadow casting
scene.add(directionalLight);

// Optional: Light helper
// const lightHelper = new THREE.DirectionalLightHelper(directionalLight);
// scene.add(lightHelper);

// Animate function
function animate() {
  requestAnimationFrame(animate);

  // Optional rotation
  cube.rotation.y += 0.01;
  sphere.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();
