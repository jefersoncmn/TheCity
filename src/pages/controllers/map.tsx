import { Cell } from "../models/cell";
import { Losango } from "../models/losango";
import { Point } from "../models/point";

export const createMap = (ctx: any, qt: any, boundary: any, _losangoWidth: number, width: number, height: number) => {
    let i = 0;
    let g = 3;

    let _losangoHeight = _losangoWidth * 0.7;

    for (var x = _losangoWidth / 2; x < width; x += _losangoWidth / 2) {

        for (var y = _losangoHeight; y < height; y += _losangoHeight) {

            let cell = new Cell();
            let l = new Losango(i, x, y, _losangoWidth, _losangoHeight, cell);

            if (qt.boundary.containsPoint(new Point(l.positionX, l.positionY))) {
                qt.insertLosango(l);
                // drawLosango(l, "#90db7d");
                i++;
            }
        }
        x += _losangoWidth / 2;

        for (var y = _losangoHeight / 2; y < height; y += _losangoHeight) {

            let cell = new Cell();
            let l = new Losango(i, x + (boundary.positionY - (width / 2)), y + (boundary.positionY - (height / 2)), _losangoWidth, _losangoHeight, cell);

            if (qt.boundary.containsPoint(new Point(l.positionX, l.positionY))) {
                qt.insertLosango(l);
                // drawLosango(l, "#90db7d");
                i++;
            }
        }

    }
}