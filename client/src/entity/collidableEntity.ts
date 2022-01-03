import { Entity } from "./entity";
import { OBB } from "three/examples/jsm/math/OBB";
import * as T from "three";
import { Meshable } from "../typeutils";

export abstract class CollidableEntity extends Entity {
    obb: OBB[];

    constructor(mesh: Meshable, scene: T.Scene) {
        super(mesh, scene);
        this.obb = [];
        if (this.mesh instanceof T.Mesh) {
            this.mesh.geometry.computeBoundingBox();
            this.obb.push(new OBB().fromBox3(this.mesh.geometry.boundingBox!));
        } else if (this.mesh instanceof T.Group) {
            // TODO: Temm change this to loop through all children and only use the ones that contain hidden | Traverse?
            for (let child of this.mesh.children[0].children.find(x=> x.name == "Hidden")!.children) {
                if (child instanceof T.Mesh && child.name == "hitbox") {
                    child.geometry.computeBoundingBox();
                    this.obb.push(new OBB().fromBox3(child.geometry.boundingBox!));
                }
            }
        }

    }

    collidesWith(other: CollidableEntity): boolean {
        let collied = false;

        this.obb.forEach((obb, i) => {
            let myOBB = obb.clone();
            myOBB.applyMatrix4(this.mesh.matrixWorld);
            other.obb.forEach((otherObb, j) => {
                let otherOBB = otherObb.clone();
                otherOBB.applyMatrix4(other.mesh.matrixWorld);
                if (myOBB.intersectsOBB(otherOBB, Number.EPSILON)) {
                    collied = true;
                }
            });
        });

        return collied;
    }
}