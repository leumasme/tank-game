import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { unzipSync } from 'fflate';

const objLoader = new GLTFLoader();
function loadGLTF(data: ArrayBuffer): Promise<GLTF> {
    return new Promise((resolve, reject) => {
        objLoader.parse(data, "", resolve, reject);
    });
}

export async function loadAll() {
    let loaded = { objects: {} } as { objects: { [key: string]: GLTF } };
    let buffer = await (await fetch("assets.zip")).arrayBuffer();

    console.time("unzip");
    let unzipped = unzipSync(new Uint8Array(buffer));
    console.timeEnd("unzip");

    // Process all files in parallel
    await Promise.all(Object.entries(unzipped).map(async ([file, data]) => {
        if (file.endsWith("gltf")) {
            // name without extension
            let name = file.split(".").slice(0, -1).join(".");
            loaded.objects[name] = await loadGLTF(data);
        } else {
            // TODO: load other resource types
            console.log("Skipping", file);
        }
    }));

    return loaded;
}
