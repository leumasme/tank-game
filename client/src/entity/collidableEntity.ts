import {Entity} from "./entity";
import {OBB} from "three/examples/jsm/math/OBB";
import * as T from "three";

export class CollidableEntity extends Entity {
    obb: OBB;

    constructor(mesh: T.Mesh, scene: T.Scene) {
        super(mesh, scene);
        this.mesh.geometry.computeBoundingBox();
        this.obb = new OBB().fromBox3(this.mesh.geometry.boundingBox as T.Box3);
    }

    collidesWith(other: CollidableEntity): boolean {
        let myOBB = this.obb.clone();
        myOBB.applyMatrix4(this.mesh.matrixWorld);
        let otherOBB = other.obb.clone();
        otherOBB.applyMatrix4(other.mesh.matrixWorld);

        return myOBB.intersectsOBB(otherOBB, Number.EPSILON);
    }


    endCollision(collidable: CollidableEntity): void {
        (this.mesh.material as T.MeshBasicMaterial).color.set(0x0000ff);
    }


    onCollision(collidable: CollidableEntity): void {
        (this.mesh.material as T.MeshBasicMaterial).color.set(0xff0000);
    }


}