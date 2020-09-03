import React from 'react';
import {pieceType} from './Board';
import './../scss/square.scss'
import {DragPreviewImage, useDrag} from 'react-dnd';


type propsType = {
    piece: pieceType
    position: string
}

export const Piece = ({piece: {type, color}, position}: propsType) => {
    const [{isDragging}, drag, preview] = useDrag({
        item: {
            type: 'piece',
            id: `${position}_${type}_${color}`
        },
        collect: (monitor) => {
            return {isDragging: !!monitor.isDragging()}
        }

    })
    const pieceImg = require(`./../assets/${type}_${color}.png`)
    return (
        <>
            <DragPreviewImage connect={preview} src={pieceImg}/>
            <div className="pieceContainer" ref={drag} style={{opacity: isDragging ? 0 : 1}}>
                <img src={pieceImg} alt=""/>
            </div>
        </>
    );
}

