import * as T from 'three';

import { loaded } from "./resource";

export class Player {
    constructor(m: T.Mesh) {
        this.mesh = m;
    }
    mesh: T.Mesh;
}