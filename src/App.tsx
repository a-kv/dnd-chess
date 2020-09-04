import React, {useEffect, useState} from 'react';
import {gameSbj, initGame, resetGame} from './Game/Game'
import {Board} from "./Board/Board";
import './scss/index.scss'

export const App = () => {
    const [board, setBoard] = useState([])
    const [isGameOver, setIsGameOver] = useState()
    const [result, setResult] = useState()
    const [turn, setTurn] = useState()
    useEffect(() => {
        initGame()
        const subscribe = gameSbj.subscribe((game: any) => {
            setBoard(game.board)
            setIsGameOver(game.isGameOver)
            setResult(game.result)
            setTurn(game.turn)
        })
        return () => subscribe.unsubscribe()
    }, [])

    return (
        <div className="app">
            {isGameOver && (
                <h2 className='verticalText'>GAME OVER
                    <button className='verticalText' onClick={resetGame}>
                        <span className='verticalText' >NEW GAME</span>
                    </button>
                </h2>
            )}
            <div className='boardContainer'><Board board={board} turn={turn}/></div>
            {result && <p className='verticalText'>{result}</p>}
        </div>
    );
}

