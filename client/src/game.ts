import * as T from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment";
import { TankEntity } from "./entity/tankEntity";
import { TankEntityPlayer } from "./entity/tankEntityPlayer";
import { playerControls } from "./keys";
import { distanceToFitInView } from "./renderutils";
import { LoadedResources } from "./resource";

export const Game = {
    scene: new T.Scene(),
    renderer: new T.WebGLRenderer({antialias: true}),
    camera: new T.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000),
    tanks: [] as TankEntity[],
    resources: null as LoadedResources | null,
};

let lastTime = 0;
export function render(time: number) {
    if (!lastTime) lastTime = time;
    const delta = time - lastTime;

    lastTime = time;
    for (let tank of Game.tanks) {
        tank.update(delta);
    }

    updateBullets(delta);

    Game.renderer.render(Game.scene, Game.camera);
    requestAnimationFrame(render);
}

export function setup(loaded: LoadedResources) {
    // Setup room envoirement
    const environment = new RoomEnvironment();
    const pmremGenerator = new T.PMREMGenerator(Game.renderer);
    Game.scene.environment = pmremGenerator.fromScene(environment).texture;
    pmremGenerator.dispose();

    Game.scene.background = new T.Color(0xbbbbbb);

    // Setup Renderer
    Game.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(Game.renderer.domElement);

    // Create player tanks
    let player = new TankEntityPlayer(playerControls[0], Game.scene, loaded.objects.tank.scene);
    Game.tanks.push(player);

    let testPlayer = new TankEntityPlayer(playerControls[1], Game.scene, loaded.objects.tank.scene);
    testPlayer.rotate(10);
    testPlayer.move(10);
    Game.tanks.push(testPlayer);

    // Create bot tanks
    for (let i = 0; i < 30; i++) {
        const entity = new TankEntity(Game.scene, loaded.objects.tank.scene);
        entity.setPosition(Math.random() * 100 - 50, undefined, Math.random() * 100 - 50);

        entity.rotate(Math.random() * 360);
        Game.tanks.push(entity);
    }

    // Create ground plane
    const ground = new T.BoxGeometry(100, 0.1, 100);
    const groundMaterial = new T.MeshStandardMaterial({ color: 0x00ff00 });
    const groundMesh = new T.Mesh(ground, groundMaterial);
    groundMesh.position.y = -0.05;
    Game.scene.add(groundMesh);

    // Add light to fix colors
    const light = new T.HemisphereLight(0xffffbb, 0x080820, 1);
    Game.scene.add(light);

    // Place camera to get scene in view
    let distance = distanceToFitInView(Game.camera.fov, 100);
    Game.camera.position.y = distance + 3;
    Game.camera.near = distance - 3;
    Game.camera.far = distance + 10;
    Game.camera.lookAt(player.mesh.position);

    // Handle window resize
    window.addEventListener("resize", () => {
        Game.camera.aspect = window.innerWidth / window.innerHeight;
        Game.camera.updateProjectionMatrix();
        Game.renderer.setSize(window.innerWidth, window.innerHeight);
    });

    window.requestAnimationFrame(render);
};

function updateBullets(delta: number) {
    for (const tank of Game.tanks) {
        for (const bullet of tank.bullets) {
            bullet.update(delta)
            for (let target of Game.tanks) {
                if (bullet.shooter != target && bullet.collidesWith(target)) {
                    bullet.onCollision(target);
                }
            }
        }
    }
}