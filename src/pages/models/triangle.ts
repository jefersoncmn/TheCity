import { Point } from "./point";

export class Triangle {
    x1: number; x2: number; x3: number;
    y1: number; y2: number; y3: number;

    constructor(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.x3 = x3;
        this.y3 = y3;
    }

    collisionPoint(point: Point) {
        let areaOrig = Math.abs((this.x2 - this.x1) * (this.y3 - this.y1) - (this.x3 - this.x1) * (this.y2 - this.y1));

        let area1 = Math.abs((this.x1 - point.x) * (this.y2 - point.y) - (this.x2 - point.x) * (this.y1 - point.y));
        let area2 = Math.abs((this.x2 - point.x) * (this.y3 - point.y) - (this.x3 - point.x) * (this.y2 - point.y));
        let area3 = Math.abs((this.x3 - point.x) * (this.y1 - point.y) - (this.x1 - point.x) * (this.y3 - point.y));

        if (area1 + area2 + area3 == areaOrig) {
            return true;
        }
        return false;
    }

    collisionTriangles(triangle: Triangle) {
        //Detect colision with points than other triangle, !works only equilateral triangles!
        if (
            this.collisionPoint(new Point(triangle.x1, triangle.y1)) ||
            this.collisionPoint(new Point(triangle.x2, triangle.y2)) ||
            this.collisionPoint(new Point(triangle.x3, triangle.y3))
        ) {
            return true;
        } else {
            return false;
        }
    }


}