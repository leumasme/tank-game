import { Vector3 } from "three";
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
            let vec = new Vector3()
            this.mesh.getWorldDirection(vec);
            vec.setLength(this.speed / 100 * delta)
            this.mesh.position.sub(vec);
        }
        if (keyStates[this.controls.BACKWARD]) {
            let vec = new Vector3()
            this.mesh.getWorldDirection(vec);
            vec.setLength(this.speed / 100 * delta)
            this.mesh.position.add(vec);
        }
        if (keyStates[this.controls.LEFT]) {
            this.mesh.rotation.y += 0.002 * delta;
        }
        if (keyStates[this.controls.RIGHT]) {
            this.mesh.rotation.y -= 0.002 * delta;
        }
    }
    shoot() {
        // TODO
    }
}