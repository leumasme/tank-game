import {TankEntity} from "./tankEntity";
import {ControlKeys, keyStates} from "../keys";
import {Controllable} from "./controllable";
import * as T from "three";
// TODO: Use 3d model
// TODO: Add barrel as mesh
// TODO: Add base as mesh
export class TankEntityPlayer extends TankEntity implements Controllable {
    controls: ControlKeys;
    speed: number = 0.8;
    rotationStep: number = 0.002;
    moveStep: number = 0.01;

    constructor(controls: ControlKeys, scene: T.Scene) {
        super(scene);
        this.controls = controls;
    }

    control(delta: number): void {
        if (keyStates[this.controls.FORWARD]) {
            this.move(-this.speed * delta * this.moveStep);
        }
        if (keyStates[this.controls.BACKWARD]) {
            this.move(this.speed * delta * this.moveStep);
        }
        if (keyStates[this.controls.LEFT]) {
            this.rotate(this.rotationStep * delta);
        }
        if (keyStates[this.controls.RIGHT]) {
            this.rotate(-this.rotationStep * delta);
        }

        if (keyStates[this.controls.SHOOT]) {
            this.shoot();
        }
    }
}