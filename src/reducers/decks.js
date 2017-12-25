

export function decks (state = [], action) {
    
    switch (action.type) {
        case 'FETCH_DECKS_SUCCESS':
            return action.decks;
        case 'ADD_DECK_SUCCESS':
            return [action.deck, ...state.filter((oneDeck) => {
                return oneDeck.key !== action.deck.key;
            })];
        case 'RETURN_ADDED_DECK':
            return action.deck;
        case 'UPDATE_DECK_SUCCESS':
            return [action.deck, ...state.filter((oneDeck) => {
                return oneDeck.key !== action.deck.key;
            })];

        case 'REMOVE_DECKS_SUCCESS':
            return [...state.filter((oneDeck) => {
                return oneDeck.key !== action.deckId;
            })];
        case 'VOTE_DECKS_SUCCESS':
            return [...state.filter((oneDeck) => {
                return oneDeck.key !== action.deck.key;
            }), action.deck];
        default:
            return state;
    }
}

export function deckSorterIndex (state = 0, action) {
    switch (action.type) {
        case 'DECK_SORTER_INDEX':
            return action.sorterIndex;

        default:
            return state;
    }
}

export function selectedDeck (state = null, action) {
    switch (action.type) {
        case 'SELECTED_DECK':
            return action.deck;
        case 'UPDATE_SELECTED_DECK':
            return action.deck;
        default:
            return state;
    }
}

export function decksQuery (state = null, action) {
    switch (action.type) {
        case 'QUERY_DECKS':
            return action.query;
        default:
            return state;
    }
}

