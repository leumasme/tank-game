import { CollidableEntity } from "./collidableEntity";
import { TankEntity } from "./tankEntity";
import * as T from "three";
import { Entity } from "./entity";
import { TankEntityPlayer } from "./tankEntityPlayer";

export class BulletEntity extends CollidableEntity {
    static radius = 0.3;
    shooter: TankEntity;
    speed: number;

    constructor(rotation: T.Euler, x: number, z: number, y: number, shooter: TankEntity, scene: T.Scene) {
        let geometry = new T.SphereGeometry(BulletEntity.radius, 16, 16);
        let material = new T.MeshBasicMaterial({color: 0x000000});
        let mesh = new T.Mesh(geometry, material);
        mesh.position.set(x, y, z);
        mesh.rotation.copy(rotation);
        super(mesh, scene);

        this.shooter = shooter;

        this.speed = 0.05;
    }

    kill() {
        let i = this.shooter.bullets.indexOf(this);
        this.shooter.bullets.splice(i, 1);
        super.kill();
    }

    onCollision(other: CollidableEntity) {
        if (other.alive && other instanceof TankEntity && other !== this.shooter) {
            this.kill();
            other.kill();
        }
    }

    move(delta: number) {
        if (this.mesh.position.distanceTo(this.scene.position) > 200) {
            this.kill(); // Kill if too far away
        }
        super.move(-this.speed * delta * 0.01);
    }

    update(delta: number): void {
        this.move(delta);
    }
}