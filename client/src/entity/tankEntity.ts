import {CollidableEntity} from "./collidableEntity";
import * as T from "three";
import {BulletEntity} from "./bulletEntity";

export class TankEntity extends CollidableEntity {
    bullets: BulletEntity[];

    constructor(scene: T.Scene) {
        const mesh = new T.Mesh(new T.BoxGeometry(1, 1, 2), new T.MeshBasicMaterial({
            color: 0x0000ff, wireframe: true
        }));

        super(mesh, scene);
        this.bullets = [];
        this.scene = scene;
    }


    shoot() {
        const bullet = new BulletEntity(this.mesh.rotation.y, this.mesh.position.x, this.mesh.position.z, this, this.scene);
        this.bullets.push(bullet);
    }


}