import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Basic scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 1.5, 5);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(3, 5, 5);
scene.add(light);

// Orbit controls
const controls = new OrbitControls(camera, renderer.domElement);

// Load and display a GLTF model
const loader = new GLTFLoader();
loader.load(
  "https://threejs.org/examples/models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf", // URL to model
  (gltf) => {
    const model = gltf.scene;

    // Transform the model
    model.scale.set(2, 2, 2); // make it bigger
    model.position.set(0, 0, 0); // move it to center
    model.rotation.y = Math.PI; // rotate 180 degrees if needed

    scene.add(model);
  },
  undefined,
  (error) => {
    console.error("An error occurred while loading the GLTF model:", error);
  }
);

// Render loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
