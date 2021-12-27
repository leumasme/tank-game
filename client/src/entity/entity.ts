import * as T from 'three';
import {BoxHelper} from 'three';

// TODO: Add support for multiple components/group meshes
export class Entity {

    mesh: T.Mesh;
    debugBox: BoxHelper;
    alive: boolean;
    scene: T.Scene;

    constructor(m: T.Mesh, scene: T.Scene) {
        this.mesh = m.clone();
        this.debugBox = new BoxHelper(this.mesh, 0xffff00);
        this.debugBox.visible = false;
        scene.add(this.mesh);
        this.alive = true;
        this.scene = scene;
    }

    setPosition(x?: number, y?: number, z?: number) {
        if (x !== undefined) this.mesh.position.x = x;
        if (y !== undefined) this.mesh.position.y = y;
        if (z !== undefined) this.mesh.position.z = z;
        this.update();
    }

    move(distance: number) {
        this.mesh.translateZ(distance);
        this.update();
    }

    rotate(angle: number) {
        this.mesh.rotateY(angle);
        this.update();
    }

    change(x?: number, y?: number, z?: number) {
        this.mesh.position.x += x || 0;
        this.mesh.position.y += y || 0;
        this.mesh.position.z += z || 0;
        this.update();
    }

    update() {
        this.debugBox.update();
    }

    kill() {
        this.alive = false;
        this.mesh.visible = false;
        this.debugBox.visible = false;
        this.scene.remove(this.mesh);
    }
}