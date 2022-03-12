import { Losango } from "./pages/models/losango";
import { Rectangle } from "./pages/models/rectangle";
import { Triangle } from "./pages/models/triangle";

export const drawTriangle = (ctx: any, triangle: Triangle, color: string) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(triangle.x1, triangle.y1);
    ctx.lineTo(triangle.x2, triangle.y2);
    ctx.lineTo(triangle.x3, triangle.y3);
    ctx.lineTo(triangle.x1, triangle.y1);
    ctx.fill();
    ctx.closePath();
}

export const drawLosango = (ctx: any, losango: Losango, color: any) => {
    ctx.fillStyle = color;

    ctx.beginPath();
    ctx.moveTo(losango.pointUp.x, losango.pointUp.y);
    ctx.lineTo(losango.pointRight.x, losango.pointRight.y);
    ctx.lineTo(losango.pointDown.x, losango.pointDown.y);
    ctx.lineTo(losango.pointLeft.x, losango.pointLeft.y);
    ctx.lineTo(losango.pointUp.x, losango.pointUp.y);
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = "#000000";
    ctx.font = "10px Arial";
    ctx.fillText("" + losango.id, losango.positionX, losango.positionY);
    ctx.fill();
    ctx.closePath();
}

export const drawLosangoInScreen = (ctx: any, losango: Losango, color: any, screen: Rectangle, camera: Rectangle) => {
    ctx.fillStyle = color;
    //Math.abs(distancia em relação a camera) + posicao da tela

    ctx.beginPath();
    ctx.moveTo(Math.abs(camera.positionX - losango.pointUp.x) + screen.positionX, Math.abs(camera.positionY - losango.pointUp.y) + screen.positionY);
    ctx.lineTo(Math.abs(camera.positionX - losango.pointRight.x) + screen.positionX, Math.abs(camera.positionY - losango.pointRight.y) + screen.positionY);
    ctx.lineTo(Math.abs(camera.positionX - losango.pointDown.x) + screen.positionX, Math.abs(camera.positionY - losango.pointDown.y) + screen.positionY);
    ctx.lineTo(Math.abs(camera.positionX - losango.pointLeft.x) + screen.positionX, Math.abs(camera.positionY - losango.pointLeft.y) + screen.positionY);
    ctx.lineTo(Math.abs(camera.positionX - losango.pointUp.x) + screen.positionX, Math.abs(camera.positionY - losango.pointUp.y) + screen.positionY);
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = "#000000";
    ctx.font = "10px Arial";
    ctx.fillText("" + losango.id, losango.positionX, losango.positionY);
    ctx.fill();
    ctx.closePath();
}

export const drawRectangle = (ctx: any, rectangle: Rectangle) => {
    ctx.beginPath();
    ctx.rect(rectangle.positionX, rectangle.positionY, rectangle.width, rectangle.height);
    ctx.stroke();
}