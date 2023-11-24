//Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// To allow for the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

//Create a Three.JS Scene
const scene = new THREE.Scene();
//create a new camera with positions and angles
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//Keep track of the mouse position, so we can make the eye move
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

//Keep the 3D object on a global variable so we can access it later
let object;

//OrbitControls allow the camera to move around the scene
let controls;

//Set which object to render
let objToRender = 'cdblue';

//Instantiate a loader for the .gltf file
const loader = new GLTFLoader();

// Load the file
loader.load(
  `models/${objToRender}/scene.gltf`,
  function (gltf) {
    // If the file is loaded, add it to the scene
    object = gltf.scene;
    object.position.set(0, 0, 0); // Adjust the position of the object
    object.rotation.x = Math.random() * Math.PI * 2; // Random value between 0 and 2*pi
    object.rotation.y = Math.random() * Math.PI * 2;
    object.rotation.z = Math.random() * Math.PI * 2;
    scene.add(object);
  },
  function (xhr) {
    // While it is loading, log the progress
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    // If there is an error, log it
    console.error(error);
  }
);

//Instantiate a new renderer and set its size
const renderer = new THREE.WebGLRenderer({ alpha: true }); //Alpha: true allows for the transparent background
renderer.setSize(window.innerWidth, window.innerHeight);

//Add the renderer to the DOM
document.getElementById("container3Dblue").appendChild(renderer.domElement);

//Set how far the camera will be from the 3D model
camera.position.z = objToRender === "cdblue" ? 25 : 200;

//Add lights to the scene, so we can actually see the 3D model
const topLight = new THREE.DirectionalLight(0x0000ff, 5); // (color, intensity)
topLight.position.set(500, 500, 500); // top-left-ish
scene.add(topLight)

const bottomLight = new THREE.DirectionalLight(0x0000ff, 8); // (color, intensity)
bottomLight.position.set(0, -500, 0); // bottom
scene.add(bottomLight);

const ambientLight = new THREE.AmbientLight(0x333333, objToRender === "cdblue" ? 5 : 1);
scene.add(ambientLight);

// This adds controls to the camera, so we can rotate / zoom it with the mouse
if (objToRender === "cdblue") {
  controls = new OrbitControls(camera, renderer.domElement);
  controls.autoRotate = false; // Disable auto rotation
  controls.enableZoom = false; // Disable zoom
  controls.enablePan = false; // Disable pan
}

// Render the scene
function animate() {
  requestAnimationFrame(animate);
  // Here we could add some code to update the scene, adding some automatic movement
  renderer.render(scene, camera);
}

// Add mouse position listener
document.onmousemove = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
}

// Double-click listener for the specific 3D object container
const container3Dblue = document.getElementById('container3Dblue');
container3Dblue.ondblclick = () => {
  window.location.href = 'tracklist_blue.html';
};

animate();