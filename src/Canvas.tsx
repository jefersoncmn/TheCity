import React, { useRef, useEffect, MouseEventHandler } from 'react'
import { Losango, Point, QuadTree, Rectangle, Triangle } from './pages/models/quadTree';

interface Props {
    // All props
}

const Canvas = (props: Props) => {

    // var grid: Grid = new Grid(2, 2, 10);
    let width: number = 600;
    let height: number = width * 0.7;

    let boundary = new Losango(0, width / 2, height / 2, width, height);
    // use ref as HTML Canvas Element
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    let qt = new QuadTree(boundary, 4);
    let ctx: any;


    useEffect(() => {
        ctx = canvasRef.current?.getContext("2d") as any
        drawLosango(boundary, "#182714");
        // let s = drawSibdivisions(boundary, "#75926d");
        // drawSibdivisions(s, "#d0d31b");
        // drawTriangle(boundary.triangleDown, "#ec2c12");
        // drawTriangle(boundary.triangleDown, "#75926d");

        // createMapWithLosango(ctx, 50);
        createMapWithLosango(ctx, 50);
        drawAllTriangles(ctx);
        // setInterval(game, 60);

    }, [])

    const drawSibdivisions = (losango: Losango, color: string) => {
        let n = new Losango(0, losango.positionX, losango.positionY - (losango.height / 2) / 2, losango.width / 2, losango.height / 2);
        drawLosango(n, color);

        let s = new Losango(0, losango.positionX, losango.positionY + (losango.height / 2) / 2, losango.width / 2, losango.height / 2);
        drawLosango(s, color);
        return s;
    }

    const drawLosango = (losango: Losango, color: any) => {
        //https://www.guj.com.br/t/graphics-desenhar-losango/243668/6
        ctx.fillStyle = color;

        ctx.beginPath();
        ctx.moveTo(losango.positionX, losango.positionY - losango.height / 2);
        ctx.lineTo(losango.positionX + losango.width / 2, losango.positionY);
        ctx.lineTo(losango.positionX, losango.positionY + losango.height / 2);
        ctx.lineTo(losango.positionX - losango.width / 2, losango.positionY);
        ctx.lineTo(losango.positionX, losango.positionY - losango.height / 2);
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.fillStyle = "#000000";
        ctx.font = "10px Arial";
        ctx.fillText("" + losango.id, losango.positionX, losango.positionY);
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
        ctx.fillStyle = "#000000";
        ctx.fillRect(event.clientX, event.clientY, 2, 2);

        let point = new Point(event.clientX, event.clientY);
        let selected: Losango[] = [];
        let d = qt.queryLosango(point, selected);
        // console.log(d);
        if (selected != null && selected.length > 0) {
            console.log("Encontrado: " + selected[0]);
            drawLosango(selected[0], "#000000");
            setTimeout(() => {
                drawLosango(selected[0], "#90db7d");
            }, 100);
        }

        return null;
    }


    const createMapWithLosango = (ctx: any, _losangoWidth: number) => {
        let i = 0;
        let g = 3;

        let _losangoHeight = _losangoWidth * 0.7;
        for (var x = _losangoWidth; x < width; x += _losangoWidth) {

            for (var y = _losangoHeight / 2; y < height; y += _losangoHeight) {
                let l = new Losango(i, x, y, _losangoWidth, _losangoHeight);

                if (qt.boundary.containsPoint(new Point(l.positionX, l.positionY))) {
                    qt.insertLosango(l);
                    drawLosango(l, "#90db7d");
                    i++;
                }
            }

        }
        for (var x = _losangoWidth / 2; x < width; x += _losangoWidth) {

            for (var y = _losangoHeight; y < height; y += _losangoHeight) {
                let l = new Losango(i, x, y, _losangoWidth, _losangoHeight);

                if (qt.boundary.containsPoint(new Point(l.positionX, l.positionY))) {
                    qt.insertLosango(l);
                    drawLosango(l, "#90db7d");
                    i++;
                }
            }

        }
        // console.log(qt);

    }

    const drawAllTriangles = (ctx: any) => {
        for (var i = 0; i < qt.losangos.length; i++) {
            drawTriangle(qt.losangos[i].triangleDown, "#ffffff");
        }
    }

    function game() {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, width, height);
        createMapWithLosango(ctx, 50);

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