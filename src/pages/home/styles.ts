import style, { keyframes } from 'styled-components'
import { StringLiteralLike } from 'typescript';
import colors from '../../colors';

export const Container = style.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-weight: 100;
`;