import * as T from "three";
import { keyStates } from "./keys"
import { Player } from "./player";
import { loaded } from "./resource";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

window.addEventListener("resources-loaded", () => {
    // set up
    const scene = new T.Scene();
    const renderer = new T.WebGLRenderer();
    const environment    = new RoomEnvironment();
    const pmremGenerator = new T.PMREMGenerator( renderer );
    scene.background     = new T.Color( 0xbbbbbb );
    scene.environment    = pmremGenerator.fromScene( environment ).texture;
    const camera = new T.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    let mesh = new Player(loaded.tank).mesh;
    console.log(mesh, mesh.position, mesh.constructor)
    mesh.position.y = 2;
    scene.add(mesh);

    // fix mesh being black
    const light = new T.HemisphereLight( 0xffffbb, 0x080820, 1);
    scene.add(light);

    const floor = new T.Mesh(new T.BoxGeometry(5, 1, 5), new T.MeshBasicMaterial({ color: 0xffffff }));
    floor.position.y = -1;
    // scene.add(floor);

    camera.position.y = 4;
    camera.lookAt(mesh.position);
    let lastTime = 0;
    // frame renderer
    function render(time: number) {
        if (!lastTime) lastTime = time;
        const delta = time - lastTime;

        renderer.render(scene, camera);
        lastTime = time;
        if (keyStates.FORWARD) {
            mesh.position.z -= 0.001 * delta;
        }
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
