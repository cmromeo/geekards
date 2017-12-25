

export function cards (state = [], action) {
    
    switch (action.type) {
        case 'FETCH_CARDS_SUCCESS':
            return action.cards;
        case 'ADD_CARD_SUCCESS':
            return [action.card, ...state.filter((oneCard) => {
                return oneCard.id !== action.card.id;
            })];
        case 'REMOVE_CARD_SUCCESS':
            return [...state.filter((oneCard) => {
                return oneCard.id !== action.cardId;
            })];
        case 'UPDATE_CARD_SUCCESS':
            return [...state.filter((oneCard) => {
                return oneCard.id !== action.card.id;
            }), action.card];
        case 'VOTE_CARD_SUCCESS':
            return [...state.filter((oneCard) => {
                return oneCard.id !== action.card.id;
            }), action.card];
        default:
            return state;
    }
}

export function cardSorterIndex (state = 0, action) {
    switch (action.type) {
        case 'CARD_SORTER_INDEX':
            return action.sorterIndex;

        default:
            return state;
    }
}

export function selectedCard (state = null, action) {
    switch (action.type) {
        case 'SELECTED_CARD':
            return action.card;
        case 'UPDATE_SELECTED_CARD':
            return action.card;
        default:
            return state;
    }
}


