import { Entity } from "./entity";
import { OBB } from "three/examples/jsm/math/OBB";
import * as T from "three";
import { Meshable } from "../typeutils";

export class CollidableEntity extends Entity {
    obb: OBB[];

    constructor(mesh: Meshable, scene: T.Scene) {
        super(mesh, scene);
        this.obb = [];
        if (this.mesh instanceof T.Mesh) {
            this.mesh.geometry.computeBoundingBox();
            this.obb.push(new OBB().fromBox3(this.mesh.geometry.boundingBox as T.Box3));
        } else if (this.mesh instanceof T.Group) {
            // TODO: Temm change this to loop through all children and only use the ones that contain hidden | Traverse?
            this.mesh.children[0].children[4].children.forEach(m => {
                (m as T.Mesh).geometry.computeBoundingBox();
                this.obb.push(new OBB().fromBox3((m as T.Mesh).geometry.boundingBox as T.Box3));
            });
        }
    }

    collidesWith(other: CollidableEntity): boolean {
        this.obb.forEach((obb) => {
            let myOBB = obb.clone();
            myOBB.applyMatrix4(this.mesh.matrixWorld);
            other.obb.forEach((otherObb) => {
                // TODO: scorpion fix this
                let otherOBB = otherObb.clone();
                otherOBB.applyMatrix4(other.mesh.matrixWorld);
                if (myOBB.intersectsOBB(otherOBB, Number.EPSILON)) {

                    return true;
                }
            });
        });
        return false;
    }


    endCollision(collidable: CollidableEntity): void {
    }


    onCollision(collidable: CollidableEntity): void {
    }


}