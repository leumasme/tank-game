import * as T from "three";
import {playerControls} from "./keys";
import {loadAll} from "./resource";
import {RoomEnvironment} from "three/examples/jsm/environments/RoomEnvironment.js";
import {TankEntityPlayer} from "./entity/tankEntityPlayer";
import {TankEntity} from "./entity/tankEntity";
import {Entity} from "./entity/entity";
import {distanceToFitInView} from "./renderutils";

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

    let entities: Entity[] = [];

    let player = new TankEntityPlayer(playerControls[0], scene, loaded.objects.tank.scene);
    entities.push(player);

    let testPlayer = new TankEntityPlayer(playerControls[1], scene, loaded.objects.tank.scene);
    testPlayer.rotate(10);
    testPlayer.move(10);
    entities.push(testPlayer);

    for (let i = 0; i < 30; i++) {
        const entity = new TankEntity(scene, loaded.objects.tank.scene);
        entity.setPosition(Math.random() * 100 - 50, undefined, Math.random() * 100 - 50);

        entity.rotate(Math.random() * 360);
        entities.push(entity);
        // entity.shoot();
    }


    // Create ground plane
    const ground = new T.BoxGeometry(100, 0.1, 100);
    const groundMaterial = new T.MeshStandardMaterial({color: 0x00ff00});
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

    function checkCollisions() {

        for (const entityKey1 in entities) {
            const entity1 = entities[entityKey1];

            // For entity idk
            // for (const entityKey2 in entities) {
            //     const entity2 = entities[entityKey2];
            //     if (entity1 !== entity2 && entity1 instanceof CollidableEntity && entity2 instanceof CollidableEntity) {
            //         if (entity1.collidesWith(entity2)) {
            //             // entity1.onCollision(entity2);
            //             // break;
            //         } else {
            //             // entity1.endCollision(entity2);
            //         }
            //     }
            // }
            // For bullets
            if (entity1 instanceof TankEntity) {
                for (const bulletKey in entity1.bullets) {
                    const bullet = entity1.bullets[bulletKey];
                    for (const entityKey2 in entities) {
                        const entity2 = entities[entityKey2];
                        if (entity2 instanceof TankEntityPlayer) {
                            continue; // Don't collide with player for now
                        }
                        if (entity2.alive && entity2 instanceof TankEntity && entity2 !== entity1 && bullet.collidesWith(entity2)) {
                            bullet.onCollision(entity2);
                            entities.forEach(entity => {
                                if (entity instanceof TankEntity) {
                                }
                            });
                        }
                    }
                }
            }
        }
    }

    function moveProjectiles(delta: number) {
        for (const entityKey in entities) {
            const entity = entities[entityKey];
            if (entity instanceof TankEntity) {
                entity.bullets.forEach(bullet => {
                    bullet.move(delta);
                });
            }
        }
    }

    let counter = 1;

    function render(time: number) {
        if (!lastTime) lastTime = time;
        const delta = time - lastTime;

        lastTime = time;
        entities.forEach(p => {
            if (p instanceof TankEntity) {
                p.update(delta);
            }
        });

        // Let random entities shoot
        counter++;
        if (counter % 10 === 0) {
            const _list = entities.filter(value => value instanceof TankEntity && !(value instanceof TankEntityPlayer) && value.alive);
            const entity = _list[Math.floor(Math.random() * _list.length)];
            if (entity instanceof TankEntity && _list.length > 3) {
                entity.rotate(0.1)
                entity.shoot();
            }
        }
        moveProjectiles(delta);
        checkCollisions();


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