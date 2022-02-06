export class Grid {

    width!: number;
    height!: number;
    cellSize!: number;
    gridArray!: Array<Array<number>>;

    constructor(width: number, height: number, cellsize: number) {
        this.width = width;
        this.height = height;

        this.gridArray = this.CreateGridArray(this.width, this.height);

        this.ReadGridArray();
    }

    CreateGridArray(width: number, height: number) {
        var gridArray = Array.from(Array(width), () => new Array(height));

        for (var x = 0; x < this.width; x++) {

            for (var y = 0; y < this.height; y++) {
                gridArray[x][y] = 2;
            }
        }

        return gridArray;
    }

    ReadGridArray() {
        for (var x = 0; x < this.width; x++) {
            for (var y = 0; y < this.height; y++) {
                console.log("" + this.gridArray[x][y]);
            }
        }
    }


}