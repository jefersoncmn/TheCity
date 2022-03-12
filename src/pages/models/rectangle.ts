import { Losango } from "./losango";
import { Point } from "./point";

export class Rectangle {

    positionX!: number;
    positionY!: number;
    width!: number;
    height!: number;

    constructor(positionX: number, positionY: number, width: number, height: number) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.width = width;
        this.height = height;
    }

    contains(point: Point) {
        return (
            point.x >= this.positionX &&
            point.x < this.positionX + this.width &&
            point.y >= this.positionY &&
            point.y < this.positionY + this.height
        );
    }

    containsRectangle(rectangle: Rectangle) {
        return (
            rectangle.positionX < this.positionX + this.width &&
            rectangle.positionX + rectangle.width > this.positionX &&
            rectangle.positionY < this.positionY + this.height &&
            rectangle.positionY + rectangle.height > this.positionY
        );
    }

    containsLosango(losango: Losango) {
        return (
            this.positionX + this.width > losango.positionX - losango.width / 2 &&
            this.positionX < losango.positionX + losango.width / 2 &&
            this.positionY + this.height > losango.positionY - losango.height / 2 &&
            this.positionY < losango.positionY + losango.height / 2
        );

    }

}