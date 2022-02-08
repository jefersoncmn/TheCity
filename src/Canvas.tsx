import React, { useRef, useEffect, MouseEventHandler } from 'react'
import { Losango, Point, QuadTree, Rectangle, Triangle } from './pages/models/quadTree';

interface Props {
    // All props
}

const Canvas = (props: Props) => {

    // var grid: Grid = new Grid(2, 2, 10);
    let width: number = 900;
    let height: number = width * 0.7;

    let boundary = new Losango(0, width / 2, height / 2, width, height);
    // use ref as HTML Canvas Element
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    let qt = new QuadTree(boundary, 4);
    let ctx: any;


    useEffect(() => {
        ctx = canvasRef.current?.getContext("2d") as any

        drawLosango(width / 2, height / 2, width, height, "#529441");
        // drawTriangle(qt.boundary.triangleDown, "#a4b943");
        // drawTriangle(qt.boundary.triangleUp, "#a4b943");
        createMapWithLosango(ctx);
    }, [])

    const drawLosango = (x: any, y: any, w: any, h: any, color: any) => {
        //https://www.guj.com.br/t/graphics-desenhar-losango/243668/6
        ctx.fillStyle = color;

        ctx.beginPath();
        ctx.moveTo(x, y - h / 2);
        ctx.lineTo(x + w / 2, y);
        ctx.lineTo(x, y + h / 2);
        ctx.lineTo(x - w / 2, y);
        ctx.lineTo(x, y - h / 2);
        ctx.fill();
        ctx.closePath();
    }

    const drawTriangle = (triangle: Triangle, color: string) => {
        //https://www.guj.com.br/t/graphics-desenhar-losango/243668/6
        ctx.fillStyle = color;

        ctx.beginPath();
        ctx.moveTo(triangle.x1, triangle.y1);
        ctx.lineTo(triangle.x2, triangle.y2);
        ctx.lineTo(triangle.x3, triangle.y3);
        ctx.lineTo(triangle.x1, triangle.y1);
        ctx.fill();
        ctx.closePath();
    }

    const getPosition = (event: any) => {
        console.log('clicked  X: ' + event.clientX + ' Y:' + event.clientY);

        let point = new Point(event.clientX, event.clientY);
        let selected: any = [];
        qt.queryLosango(point, selected);
        console.log(selected);
        return null;
    }

    const createMapWithLosango = (ctx: any) => {
        let i = 0;
        let g = 3;
        let _losangoWidth = 50;
        let _losangoHeight = _losangoWidth * 0.7;
        for (var x = _losangoWidth; x < width; x += _losangoWidth) {

            for (var y = _losangoHeight / 2; y < height; y += _losangoHeight) {
                let l = new Losango(i, x, y, _losangoWidth, _losangoHeight);

                if (qt.boundary.containsPoint(new Point(l.positionX, l.positionY))) {
                    qt.insertLosango(l);
                    drawLosango(x, y, _losangoWidth, _losangoHeight, "#90db7d");
                }
            }

        }
        for (var x = _losangoWidth / 2; x < width; x += _losangoWidth) {

            for (var y = _losangoHeight; y < height; y += _losangoHeight) {
                let l = new Losango(i, x, y, _losangoWidth, _losangoHeight);

                if (qt.boundary.containsPoint(new Point(l.positionX, l.positionY))) {
                    qt.insertLosango(l);
                    drawLosango(x, y, _losangoWidth, _losangoHeight, "#90db7d");
                }
            }

        }
        console.log(qt);

    }

    return (
        <canvas
            className="canvas"
            ref={canvasRef}
            width={window.innerWidth}
            height={window.innerHeight}
            onMouseDown={getPosition}
        />
    )
}



export default Canvas