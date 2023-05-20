import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import Card from './Card';
import ShuffleBtn from './ShuffleBtn';
import { v4 as uuidv4 } from 'uuid';

const DECK_LIMIT = 52;
const DEG = 360;
const URL = 'https://deckofcardsapi.com/api/'
const DECK = 'deck/new/shuffle/?deck_count=1'

export default function Deck() {
    const [deckId, setDeckId] = useState('');
    const [cards, setCards] = useState([]);

    const drawCardRef = useRef();

    const drawCard = async(count) => {
        try {
            if(cards.length >= DECK_LIMIT) return alert('Error: no cards remaining!');
            const {data} = await axios.get(`${URL}deck/${deckId}/draw/?count=${count}`);
            const { id, card, rotation } = {
                id: uuidv4(), 
                card: data.cards[0], 
                rotation: Math.floor(Math.random() * DEG)
            };

            setCards( cardArr => [...cardArr, { id, card, rotation } ] );
        } catch ( err ) {
            console.error( err )
            alert('Error');
        }
    }

    const getCardDeck = async() => {
        try{
            const {data} = await axios.get(`${URL}${DECK}`);
            setDeckId( _ => data.deck_id)
        } catch(err) {
            console.error(err);
            alert('Error')
        }
    }

    const shuffleDeck = async() => {
        try {
            // shuffle deck
            await axios.get(`${URL}deck/${deckId}/shuffle/`);
            // remove all cards
            setCards( _ => []);
        } catch (err) {
            
        }
    }

    useEffect(() => {
        getCardDeck()
    }
    , [] )
    
    return (
        <div className='Deck-container'>
            <button className='btn-draw-card' ref={drawCardRef} onClick={() => drawCard(1)}>
                Draw Card
                <div>Cards Left: {DECK_LIMIT - cards.length}</div>
            </button>

            { cards.length === 0 ? null : <ShuffleBtn shuffleDeck={shuffleDeck} /> }

            <div className='Card-Container'>
            { 
                cards.map( ({id, card, rotation}) => <Card key={id} id={id} card={card} rotation={rotation}/> ) 
            }
            </div>
        </div>
    )
};