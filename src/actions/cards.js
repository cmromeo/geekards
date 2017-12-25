import {
    baseURL, 
    indicateServerCommunicationAction,
    errorCommunicatingWithServerAction
} from './common';

import firebaseApp from '../firebase';

export const ADD_CARD_SUCCESS = 'ADD_CARD_SUCCESS';
export const FETCH_CARDS_SUCCESS = 'FETCH_CARDS_SUCCESS';
export const SELECTED_CARD = 'SELECTED_CARD';
export const UPDATE_SELECTED_CARD = 'UPDATE_SELECTED_CARD';


export function addCard (newCard) {

    const cardsListRef = firebaseApp.database().ref(`decks/${firebaseApp.auth().currentUser.uid}/${newCard.deckId}/cards`);
    const newCardRef = cardsListRef.push();
    
    const deckRef = firebaseApp.database().ref(`decks/${firebaseApp.auth().currentUser.uid}/${newCard.deckId}`);

    return (dispatch) => {
        dispatch(indicateServerCommunicationAction(true));
        
        newCardRef.set(newCard)
        .then(() => {
            newCard['key'] = newCardRef.key
            
            incrementCardCount(deckRef)
            dispatch(indicateServerCommunicationAction(false));
            dispatch(addCardSuccessAction(newCard));
        })
        .catch((error) => {
            dispatch(indicateServerCommunicationAction(false));
            dispatch(errorCommunicatingWithServerAction(error, "Error while adding a card."))
            }
        );
    };
}

export function addCardSuccessAction(card) {
    
    return {
        type: ADD_CARD_SUCCESS,
        card
    };
}

function incrementCardCount(deckRef) {
    const deckCardsCountRef = `${deckRef}/cardsCount`
    
    deckRef.once('value')
        .then( (snapshot) => {
            let deck = snapshot.val();
            let count = deck.cardsCount;
            console.log('count is now: ', count);
            count = count + 1;
            console.log('count of cards: ', count);
            deckRef.update({'cardsCount': count});
        })
        .catch( e => {
            console.log('error is: ', e);
    });
}


export function fetchCardsSuccessAction(cards) {
    return {
        type: FETCH_CARDS_SUCCESS,
        cards
    };
}

export function fetchCards(deckId) {
    
    const cardsListRef = firebaseApp.database().ref(`decks/${firebaseApp.auth().currentUser.uid}/${deckId}/cards`);

    return (dispatch) => {
        console.log('will now fetch cards');
        dispatch(indicateServerCommunicationAction(true));

        cardsListRef.once('value')
            .then( (snapshot) => {
                let cards = [];
                snapshot.forEach(function(childSnapshot) {
                    cards.push({
                        'key': childSnapshot.key,
                        'question': childSnapshot.val().question,
                        'answer': childSnapshot.val().answer
                    });
                });

                console.log('fetched cards ', cards);
                dispatch(indicateServerCommunicationAction(false));
                dispatch(fetchCardsSuccessAction(cards));
            })
            .catch(() => {
                dispatch(indicateServerCommunicationAction(false));
                dispatch(errorCommunicatingWithServerAction(error, "Error while fetching your cards."))
            });
    };
}

export function selectCard(cards) {
    return {
        type: SELECTED_CARD,
        cards
    };
}

export function updateSelectedCard(card) {
    return {
        type: UPDATE_SELECTED_CARD,
        card
    };
}