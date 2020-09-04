import React, {useEffect, useState} from 'react';
import {Square} from './Square'
import {Piece} from './Piese';
import {pieceType} from './Board';
import {useDrop} from 'react-dnd';
import {handleMove, gameSbj} from '../Game/Game'
import {Promote} from './Promote'

type propsType = {
    piece: pieceType
    black: boolean
    position: string
}

export const BoardSquare = ({piece, black, position}: propsType) => {

    const [promotion, setPromotion] = useState(null)

    const [, drop] = useDrop({
        accept: 'piece',
        drop: (item: pieceType) => {
            // return console.log(item)
            const [fromPosition] = item.id.split('_')
            handleMove(fromPosition, position)
        }
    })
    useEffect(() => {
        // @ts-ignore
        const subscribe = gameSbj.subscribe(({pendingPromotion}) => {
            pendingPromotion && pendingPromotion.to === position ? setPromotion(pendingPromotion) : setPromotion(null)
        })
        return () => subscribe.unsubscribe()
    }, [position])
    return (
        <div className="board" ref={drop}>
            <Square black={black}>
                {promotion
                    ? (<Promote promotion={promotion}/>)
                    : piece
                        ? (<Piece piece={piece} position={position}/>)
                        : null}

            </Square>
        </div>
    );
}

