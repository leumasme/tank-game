import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export var loaded = {} as { [key: string]: GLTF };

export const objLoader = new GLTFLoader();
objLoader.load("assets/tank.gltf", (gltf) => {
    loaded.tank = gltf;
    window.dispatchEvent(new Event('resources-loaded'));
});
