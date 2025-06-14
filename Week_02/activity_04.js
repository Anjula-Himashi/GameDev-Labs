// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("black");

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({
  color: "green",
  wireframe: false,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Animation
function animate() {
  requestAnimationFrame(animate);

  // Add rotation
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();
