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

export class QuadTree {

    boundary;
    capacity: number;
    points: Array<Point>;
    rectangles: Array<Rectangle>;

    northwest!: QuadTree;
    northeast!: QuadTree;
    southwest!: QuadTree;
    southeast!: QuadTree;

    divided: boolean = false;

    constructor(boundary: any, capacity: number) {
        this.boundary = boundary;
        this.capacity = capacity;
        this.points = [];
        this.rectangles = [];
    }

    subdivide() {

        let x = this.boundary.positionX;
        let y = this.boundary.positionY;
        let w = this.boundary.width;
        let h = this.boundary.height;

        let ne = new Rectangle(0, x + w / 2, y - w / 2, w / 2, h / 2);
        this.northeast = new QuadTree(ne, this.capacity);
        let nw = new Rectangle(0, x - w / 2, y - w / 2, w / 2, h / 2);
        this.northwest = new QuadTree(nw, this.capacity);
        let se = new Rectangle(0, x + w / 2, y + w / 2, w / 2, h / 2);
        this.southeast = new QuadTree(se, this.capacity);
        let sw = new Rectangle(0, x - w / 2, y + w / 2, w / 2, h / 2);
        this.southwest = new QuadTree(sw, this.capacity);
        this.divided = true;
    }

    subdivideRectangle() {
        // console.log("subdivisão aconteceu");
        let x = this.boundary.positionX;
        let y = this.boundary.positionY;
        let w = this.boundary.width;
        let h = this.boundary.height;

        let ne = new Rectangle(0, x, y, w / 2, h / 2);
        console.log('Created ne rectangle x: ' + (x) + " y: " + (y) + " w: " + (w / 2) + " h: " + (h / 2));
        this.northeast = new QuadTree(ne, this.capacity);
        let nw = new Rectangle(0, x + w / 2, y, w / 2, h / 2);
        console.log('Created nw rectangle x: ' + (x + w / 2) + " y: " + (y) + " w: " + (w / 2) + " h: " + (h / 2));
        this.northwest = new QuadTree(nw, this.capacity);
        let se = new Rectangle(0, x, y + h / 2, w / 2, h / 2);
        console.log('Created se rectangle x: ' + (x) + " y: " + (y + h / 2) + " w: " + (w / 2) + " h: " + (h / 2));
        this.southeast = new QuadTree(se, this.capacity);
        let sw = new Rectangle(0, x + w / 2, y + h / 2, w / 2, h / 2);
        console.log('Created sw rectangle x: ' + (x + w / 2) + " y: " + (y + h / 2) + " w: " + (w / 2) + " h: " + (h / 2));
        this.southwest = new QuadTree(sw, this.capacity);
        this.divided = true;

    }

    insert(point: Point) {

        if (!this.boundary.contains(point)) {
            return false;
        }

        if (this.points.length < this.capacity) {
            this.points.push(point);
            return true;
        } else {
            if (!this.divided) {
                this.subdivide();
            }

            this.northeast?.insert(point);
            this.northwest?.insert(point);
            this.southeast?.insert(point);
            this.southwest?.insert(point);

        }
    }

    insertRectangle(rectangle: Rectangle) {
        // console.log(this.boundary.containsRectangle(rectangle));
        if (!this.boundary.containsRectangle(rectangle)) {
            return false;
        }

        if (this.rectangles.length < this.capacity) {
            this.rectangles.push(rectangle);
            return true;
        } else {
            if (!this.divided) {
                this.subdivideRectangle();
            }
            if (this.northeast?.insertRectangle(rectangle)) {
                return true;
            }
            else if (this.northwest?.insertRectangle(rectangle)) {
                return true;
            }
            else if (this.southeast?.insertRectangle(rectangle)) {
                return true;
            }
            else if (this.southwest?.insertRectangle(rectangle)) {
                return true;
            }
        }
    }

    query(point: Point, found: any) {
        if (!this.boundary.contains(point)) {
            console.log("ponto x: " + point.x + " y: " + point.y + " não colide com o retangulo x: " + this.boundary.positionX + " y: " + this.boundary.positionY + " w: " + this.boundary.width + " h: " + this.boundary.height);
            return;
        } else {
            console.log("ponto x: " + point.x + " y: " + point.y + " colide com o retangulo x: " + this.boundary.positionX + " y: " + this.boundary.positionY + " w: " + this.boundary.width + " h: " + this.boundary.height);

            for (let i = 0; i < this.rectangles.length; i++) {
                if (this.rectangles[i].contains(point)) {
                    console.log("ponto x: " + point.x + " y: " + point.y + " colide com o retangulo x: " + this.rectangles[i].positionX + " y: " + this.rectangles[i].positionY + " w: " + this.boundary.width + " h: " + this.boundary.height);

                    found.push(this.rectangles[i]);
                }
            }

            if (this.divided) {
                this.northeast.query(point, found);
                this.northwest.query(point, found);
                this.southeast.query(point, found);
                this.southwest.query(point, found);
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