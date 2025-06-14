// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color("black");

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 5, 10);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 5);
scene.add(light);

// Ground plane
const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 5),
  new THREE.MeshStandardMaterial({ color: Math.random() * 0xffffff })
);
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

// Helper function to create cube
function createRandomCube() {
  const size = Math.random() * 1 + 0.5;
  const geometry = new THREE.BoxGeometry(size, size, size);
  const material = new THREE.MeshStandardMaterial({
    color: Math.random() * 0xffffff,
  });
  const cube = new THREE.Mesh(geometry, material);

  cube.position.set(
    (Math.random() - 0.5) * 10,
    size / 2,
    (Math.random() - 0.5) * 5
  );

  scene.add(cube);
}

// dat.GUI Setup
const gui = new dat.GUI();
const controls = {
  addCube: () => createRandomCube(),
};

gui.add(controls, "addCube").name("➕ Add Cube");

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
