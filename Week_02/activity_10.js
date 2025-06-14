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
camera.lookAt(0, 2, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lights
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 5);
scene.add(light);

const ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);

// Ground (optional)
const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({ color: "gray" })
);
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

// Particle storage
const particles = [];

function createBasicParticles(count = 200) {
  for (let i = 0; i < count; i++) {
    const size = 0.1;
    const geometry = new THREE.BoxGeometry(size, size, size);
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff * Math.random(),
    });
    const particle = new THREE.Mesh(geometry, material);

    particle.position.set(
      (Math.random() - 0.5) * 10,
      Math.random() * 5 + 5,
      (Math.random() - 0.5) * 10
    );

    particles.push(particle);
    scene.add(particle);
  }
}

createBasicParticles();

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Fall logic
  for (let p of particles) {
    p.position.y -= 0.02;
    if (p.position.y < 0) {
      p.position.y = 5 + Math.random(); // Reset to top
    }
  }

  renderer.render(scene, camera);
}

animate();
