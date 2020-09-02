import React from 'react';
import './../scss/board.scss'

type propsType = {
    piece: number
}

export const BoardSquare = ({piece}: propsType) => {
    return (
        <div className="Board">
        </div>
    );
}

