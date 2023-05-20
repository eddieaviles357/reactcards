import React from 'react';

const Card = ({id, card, rotation}) => (
    <img 
        id={id} 
        className='Card' 
        src={card.images.png} 
        style={{transform: `rotate(${rotation}deg)`}}
        alt='card'
        />
)

export default Card;