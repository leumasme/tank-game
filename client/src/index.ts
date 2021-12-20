import * as T from "three";
import { playerControls } from "./keys"
import { loaded } from "./resource";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { LocalPlayer } from "./localplayer";
import { distanceToFitInView } from "./renderutils";

window.addEventListener("resources-loaded", () => {
    // Set up the scene
    const scene = new T.Scene();
    const renderer = new T.WebGLRenderer();

    const environment = new RoomEnvironment();
    const pmremGenerator = new T.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(environment).texture;
    pmremGenerator.dispose();

    scene.background = new T.Color(0xbbbbbb);
    const camera = new T.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    let player = new LocalPlayer(loaded.tank.scene, playerControls[0]);
    let mesh = player.mesh;
    scene.add(mesh);

    // Create ground plane
    const ground = new T.BoxGeometry(100, 0.1, 100);
    const groundMaterial = new T.MeshStandardMaterial({ color: 0x888888 });
    const groundMesh = new T.Mesh(ground, groundMaterial);
    groundMesh.position.y = -0.05;
    scene.add(groundMesh);

    // Add light to fix colors
    const light = new T.HemisphereLight(0xffffbb, 0x080820, 1);
    scene.add(light);

    // Place camera to get scene in view
    let distance = distanceToFitInView(camera.fov, 100);
    camera.position.y = distance + 3;
    camera.near = distance - 3;
    camera.far = distance + 10;
    camera.lookAt(mesh.position);

    // Render loop
    let lastTime = 0;
    function render(time: number) {
        if (!lastTime) lastTime = time;
        const delta = time - lastTime;

        renderer.render(scene, camera);
        lastTime = time;
        player.move(delta); // Process controls
        requestAnimationFrame(render);
    }

    // Handle window resize
    window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    window.requestAnimationFrame(render);
})
