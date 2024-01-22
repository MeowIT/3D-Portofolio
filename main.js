import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

//Gradient

const canvas = document.createElement("canvas");

const context = canvas.getContext("2d");

canvas.width = 400; // Adjust the size of the canvas as needed
canvas.height = 2000;

const gradient = context.createLinearGradient(0, 0, canvas.width, 0);
gradient.addColorStop(0, "#000000");
gradient.addColorStop(0.9, "#00000c");
gradient.addColorStop(0.1, "#040414");
gradient.addColorStop(0.2, "#07091a");
gradient.addColorStop(0.4, "#0a1126");
gradient.addColorStop(0.5, "#0a132a");
gradient.addColorStop(0.6, "#08152E");
gradient.addColorStop(0.2, "#07091a");
gradient.addColorStop(0.1, "#040414");
gradient.addColorStop(0.9, "#00000c");
gradient.addColorStop(1, "#000000");

context.fillStyle = gradient;
context.fillRect(0, 0, canvas.width, canvas.height);

const texture = new THREE.CanvasTexture(canvas);
texture.mapping = THREE.UVMapping;
scene.background = texture;

// Renderer setup
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI / 2;

// Helper functions
function addStar() {
  const geometry = new THREE.SphereGeometry(0.1, 24, 24);
  const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color(`hsl(${Math.random() * 360}, 100%, 75%)`),
  });
  const star = new THREE.Mesh(geometry, material);
  const distance = THREE.MathUtils.randFloat(50, 200);
  const angle1 = Math.random() * Math.PI * 2;
  const angle2 = Math.random() * Math.PI * 2;
  const x = distance * Math.cos(angle1) * Math.sin(angle2);
  const y = distance * Math.sin(angle1) * Math.sin(angle2);
  const z = distance * Math.cos(angle2);
  star.position.set(x, y, z);
  scene.add(star);
}

// Populate stars
Array(800).fill().forEach(addStar);

// Lights
const pointLight = new THREE.PointLight(0xffffff);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
scene.add(directionalLight);

// Cristina;

const CristinaTexture = new THREE.TextureLoader().load("Cristina.jpeg");

const Cristina = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: CristinaTexture })
);
scene.add(Cristina);

// Moon

const moonTexture = new THREE.TextureLoader().load("moon.jpg");
const normalTexture = new THREE.TextureLoader().load("normal.jpg");
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);
scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

// Torus
const torusGeometry = new THREE.TorusGeometry(10, 3, 16, 100);
const torusMaterial = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
scene.add(torus);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  Cristina.rotation.y += 0.01;
  Cristina.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
// Animation/render loop
const animate = () => {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;

  controls.update();

  renderer.render(scene, camera);
};

animate();
