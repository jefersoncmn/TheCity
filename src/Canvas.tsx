import React, { useRef, useEffect, MouseEventHandler } from 'react'
import { Point, QuadTree, Rectangle } from './pages/models/quadTree';

interface Props {
    // All props
}

const Canvas = (props: Props) => {

    // var grid: Grid = new Grid(2, 2, 10);
    let width: number = 200;
    let height: number = 200;
    let boundary = new Rectangle(0, 0, 0, width, height);

    // use ref as HTML Canvas Element
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    let qt = new QuadTree(boundary, 4);
    let ctx: any;


    useEffect(() => {
        ctx = canvasRef.current?.getContext("2d") as any
        createMap(ctx);
        // showQuadTree(ctx, qt);

    }, [])

    // const showQuadTree = (ctx: any, qt: QuadTree) => {
    //     ctx.fillStyle = 'green';

    //     ctx.rect(qt.boundary.positionX, qt.boundary.positionY, qt.boundary.width, qt.boundary.height);
    //     console.log('rect');
    //     ctx.stroke();
    //     if (qt.divided) {
    //         showQuadTree(ctx, qt.northeast);
    //         showQuadTree(ctx, qt.northwest);
    //         showQuadTree(ctx, qt.southeast);
    //         showQuadTree(ctx, qt.southwest);
    //     }

    //     // showPoints(ctx, qt);
    // }

    const showPoints = (ctx: any, qt: QuadTree) => {
        ctx.fillStyle = 'black';

        for (var y = 1; y < qt.points.length; y++) {
            ctx.fillRect(qt.points[y].x, qt.points[y].y, 3, 3);
        }

    }

    const getPosition = (event: any) => {
        console.log('clicked  X: ' + event.clientX + ' Y:' + event.clientY);

        let point = new Point(event.clientX, event.clientY);
        let selected: any = [];
        qt.query(point, selected);
        console.log(selected);
        return null;
    }

    const createMap = (ctx: any) => {
        let i = 0;
        for (var x = 0; x < width; x += 50) {
            for (var y = 0; y < height; y += 50) {
                let p = new Rectangle(i, x, y, 50, 50);
                // console.log("Retangulo criado x: " + p.positionX + " y: " + p.positionY);
                qt.insertRectangle(p);
                i++;
                // ctx.strokeStyle = 'blue';
                ctx.strokeRect(x, y, 50, 50);
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