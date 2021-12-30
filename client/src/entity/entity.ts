import * as T from 'three';
import {Meshable} from "../typeutils";
// TODO: Add support for multiple components/group meshes
export class Entity {

    mesh: T.Mesh;
    alive: boolean;
    scene: T.Scene;

    constructor(m: T.Mesh, scene: T.Scene) {
        this.mesh = m.clone();
        scene.add(this.mesh);
        this.alive = true;
        this.scene = scene;
    }

    setPosition(x?: number, y?: number, z?: number) {
        if (x !== undefined) this.mesh.position.x = x;
        if (y !== undefined) this.mesh.position.y = y;
        if (z !== undefined) this.mesh.position.z = z;
    }

    move(distance: number) {
        this.mesh.translateZ(distance);
    }

    rotate(angle: number) {
        this.mesh.rotateY(angle);
    }


    update(delta: number) {
    }

    kill() {
        this.alive = false;
        this.scene.remove(this.mesh);
    }
}