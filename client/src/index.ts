// set up
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// create a green cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

let lastTime = 0;
// frame renderer
function render(time: number) {
    if (!lastTime) lastTime = time;
    const delta = time - lastTime;

    cube.rotation.x += 0.001 * delta;
    cube.rotation.y += 0.001 * delta;

    requestAnimationFrame(render);
    renderer.render(scene, camera);
    lastTime = time;
}

// handle window resize
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

window.requestAnimationFrame(render);