import {CollidableEntity} from "./collidableEntity";
import * as T from "three";
import {BulletEntity} from "./bulletEntity";
import {Meshable} from "../typeutils";

export class TankEntity extends CollidableEntity {
    bullets: BulletEntity[];
    visual: Meshable;
    height: number;
    length: number;

    constructor(scene: T.Scene, uwu: Meshable) {

        uwu = uwu.clone();

        // Heck to create a new mesh with the size of the visual element
        let box3 = new T.Box3().setFromObject(uwu);
        const dimensions = new T.Vector3().subVectors(box3.max, box3.min);
        const boxGeo = new T.BoxBufferGeometry(dimensions.x, dimensions.y, dimensions.z);
        const matrix = new T.Matrix4().setPosition(dimensions.addVectors(box3.min, box3.max).multiplyScalar(0.5));
        boxGeo.applyMatrix4(matrix);
        const mesh = new T.Mesh(boxGeo, new T.MeshBasicMaterial({color: 0xffcc55, wireframe: true}));


        super(mesh, scene);
        this.visual = uwu.clone();
        this.scene.add(this.visual);
        this.height = (box3.max.y - box3.min.y) * 4;
        this.length = (box3.max.x - box3.min.x) * 4;

        this.bullets = [];
        this.mesh.scale.set(4, 5, 4); // Larger y/height to make it easier for the bullets to hit
        this.visual.scale.set(4, 4, 4);
    }


    shoot() {
        const bullet = new BulletEntity(this.mesh.rotation.y, this.mesh.position.x, this.mesh.position.z, this.mesh.position.y + this.height - BulletEntity.radius, this, this.scene);
        bullet.mesh.translateZ(-this.length);
        this.bullets.push(bullet);
    }

    kill() {
        this.scene.remove(this.visual);
        super.kill();
    }

    update(delta: number) {
        // Baka hacky
        this.visual.position.copy(this.mesh.position);
        this.visual.rotation.copy(this.mesh.rotation);
        super.update(delta);
    }


}