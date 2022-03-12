import { Losango } from "./losango";
import { Point } from "./point";
import { Rectangle } from "./rectangle";

export class QuadTree {

    boundary: Losango;
    capacity: number;
    losangos: Array<Losango>;

    south!: QuadTree;
    north!: QuadTree;
    west!: QuadTree;
    heast!: QuadTree;

    divided: boolean = false;

    constructor(boundary: any, capacity: number) {
        this.boundary = boundary;
        this.capacity = capacity;
        this.losangos = [];
    }

    subdivideLosango() {
        let x = this.boundary.positionX;
        let y = this.boundary.positionY;
        let w = this.boundary.width;
        let h = this.boundary.height;

        let n = new Losango(0, x, y - (h / 2) / 2, w / 2, h / 2);
        this.north = new QuadTree(n, this.capacity);

        let s = new Losango(0, x, y + (h / 2) / 2, w / 2, h / 2);
        this.south = new QuadTree(s, this.capacity);

        let _w = new Losango(0, x - (w / 2) / 2, y, w / 2, h / 2);
        this.west = new QuadTree(_w, this.capacity);

        let _h = new Losango(0, x + (w / 2) / 2, y, w / 2, h / 2);
        this.heast = new QuadTree(_h, this.capacity);
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
            this.north?.insertLosango(losango);
            this.south?.insertLosango(losango);
            this.heast?.insertLosango(losango);
            this.west?.insertLosango(losango);
        }
    }

    queryLosango(point: Point, found: Losango[]) {
        if (!this.boundary.containsPoint(point)) {
            return;
        } else {
            for (let i = 0; i < this.losangos.length; i++) {
                if (this.losangos[i].containsPoint(point)) {
                    found.push(this.losangos[i]);
                }
            }

            if (this.divided) {
                this.north.queryLosango(point, found);
                this.south.queryLosango(point, found);
                this.heast.queryLosango(point, found);
                this.west.queryLosango(point, found);
            }
        }

    }

    queryLosangoWithRectangle(rectangle: Rectangle, found: Losango[]) {
        if (!this.boundary.intersectsRectangle(rectangle)) {
            return;
        } else {
            for (let i = 0; i < this.losangos.length; i++) {
                // if (this.losangos[i].containsRectangle(rectangle)) {
                //     found.push(this.losangos[i]);
                // }
                // if (rectangle.contains(new Point(this.losangos[i].positionX, this.losangos[i].positionY))) {
                //     found.push(this.losangos[i]);
                // }
                if (rectangle.containsLosango(this.losangos[i])) {
                    found.push(this.losangos[i]);
                }
            }

            if (this.divided) {
                this.north.queryLosangoWithRectangle(rectangle, found);
                this.south.queryLosangoWithRectangle(rectangle, found);
                this.heast.queryLosangoWithRectangle(rectangle, found);
                this.west.queryLosangoWithRectangle(rectangle, found);
            }
        }
    }
}

