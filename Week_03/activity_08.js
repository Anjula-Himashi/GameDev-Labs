import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Scene, camera, renderer setup
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

// Skybox function
function createSkybox(scene) {
  const loader = new THREE.TextureLoader();

  // Load 6 textures for each face of the cube
  const materials = [
    new THREE.MeshBasicMaterial({
      map: loader.load(
        "https://threejs.org/examples/textures/cube/Bridge2/posx.jpg"
      ),
      side: THREE.BackSide,
    }), // px
    new THREE.MeshBasicMaterial({
      map: loader.load(
        "https://threejs.org/examples/textures/cube/Bridge2/negx.jpg"
      ),
      side: THREE.BackSide,
    }), // nx
    new THREE.MeshBasicMaterial({
      map: loader.load(
        "https://threejs.org/examples/textures/cube/Bridge2/posy.jpg"
      ),
      side: THREE.BackSide,
    }), // py
    new THREE.MeshBasicMaterial({
      map: loader.load(
        "https://threejs.org/examples/textures/cube/Bridge2/negy.jpg"
      ),
      side: THREE.BackSide,
    }), // ny
    new THREE.MeshBasicMaterial({
      map: loader.load(
        "https://threejs.org/examples/textures/cube/Bridge2/posz.jpg"
      ),
      side: THREE.BackSide,
    }), // pz
    new THREE.MeshBasicMaterial({
      map: loader.load(
        "https://threejs.org/examples/textures/cube/Bridge2/negz.jpg"
      ),
      side: THREE.BackSide,
    }), // nz
  ];

  // Create large box geometry
  const geometry = new THREE.BoxGeometry(10, 10, 10);

  // Create skybox mesh and add to scene
  const skybox = new THREE.Mesh(geometry, materials);
  scene.add(skybox);
}

// Create the skybox
createSkybox(scene);

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

function animate() {
  requestAnimationFrame(animate);

  controls.update(); // update orbit controls for smooth interaction
  renderer.render(scene, camera);
}

animate();
