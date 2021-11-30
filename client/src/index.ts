import * as T from "three";
import { playerControls } from "./keys"
import { loaded } from "./resource";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { LocalPlayer } from "./localplayer";
import { distanceToFitInView } from "./renderutils";

window.addEventListener("resources-loaded", () => {
    // set up
    const scene = new T.Scene();
    const renderer = new T.WebGLRenderer();
    const environment = new RoomEnvironment();
    const pmremGenerator = new T.PMREMGenerator(renderer);
    scene.background = new T.Color(0xbbbbbb);
    scene.environment = pmremGenerator.fromScene(environment).texture;
    const camera = new T.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    let player = new LocalPlayer(loaded.tank.scene, playerControls[0]);
    let mesh = player.mesh;
    scene.add(mesh);

    // create flat ground
    const ground = new T.BoxGeometry(100, 0.1, 100);
    const groundMaterial = new T.MeshStandardMaterial({ color: 0x888888 });
    const groundMesh = new T.Mesh(ground, groundMaterial);
    groundMesh.position.y = -0.05;
    scene.add(groundMesh);

    // fix mesh being black
    const light = new T.HemisphereLight(0xffffbb, 0x080820, 1);
    scene.add(light);

    let distance = distanceToFitInView(camera.fov, 100);
    camera.position.y = distance + 3;
    camera.near = distance - 3;
    camera.far = distance + 10;
    camera.lookAt(mesh.position);

    // frame renderer
    let lastTime = 0;
    function render(time: number) {
        if (!lastTime) lastTime = time;
        const delta = time - lastTime;

        renderer.render(scene, camera);
        lastTime = time;
        player.move(delta);
        requestAnimationFrame(render);
    }

    // handle window resize
    window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    window.requestAnimationFrame(render);
})
