import React from 'react';
import './../scss/square.scss'

type propsType = {
    children: any
    black: boolean
}

export const Square = ({children, black}: propsType) => {

    const bsClass = black ? 'squareBlack' : 'squareWhite'

    return (
        <div className={bsClass}>
            {children}
        </div>
    );
}

