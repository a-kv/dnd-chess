import React, {useEffect, useState} from 'react';
import './../scss/board.scss'
import {Square} from './Square'
import {move} from '../Game/Game'


type propsType = {
    promotion: any
}

const promotionPieces = ['r', 'n', 'b', 'q']

export const Promote = ({promotion: {from, to, color}}: propsType) => {

    return (
        <div className='board'>
            {promotionPieces.map((p, i) => {
                return <div className='promoteSquare' key={i}>
                    <Square black={i % 3 === 0}>
                        <div className='pieceContainer' onClick={() => move(from, to, p)}>
                            <img src={require(`../assets/${p}_${color}.png`)}
                                 alt=" "
                                 className='piece'
                            />
                        </div>
                    </Square>
                </div>
            })}
        </div>
    );
}
