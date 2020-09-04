import React, {useEffect, useState, SetStateAction} from 'react';
import './../scss/board.scss'
import {BoardSquare} from './BoardSquare'

export type pieceType = {
    id: string
    type: string
    color: string
}

type propsType = {
    board: Array<pieceType>
    turn: any
}


export const Board = ({board, turn}: propsType) => {
    const [currBoard, setCurrBoard] = useState([])
    useEffect
    (() => {
        setCurrBoard(
            // @ts-ignore
            turn === 'w' ? board.flat() : board.flat().reverse()
        )
    }, [board, turn])

    const getXYPosition = (i: number) => {
        const x = turn === 'w' ? i % 8 : Math.abs((i % 8) - 7)
        const y = turn === 'w'
            ? Math.abs(Math.floor((i / 8) - 7))
            : Math.floor(i / 8)
        return {x, y}
    }

    const isBlack = (i: number) => {
        const {x, y} = getXYPosition(i)
        return (x + y) % 2 === 1
    }

    const getPosition = (i: number) => {
        const {x, y} = getXYPosition(i)
        const letter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'][x]
        return `${letter}${y + 1}`
    }

    return (
        <div className="board">
            {currBoard.map((piece, i) => {
                return <div key={i} className='square'><BoardSquare piece={piece} black={isBlack(i)}
                                                                    position={getPosition(i)}/></div>
            })}
        </div>
    );
}

