//Esse código é do video
//https://youtu.be/OJxEcs0w_kE
import React, { useRef, useEffect, MouseEventHandler } from 'react'

export class Rectangle {

    id!: number;
    positionX!: number;
    positionY!: number;
    width!: number;
    height!: number;

    constructor(id: number, positionX: number, positionY: number, width: number, height: number) {
        this.id = id;
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

}

export class Losango {
    id!: number;
    positionX!: number;
    positionY!: number;
    width!: number;
    height!: number;

    // losangoList: Array<Losango>;
    triangleUp: Triangle;
    triangleDown: Triangle;

    constructor(id: number, positionX: number, positionY: number, width: number, height: number) {
        this.id = id;
        this.positionX = positionX;
        this.positionY = positionY;
        this.width = width;
        this.height = height;

        // this.losangoList = [];

        this.triangleUp = new Triangle(
            this.positionX - this.width / 2,
            this.positionY,
            this.positionX + this.width / 2,
            this.positionY,
            this.positionX,
            this.positionY + this.height / 2
        );

        this.triangleDown = new Triangle(
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

    containsLosango(losango: Losango) {
        return (
            this.triangleUp.collisionTriangles(losango.triangleUp) ||
            this.triangleUp.collisionTriangles(losango.triangleDown) ||
            this.triangleDown.collisionTriangles(losango.triangleUp) ||
            this.triangleDown.collisionTriangles(losango.triangleDown)
        );
    }



}

export class Triangle {
    //Site de referência aos codigos de colisão de triangulos
    //http://www.jeffreythompson.org/collision-detection/tri-point.php
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

    //Melhorar a eficiencia disso
    //Isso só garante colisão de trinagulos de mesmo tamanho, ou triangulos equilateros
    collisionTriangles(triangle: Triangle) {
        //Detect colision with points than other triangle
        if (this.collisionPoint(new Point(triangle.x1, triangle.y1))) {
            return true;
        } else if (this.collisionPoint(new Point(triangle.x2, triangle.y2))) {
            return true;
        } else if (this.collisionPoint(new Point(triangle.x3, triangle.y3))) {
            return true;
        }
        return false;
    }


}

export class QuadTree {

    boundary: Losango;
    capacity: number;
    losangos: Array<Losango>;

    northwest!: QuadTree;
    northeast!: QuadTree;
    southwest!: QuadTree;
    southeast!: QuadTree;

    divided: boolean = false;

    constructor(boundary: any, capacity: number) {
        this.boundary = boundary;
        this.capacity = capacity;
        this.losangos = [];
    }

    subdivideLosango() {
        console.log("subdivisão aconteceu");
        let x = this.boundary.positionX;
        let y = this.boundary.positionY;
        let w = this.boundary.width;
        let h = this.boundary.height;

        let ne = new Losango(0, x + w / 2, y - w / 2, w / 2, h / 2);

        this.northeast = new QuadTree(ne, this.capacity);
        let nw = new Losango(0, x - w / 2, y - w / 2, w / 2, h / 2);

        this.northwest = new QuadTree(nw, this.capacity);
        let se = new Losango(0, x + w / 2, y + w / 2, w / 2, h / 2);

        this.southeast = new QuadTree(se, this.capacity);
        let sw = new Losango(0, x - w / 2, y + w / 2, w / 2, h / 2);

        this.southwest = new QuadTree(sw, this.capacity);
        this.divided = true;

    }

    insertLosango(losango: Losango) {
        if (!this.boundary.containsLosango(losango)) {
            return false;
        }

        if (this.losangos.length < this.capacity) {
            this.losangos.push(losango);
            return true;
        } else {
            if (!this.divided) {
                this.subdivideLosango();
            }
            if (this.northeast?.insertLosango(losango)) {
                return true;
            }
            else if (this.northwest?.insertLosango(losango)) {
                return true;
            }
            else if (this.southeast?.insertLosango(losango)) {
                return true;
            }
            else if (this.southwest?.insertLosango(losango)) {
                return true;
            }
        }
    }

    queryLosango(point: Point, found: any) {
        if (!this.boundary.containsPoint(point)) {
            console.log("ponto x: " + point.x + " y: " + point.y + " não colide com o losango x: " + this.boundary.positionX + " y: " + this.boundary.positionY + " w: " + this.boundary.width + " h: " + this.boundary.height);
            return;
        } else {
            console.log("ponto x: " + point.x + " y: " + point.y + " colide com o losango x: " + this.boundary.positionX + " y: " + this.boundary.positionY + " w: " + this.boundary.width + " h: " + this.boundary.height);

            for (let i = 0; i < this.losangos.length; i++) {
                if (this.losangos[i].containsPoint(point)) {
                    console.log("ponto x: " + point.x + " y: " + point.y + " colide com o losango x: " + this.losangos[i].positionX + " y: " + this.losangos[i].positionY + " w: " + this.boundary.width + " h: " + this.boundary.height);

                    found.push(this.losangos[i]);
                }
            }

            if (this.divided) {
                this.northeast.queryLosango(point, found);
                this.northwest.queryLosango(point, found);
                this.southeast.queryLosango(point, found);
                this.southwest.queryLosango(point, found);
            }
        }
        return found;
    }
}

export class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}