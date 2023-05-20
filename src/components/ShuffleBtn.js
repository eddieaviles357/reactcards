import React from "react";

export default function ShuffleBtn({shuffleDeck}) {
    return (
        <button className='btn-reshuffle-deck' onClick={shuffleDeck}>
            Shuffle Card
        </button>
    )
}