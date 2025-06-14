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

// Lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 5);
scene.add(light);

// Ground plane
const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 10),
  new THREE.MeshStandardMaterial({ color: "gray" })
);
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

// Store created cubes
const cubes = [];

// Create random cube
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
  cubes.push(cube);
}

// Remove last cube
function removeLastCube() {
  const last = cubes.pop();
  if (last) {
    scene.remove(last);
  }
}

// Output all objects in the scene
function outputSceneObjects() {
  console.log("Scene children:", scene.children);
}

// dat.GUI controls
const gui = new dat.GUI();
const controls = {
  addCube: createRandomCube,
  removeLastCube: removeLastCube,
  logScene: () => outputSceneObjects(), // new action
};

gui.add(controls, "addCube").name("➕ Add Cube");
gui.add(controls, "removeLastCube").name("❌ Remove Last Cube");
gui.add(controls, "logScene").name("🧾 Log Scene Objects"); // new button

// Animate
function animate() {
  requestAnimationFrame(animate);

  // Rotate all cube meshes
  scene.traverse((object) => {
    if (
      object instanceof THREE.Mesh &&
      object.geometry instanceof THREE.BoxGeometry
    ) {
      object.rotation.y += 0.01;
      object.rotation.x += 0.005;
    }
  });

  renderer.render(scene, camera);
}

animate();
