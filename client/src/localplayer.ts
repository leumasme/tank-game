import { Mesh, Group, Vector3 } from "three";
import { ControlKeys, keyStates } from "./keys";
import { Player } from "./player";
import { Meshable } from "./typeutils";

export class LocalPlayer extends Player {
    controls: ControlKeys;
    speed: number;
    constructor(mesh: Meshable, controls: ControlKeys) {
        mesh.scale.set(4, 4, 4);
        super(mesh);
        this.speed = 0.2 * 4;
        this.controls = controls;
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