import { TankEntity } from "./tankEntity";
import { ControlKeys, keyStates } from "../keys";
import * as T from "three";
import { Meshable } from "../typeutils";

export class TankEntityPlayer extends TankEntity {
    controls: ControlKeys;
    speed: number = 0.8;
    rotationStep: number = 0.002;
    moveStep: number = 0.01;

    constructor(controls: ControlKeys, scene: T.Scene, texture: Meshable) {
        super(scene, texture);
        this.controls = controls;
    }

    shotDelay = 0;
    update(delta: number): void {
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

        this.shotDelay -= delta;
        if (keyStates[this.controls.SHOOT] && this.shotDelay <= 0) {
            this.shoot();
            this.shotDelay = 1000;
        }
        super.update(delta);
    }
}