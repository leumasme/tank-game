import { Mesh, Group, Vector3, BoxHelper } from "three";
import { ControlKeys, keyStates } from "./keys";
import { Player } from "./player";
import { Meshable } from "./typeutils";
import {OBB} from "three/examples/jsm/math/OBB";
import * as T from "three";
export class LocalPlayer extends Player {
    controls: ControlKeys;
    speed: number;
    debugBox: BoxHelper
    obb: OBB;
    obb2: OBB;
    constructor(mesh: Meshable, controls: ControlKeys) {
        // mesh = mesh.clone()
        let geometry = new T.BoxGeometry(1, 1, 2);
        geometry.computeBoundingBox();
        mesh = new T.Mesh(geometry, new T.MeshBasicMaterial({ color: 0x0000ff , wireframe: true}));
        mesh.scale.set(4, 4, 4);
        super(mesh);
        this.speed = 0.2 * 4;
        this.controls = controls;
        this.debugBox = new BoxHelper(this.mesh);

        this.obb = new OBB()
        this.obb2 = new OBB().fromBox3(geometry.boundingBox as T.Box3);

    }

    // forward / backward to move, left / right to rotate
    move(delta: number) {
        if (keyStates[this.controls.FORWARD]) {
            this.mesh.translateZ(-this.speed * delta * 0.01);
        }
        if (keyStates[this.controls.BACKWARD]) {
            this.mesh.translateZ(this.speed * delta * 0.01);
        }
        if (keyStates[this.controls.LEFT]) {
            this.mesh.rotateY(0.002 * delta);
        }
        if (keyStates[this.controls.RIGHT]) {
            this.mesh.rotateY(-0.002 * delta);

        }
        this.checkCollisions();
        // TODO
    }
    checkCollisions() {
        // TODO
        this.mesh.traverse(child => {
            if ( i-- > 1) {
                // console.log(child.name)
                console.log(child.name)
            }
        })
    }
    
}
let i = 1000;