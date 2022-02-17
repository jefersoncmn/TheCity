import { Terrain } from "./terrain";

export class Cell {
    id!: number;
    northwest!: Cell;
    northeast!: Cell;
    southwest!: Cell;
    southeast!: Cell;

    terrain!: Terrain;

    //  Future

    //carRoads
    //trainRoads
}