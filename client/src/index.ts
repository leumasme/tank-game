import * as T from "three";
import { playerControls } from "./keys"
import { loadAll } from "./resource";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { LocalPlayer } from "./localplayer";
import { distanceToFitInView } from "./renderutils";
import {Player} from "./player";

(async()=>{
    const loaded = await loadAll();

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

    let players: LocalPlayer[] = [];

    let player = new LocalPlayer(loaded.objects.tank.scene, playerControls[0]);
    players.push(player);

    let testPlayer = new LocalPlayer(loaded.objects.tank.scene, playerControls[1]);
    players.push(testPlayer);
    testPlayer.mesh.position.set(0, 0, -10);


    players.forEach(p => {
        scene.add(p.mesh);
        scene.add(p.debugBox);
    });


    // Create ground plane
    const ground = new T.BoxGeometry(100, 0.1, 100);
    const groundMaterial = new T.MeshStandardMaterial({ color: 0x00ff00 });
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
    camera.lookAt(player.mesh.position);

    // Render loop
    let lastTime = 0;
    function render(time: number) {
        if (!lastTime) lastTime = time;
        const delta = time - lastTime;

        lastTime = time;
        player.move(delta); // Process controls
        testPlayer.move(delta); // Process controls

        players.forEach(p => {
            p.move(delta);
            p.debugBox.update()
        });

        // players[1].mesh.lookAt(players[0].mesh.position);


        players[0].obb.copy(players[0].obb2);
        players[1].obb.copy(players[1].obb2);
        players[0].obb.applyMatrix4(players[0].mesh.matrixWorld);
        players[1].obb.applyMatrix4(players[1].mesh.matrixWorld);

        if (players[0].obb.intersectsOBB(players[1].obb, Number.EPSILON)){
            players[0].mesh.material.color.set(0xff0000);
        } else {
            players[0].mesh.material.color.set(0x00ff00);
        }

        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

    
    // Handle window resize
    window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    window.requestAnimationFrame(render);
})();