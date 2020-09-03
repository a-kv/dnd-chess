import React from 'react';
import './../scss/board.scss'
import {BoardSquare} from './BoardSquare'

export type pieceType = {
    id: string
    type: string
    color: string
}

type propsType = {
    board: Array<pieceType>
}


export const Board = ({board}: propsType) => {

    const getXYPosition = (i: number) => {
        const x = i % 8
        const y = Math.abs(Math.floor(i / 8) - 7)
        return {x, y}
    }

    const isBlack = (i: number) => {
        const {x, y} = getXYPosition(i)
        return (x + y) % 2 === 1
    }

    const getPosition = (i: number) => {
        const {x, y} = getXYPosition(i)
        const letter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'][x]
        return `${letter}${y+1}`
    }

    return (
        <div className="board">
            {board.flat().map((piece, i) => {
                return <div key={i} className='square'><BoardSquare piece={piece} black={isBlack(i)} position={getPosition(i)}/></div>
            })}
        </div>
    );
}

