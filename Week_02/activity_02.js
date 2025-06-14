// Scene setup
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

// SphereGeometry (edit parameters below to observe changes)
const geometry = new THREE.SphereGeometry(
  2, // radius
  32, // widthSegments
  16, // heightSegments
  0, // phiStart
  Math.PI, // phiLength
  0, // thetaStart
  Math.PI // thetaLength
);

// Material and Mesh
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Animation
function animate() {
  requestAnimationFrame(animate);
  sphere.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
