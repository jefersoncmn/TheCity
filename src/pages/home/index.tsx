import { useRef } from 'react';
import { Grid } from '../models/grid';
import { Container } from './styles';

export const Home = () => {

    const canvasRef = useRef(null);
    var grid: Grid = new Grid(2, 2, 10);

    const getPosition = () => {
        console.log('clicked');
        return null;
    }

    return (

        <canvas
            onMouseDown={getPosition}
        />
    );
}