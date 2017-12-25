import { combineReducers } from 'redux';
import { dataIsLoading, serverCommunicationError } from './common';
import { decks, selectedDeck } from './decks';
import { cards, cardSorterIndex, selectedCard } from './cards';

const rootReducer =  combineReducers({
    dataIsLoading,
    serverCommunicationError,
    cardSorterIndex,
    decks,
    cards,
    selectedDeck,
});

export default rootReducer;