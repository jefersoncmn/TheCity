import { Cell } from "./cell";
import { Point } from "./point";
import { Rectangle } from "./rectangle";
import { Triangle } from "./triangle";

export class Losango {
    id!: number;
    positionX!: number;
    positionY!: number;
    width!: number;
    height!: number;

    pointUp: Point;
    pointDown: Point;
    pointLeft: Point;
    pointRight: Point;

    cell?: Cell;

    triangleUp: Triangle;
    triangleDown: Triangle;

    constructor(id: number, positionX: number, positionY: number, width: number, height: number, cell?: Cell) {
        this.id = id;
        this.positionX = positionX;
        this.positionY = positionY;
        this.width = width;
        this.height = height;

        //Losango points
        this.pointUp = new Point(this.positionX, this.positionY - this.height / 2);
        this.pointDown = new Point(this.positionX, this.positionY + this.height / 2);
        this.pointLeft = new Point(this.positionX - this.width / 2, this.positionY);
        this.pointRight = new Point(this.positionX + this.width / 2, this.positionY);

        this.triangleDown = new Triangle(
            this.positionX - this.width / 2,//x1
            this.positionY,//y1
            this.positionX + this.width / 2,
            this.positionY,
            this.positionX,
            this.positionY + this.height / 2
        );

        this.triangleUp = new Triangle(
            this.positionX - this.width / 2,
            this.positionY,
            this.positionX + this.width / 2,
            this.positionY,
            this.positionX,
            this.positionY - this.height / 2
        );

        this.cell = cell;
    }

    containsPoint(point: Point) {
        if (this.triangleDown.collisionPoint(point)) {
            return true;
        } else if (this.triangleUp.collisionPoint(point)) {
            return true;
        }
        return false;

    }
    /**
     * Identifies if there is a diamond inside
     * @param losango Losango class
     * @returns True = This losango is inside; False = Is not in
     */
    containsLosango(losango: Losango) {
        return (
            this.triangleUp.collisionTriangles(losango.triangleUp) ||
            this.triangleUp.collisionTriangles(losango.triangleDown) ||
            this.triangleDown.collisionTriangles(losango.triangleUp) ||
            this.triangleDown.collisionTriangles(losango.triangleDown)
        );
    }

    containsLosangoFull(losango: Losango) {
        return (
            this.triangleUp.collisionTriangles(losango.triangleUp) &&
            this.triangleUp.collisionTriangles(losango.triangleDown) &&
            this.triangleDown.collisionTriangles(losango.triangleUp) &&
            this.triangleDown.collisionTriangles(losango.triangleDown)
        );
    }

    intersectsRectangle(rectangle: Rectangle) {
        return (
            rectangle.positionX > this.positionX - this.width / 2 ||
            rectangle.positionX < this.positionX + this.width / 2 ||
            rectangle.positionY > this.positionY - this.height / 2 ||
            rectangle.positionY < this.positionY + this.height / 2
        );
    }

}