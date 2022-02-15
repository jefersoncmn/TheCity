import { Point } from "./point";
import { Triangle } from "./triangle";

export class Losango {
    id!: number;
    positionX!: number;
    positionY!: number;
    width!: number;
    height!: number;

    triangleUp: Triangle;
    triangleDown: Triangle;

    constructor(id: number, positionX: number, positionY: number, width: number, height: number) {
        this.id = id;
        this.positionX = positionX;
        this.positionY = positionY;
        this.width = width;
        this.height = height;

        this.triangleDown = new Triangle(
            this.positionX - this.width / 2,
            this.positionY,
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

}