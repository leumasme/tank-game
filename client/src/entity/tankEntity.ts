import {CollidableEntity} from "./collidableEntity";
import * as T from "three";
import {BulletEntity} from "./bulletEntity";
import {Meshable} from "../typeutils";

export class TankEntity extends CollidableEntity {
    bullets: BulletEntity[];

    constructor(scene: T.Scene, obj: Meshable) {

        obj = obj.clone();


        super(obj, scene);


        this.bullets = [];
        this.mesh.scale.set(4, 5, 4); // Larger y/height to make it easier for the bullets to hit
    }


    shoot() {
        const bullet = new BulletEntity(this.mesh.rotation.y, this.mesh.position.x, this.mesh.position.z, this.mesh.position.y +1, this, this.scene);
        bullet.mesh.translateZ(-4);
        this.bullets.push(bullet);
    }


}