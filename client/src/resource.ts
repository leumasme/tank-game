import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export var loaded = {} as any;

export const objLoader = new GLTFLoader();
objLoader.load("assets/tank.gltf", (gltf) => {
    loaded.tank = gltf.scene;
    loaded.tank.traverse((child: any) => {
        // if child is mesh and doesnt have a normal, compute normals
        if (child.isMesh && !child.geometry.attributes.normal) {
            console.log(child);
            child.geometry.computeVertexNormals();
            child.material.metalness = 0;
        }
    });
    window.dispatchEvent(new Event('resources-loaded'));
});
