import React, { useRef, useEffect, MouseEventHandler } from 'react'
import { drawLosango, drawLosangoInScreen, drawRectangle, drawTriangle } from './draws';
import { Losango } from './pages/models/losango';
import { Point } from './pages/models/point';
import { QuadTree } from './pages/models/quadTree';
import { Rectangle } from './pages/models/rectangle';

interface Props {
    // All props
}

const Canvas = (props: Props) => {

    //Screen
    const screenWidth = 1000;
    const screenHeight = 700;
    let screen = new Rectangle(0, 0, screenWidth, screenHeight);

    let camera = new Rectangle(0, 0, screenWidth / 2, screenHeight / 2);
    let mirror = new Rectangle(screenWidth / 2, 0, screenWidth / 2, screenHeight / 2);

    //Map
    let width: number = 1000;
    let height: number = width * 0.7;
    let boundary = new Losango(0, width / 2, height / 2, width, height);

    //Canvas
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    let qt = new QuadTree(boundary, 4);
    let ctx: any;

    useEffect(() => {
        ctx = canvasRef.current?.getContext("2d") as any
        // createMap(ctx, 50);
        testMinimalMap();

        setInterval(game, 60);

    }, [])

    const getPosition = (event: any) => {
        // console.log('clicked  X: ' + event.clientX + ' Y:' + event.clientY);
        ctx.fillStyle = "#000000";
        ctx.fillRect(event.clientX - 10, event.clientY - 10, 2, 2);

        let point = new Point(event.clientX - 10, event.clientY - 10);//Fix it!
        let selected: Losango[] = [];
        qt.queryLosango(point, selected);
        console.log(selected);
        if (selected != null && selected.length > 0) {
            console.log("Encontrado: " + selected[0].id);
            drawLosango(ctx, selected[0], "#000000");
            setTimeout(() => {
                drawLosango(ctx, selected[0], "#90db7d");
            }, 100);
        }

        return null;
    }



    const testMinimalMap = () => {
        // let cell = new Cell();
        let l = new Losango(0, boundary.positionX, boundary.positionY, 70, 60);

        if (qt.boundary.containsPoint(new Point(l.positionX, l.positionY))) {
            qt.insertLosango(l);
            drawLosango(ctx, l, "#90db7d");
            console.log("Map created!");

        }
    }

    const instantiateVisibleMap = (ctx: any, losangos: Losango[]) => {
        for (var i = 0; i < losangos.length; i++) {
            drawLosango(ctx, losangos[i], "#7ebe6e");
            // drawTriangle(ctx, losangos[i].triangleDown, "#b3c9ae");
            // drawTriangle(ctx, losangos[i].triangleUp, "#b3c9ae");
            drawLosangoInScreen(ctx, losangos[i], "#7ebe6e", mirror, camera);

        }
    }

    function moveMap(event: any) {
        // console.log("It's moving");
        if (event.key == 'd') {
            camera.positionX = camera.positionX + 4;
        }
        if (event.key == 'a') {
            camera.positionX = camera.positionX - 4;
        }
        if (event.key == 'w') {
            camera.positionY = camera.positionY - 4;
        }
        if (event.key == 's') {
            camera.positionY = camera.positionY + 4;
        }
        // console.log("boundary position: " + boundary.positionX);
        //Todo: Normalize angle movimentation
    }

    // TODO: Make a draw loop
    function game() {
        ctx.fillStyle = 'white';
        ctx.rect(0, 0, window.innerWidth, window.innerHeight);
        ctx.fill();

        drawRectangle(ctx, screen);
        drawRectangle(ctx, camera);

        drawRectangle(ctx, mirror);

        let selected: Losango[] = [];
        qt.queryLosangoWithRectangle(camera, selected);
        instantiateVisibleMap(ctx, selected);


    }

    window.addEventListener('keydown', moveMap);

    return (
        <canvas
            className="canvas"
            ref={canvasRef}
            // width={window.innerWidth}
            // height={window.innerHeight}
            width={screenWidth}
            height={screenHeight}
            onMouseDown={getPosition}
        />
    )
}



export default Canvas