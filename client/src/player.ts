import * as T from 'three';

import { Meshable } from './typeutils';

export class Player {
    constructor(m: Meshable) {
        this.mesh = m.clone();
    }
    mesh: Meshable;
}