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
camera.position.set(0, 5, 10);
camera.lookAt(0, 0, 0);

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// //show axes in the screen
// var axes = new THREE.AxisHelper(20);
// scene.add(axes);

// Light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 5);
scene.add(light);

// Ground Plane
const planeGeometry = new THREE.PlaneGeometry(10, 5);
const planeMaterial = new THREE.MeshStandardMaterial({ color: "green" });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

// Sphere
const sphereGeometry = new THREE.SphereGeometry(1, 64, 64);
const sphereMaterial = new THREE.MeshStandardMaterial({ color: "red" });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(0, 1, 0);
scene.add(sphere);

// Bounce variables
let clock = new THREE.Clock();

// Animate
function animate() {
  requestAnimationFrame(animate);

  let time = clock.getElapsedTime();
  sphere.position.y = Math.abs(Math.sin(time * 2)) + 0.5; // Bounce effect

  renderer.render(scene, camera);
}

animate();
