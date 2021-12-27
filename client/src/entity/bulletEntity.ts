import {CollidableEntity} from "./collidableEntity";
import {TankEntity} from "./tankEntity";
import * as T from "three";

export class BulletEntity extends CollidableEntity {

    shooter: TankEntity;
    speed: number;
    moveStep: number;

    constructor(angle: number, x: number, z: number, shooter: TankEntity, scene: T.Scene) {

        let geometry = new T.SphereGeometry(0.3, 4, 4);
        let material = new T.MeshBasicMaterial({color: 0x000000});
        let mesh = new T.Mesh(geometry, material);
        super(mesh, scene);

        this.shooter = shooter;
        this.mesh.position.set(x, 0, z);
        this.mesh.rotation.copy(shooter.mesh.rotation);
        this.moveStep = 0.01;
        this.speed = 1;
    }

    onCollision(collidable: CollidableEntity) {
        this.kill();
        collidable.kill();

    }

    move(delta: number) {
        if (this.mesh.position.distanceTo(this.scene.position) > 200) {
            this.kill();
        }
        super.move(-this.speed * delta * this.moveStep);
    }

}