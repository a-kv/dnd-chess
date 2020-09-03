import React, {useEffect, useState} from 'react';
import {gameSbj, initGame} from './Game/Game'
import {Board} from "./Board/Board";
import './scss/index.scss'

export const App = () => {
    const [board, setBoard] = useState([])
    const [isGameOver, setIsGameOver] = useState()
    const [result, setResult] = useState()
    useEffect(() => {
        initGame()
        const subscribe = gameSbj.subscribe((game: any) => {
            setBoard(game.board)
            setIsGameOver(game.isGameOver)
            setResult(game.result)
        })
        return () => subscribe.unsubscribe()
    }, [])

    return (
        <div className="app">
            {isGameOver && (
                <h2>GAME OVER
                    <button>

                    </button>

                </h2>
            )}
            <div className='boardContainer'><Board board={board}/></div>
        </div>
    );
}

