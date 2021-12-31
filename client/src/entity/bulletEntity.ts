import { CollidableEntity } from "./collidableEntity";
import { TankEntity } from "./tankEntity";
import * as T from "three";

export class BulletEntity extends CollidableEntity {

    static radius = 0.3;
    shooter: TankEntity;
    speed: number;
    moveStep: number;

    constructor(angle: number, x: number, z: number, y: number, shooter: TankEntity, scene: T.Scene) {

        let geometry = new T.SphereGeometry(BulletEntity.radius, 16, 16);
        let material = new T.MeshBasicMaterial({color: 0x000000});
        let mesh = new T.Mesh(geometry, material);
        mesh.position.set(x, y, z);
        mesh.rotation.copy(shooter.mesh.rotation);
        super(mesh, scene);

        this.shooter = shooter;

        this.moveStep = 0.01;
        this.speed = 5;
    }


    kill() {
        let i = this.shooter.bullets.indexOf(this);
        this.shooter.bullets.splice(i, 1);
        super.kill();
    }

    onCollision(collidable: CollidableEntity) {

        this.kill();
        collidable.kill();

    }

    move(delta: number) {
        if (this.mesh.position.distanceTo(this.scene.position) > 200) {
            this.kill(); // Kill if too far away
        }

        super.move(-this.speed * delta * this.moveStep);
    }


}