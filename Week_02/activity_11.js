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

// Light (optional for slight shading)
scene.add(new THREE.AmbientLight(0xffffff, 0.5));

// Snow particle variables
let snowParticles;
let snowPositions = [];

// Load snowflake texture
const loader = new THREE.TextureLoader();
loader.load("snowflake.png", function (texture) {
  simulateSnowfall(texture);
});

function simulateSnowfall(texture) {
  const count = 1000;
  const geometry = new THREE.BufferGeometry();

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const x = (Math.random() - 0.5) * 20;
    const y = Math.random() * 10 + 5;
    const z = (Math.random() - 0.5) * 20;
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
    snowPositions.push({ x, y, z });
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    size: 0.3,
    map: texture,
    transparent: true,
    alphaTest: 0.5,
    depthWrite: false,
  });

  snowParticles = new THREE.Points(geometry, material);
  scene.add(snowParticles);
}

// Animation
function animate() {
  requestAnimationFrame(animate);

  if (snowParticles) {
    const pos = snowParticles.geometry.attributes.position.array;
    for (let i = 0; i < snowPositions.length; i++) {
      snowPositions[i].y -= 0.02;
      if (snowPositions[i].y < 0) snowPositions[i].y = 10;

      pos[i * 3 + 1] = snowPositions[i].y;
    }
    snowParticles.geometry.attributes.position.needsUpdate = true;
  }

  renderer.render(scene, camera);
}
animate();
