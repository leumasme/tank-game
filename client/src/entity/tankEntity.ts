import { CollidableEntity } from "./collidableEntity";
import * as T from "three";
import { BulletEntity } from "./bulletEntity";
import { Meshable } from "../typeutils";
import { Vector3 } from "three";

export class TankEntity extends CollidableEntity {
    bullets: BulletEntity[];

    constructor(scene: T.Scene, obj: Meshable) {
        obj = obj.clone();
        super(obj, scene);
        this.bullets = [];
        this.mesh.scale.set(4, 4, 4);
    }

    // TODO: find out why turret is not registering collisions
    shoot() {
        const bullet = new BulletEntity(this.mesh.rotation, this.mesh.position.x, this.mesh.position.z, this.mesh.position.y + 10, this, this.scene);
        let barrel = this.mesh.children[0].children
            .find(c => c.name === "Hidden")!.children
            .find(c => c.name == "hitbox_barrel")! as T.Mesh;
            
        // TODO: Fix Z and Y translation of the projectile to the tip of the barrel
        let box = this.obb[0]
        console.log(box, -box.center.z, -box.getSize(new Vector3()).z);
        bullet.mesh.translateZ(-box.center.z * 4 -box.getSize(new Vector3()).z * 4);

        this.bullets.push(bullet);
    }

    update(delta: number) {
        // TODO: AI behavior?
    }
}