import * as THREE from "three";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting is required for bump maps to show
const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(2, 2, 5);
scene.add(light);

function addBumpMappedCube(scene) {
  // 1. Create cube geometry
  const geometry = new THREE.BoxGeometry(1, 1, 1);

  // 2. Load texture and bump map
  const loader = new THREE.TextureLoader();
  const texture = loader.load(
    "https://threejs.org/examples/textures/brick_diffuse.jpg"
  );
  const bumpMap = loader.load(
    "https://threejs.org/examples/textures/brick_bump.jpg"
  );
  

  // 3. Create material with both texture and bump map
  const material = new THREE.MeshStandardMaterial({
    map: texture,
    bumpMap: bumpMap,
    bumpScale: 0.1, // Controls bump depth
  });

  // 4. Create mesh and add to scene
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  return cube; // optional, for animation or further access
}

// Add cube with texture and bump map
const cube = addBumpMappedCube(scene);

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
