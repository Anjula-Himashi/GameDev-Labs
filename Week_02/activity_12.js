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
scene.add(new THREE.AmbientLight(0xffffff, 1));

// Store particles
const particles = [];

// Function to create a particle
function createParticle() {
  const size = 0.2;
  const geometry = new THREE.SphereGeometry(size, 8, 8);
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff * Math.random(),
  });
  const particle = new THREE.Mesh(geometry, material);

  particle.position.set(
    (Math.random() - 0.5) * 10,
    Math.random() * 5 + 1,
    (Math.random() - 0.5) * 10
  );

  particles.push(particle);
  scene.add(particle);
}

// Function to remove the last particle
function removeParticle() {
  const last = particles.pop();
  if (last) {
    scene.remove(last);
  }
}

// GUI Controls
const gui = new dat.GUI();
const controls = {
  addParticle: () => createParticle(),
  removeParticle: () => removeParticle(),
};

gui.add(controls, "addParticle").name("➕ Add Particle");
gui.add(controls, "removeParticle").name("❌ Remove Particle");

// Animate
function animate() {
  requestAnimationFrame(animate);

  // Optional animation (e.g., bouncing or rotating particles)
  for (let p of particles) {
    p.rotation.y += 0.01;
  }

  renderer.render(scene, camera);
}
animate();
