// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color("black");

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 1, 6); // Experiment with these values

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Helper function to create geometry mesh
function createMesh(geometry, color, position) {
  const material = new THREE.MeshBasicMaterial({ color, wireframe: true });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(...position);
  scene.add(mesh);
  return mesh;
}

// 1. Cube
const cube = createMesh(new THREE.BoxGeometry(), "green", [-4, 0, 0]);

// 2. Sphere
const sphere = createMesh(
  new THREE.SphereGeometry(0.8, 32, 32),
  "red",
  [-2, 0, 0]
);

// 3. Cone
const cone = createMesh(
  new THREE.ConeGeometry(0.7, 2, 32),
  "yellow",
  [0, 0, 0]
);

// 4. Torus
const torus = createMesh(
  new THREE.TorusGeometry(0.6, 0.2, 16, 100),
  "cyan",
  [2, 0, 0]
);

// 5. Cylinder
const cylinder = createMesh(
  new THREE.CylinderGeometry(0.5, 0.5, 2, 32),
  "orange",
  [4, 0, 0]
);

// Animate
function animate() {
  requestAnimationFrame(animate);

  // Rotate all geometries
  cube.rotation.y += 0.01;
  sphere.rotation.y += 0.01;
  cone.rotation.y += -0.01;
  torus.rotation.y += 0.01;
  cylinder.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();
