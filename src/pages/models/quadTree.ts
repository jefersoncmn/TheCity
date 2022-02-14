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



}

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
}

export class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}