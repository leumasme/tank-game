import * as T from 'three';
import {Meshable} from "../typeutils";
// TODO: Add support for multiple components/group meshes
export abstract class Entity {
    mesh: Meshable;
    alive = true;
    scene: T.Scene;

    constructor(m: Meshable, scene: T.Scene) {
        this.mesh = m.clone();
        scene.add(this.mesh);
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

    abstract update(delta: number): void;

    kill() {
        this.alive = false;
        this.mesh.visible = false;
        this.scene.remove(this.mesh);
    }
}