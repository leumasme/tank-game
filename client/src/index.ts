import * as T from "three";
import { playerControls } from "./keys";
import { loadAll } from "./resource";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { TankEntityPlayer } from "./entity/tankEntityPlayer";
import { TankEntity } from "./entity/tankEntity";
import { distanceToFitInView } from "./renderutils";

(async () => {
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

    let tanks: TankEntity[] = [];

    let player = new TankEntityPlayer(playerControls[0], scene, loaded.objects.tank.scene);
    tanks.push(player);

    let testPlayer = new TankEntityPlayer(playerControls[1], scene, loaded.objects.tank.scene);
    testPlayer.rotate(10);
    testPlayer.move(10);
    tanks.push(testPlayer);

    for (let i = 0; i < 30; i++) {
        const entity = new TankEntity(scene, loaded.objects.tank.scene);
        entity.setPosition(Math.random() * 100 - 50, undefined, Math.random() * 100 - 50);

        entity.rotate(Math.random() * 360);
        tanks.push(entity);
    }


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

    function updateBullets(delta: number) {
        for (const tank of tanks) {
            for (const bullet of tank.bullets) {
                bullet.update(delta)
                for (let target of tanks) {
                    if (bullet.shooter != target && bullet.collidesWith(target)) {
                        bullet.onCollision(target);
                    }
                }
            }
        }
    }

    // Render loop
    let lastTime = 0;
    function render(time: number) {
        if (!lastTime) lastTime = time;
        const delta = time - lastTime;

        lastTime = time;
        for (let tank of tanks) {
            tank.update(delta);
        }

        updateBullets(delta);

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