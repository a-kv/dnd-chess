import * as Chess from 'chess.js'
import {BehaviorSubject} from 'rxjs'

// @ts-ignore
const chess = new Chess();

export const gameSbj = new BehaviorSubject({})

export const initGame = () => {
    const savedGame = localStorage.getItem('savedGame')
    if (savedGame) {
        chess.load(savedGame)
    }
    updateGame()
}
export const resetGame = () => {
    chess.reset()
    updateGame()
}

export const handleMove = (from: string, to: string) => {
    const promotions = chess.moves({verbose: true}).filter((m: any) => m.promotion)
    console.table(promotions)
    if (promotions.some((p: any) => `${p.from}:${p.to}` === `${from}:${to}`)) {
        const pendingPromotion = {from, to, color: promotions[0].color}
        updateGame(pendingPromotion)
    }
    // @ts-ignore
    const {pendingPromotion} = gameSbj.getValue()
    if (!pendingPromotion) {
        move(from, to)
    }
}

export const move = (from: string, to: string, promotion?: any) => {
    let tempMove = {from, to, promotion}
    if (promotion) {
        tempMove.promotion = promotion
    }
    const legalMove = chess.move(tempMove)
    if (legalMove) {
        updateGame()
    }
}

export const updateGame = (pendingPromotion?: any) => {
    const isGameOver = chess.game_over()
    const newGame = {
        board: chess.board(),
        pendingPromotion,
        isGameOver,
        turn: chess.turn(),
        result: isGameOver ? getGameResult() : null
    }
    localStorage.setItem('savedGame', chess.fen())
    gameSbj.next(newGame)
}

export const getGameResult = () => {
    if (chess.in_checkmate()) {
        const winner = chess.turn() === 'w' ? 'BLACK' : 'WHITE'
        return ` CHECKMATE - WINNER - ${winner}`
    } else if (chess.in_draw()) {
        let reason = '50 - MOVES - RULE'
        if (chess.in_stalemate()) {
            reason = 'STALEMATE'
        } else if (chess.in_threefold_repetition()) {
            reason = 'REPETITION'
        } else if (chess.insufficient_material()) {
            reason = 'INSUFFICIENT MATERIAL'
        }
        return `DRAW - ${reason}`
    } else {
        return `UNKNOWN REASON`
    }
}
