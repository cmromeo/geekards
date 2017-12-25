import {
    baseURL, 
    indicateServerCommunicationAction,
    errorCommunicatingWithServerAction
} from './common';

import firebaseApp from '../firebase';

export const ADD_DECK_SUCCESS = 'ADD_DECK_SUCCESS';
export const FETCH_DECKS_SUCCESS = 'FETCH_DECKS_SUCCESS';
export const SELECTED_DECK = 'SELECTED_DECK';
export const UPDATE_DECK_SUCCESS = 'UPDATE_DECK_SUCCESS';
export const RETURN_ADDED_DECK = 'RETURN_ADDED_DECK';


export function addDeck (newDeck) {
    const decksListRef = firebaseApp.database().ref(`decks/${firebaseApp.auth().currentUser.uid}`);
    
    const newDeckRef = decksListRef.push();
    
    return (dispatch) => {
        dispatch(indicateServerCommunicationAction(true));
        
        newDeckRef.set(newDeck)
        .then(() => {
            newDeck['key'] = newDeckRef.key
            
            dispatch(indicateServerCommunicationAction(false));
            dispatch(addDeckSuccessAction(newDeck));
            dispatch(returnAddedDeckAction(deck));
        })
        .catch((error) => {
            dispatch(indicateServerCommunicationAction(false));
            dispatch(errorCommunicatingWithServerAction(error, "Error while adding a deck."))
            }
        );
    };
}

export function addDeckSuccessAction(deck) {
    
    return {
        type: ADD_DECK_SUCCESS,
        deck
    };
}

export function returnAddedDeckAction(deck) {
    
    return {
        type: RETURN_ADDED_DECK,
        deck
    };
}


export function fetchDecksSuccessAction(decks) {
    return {
        type: FETCH_DECKS_SUCCESS,
        decks
    };
}

export function fetchDecks() {
    const decksListRef = firebaseApp.database().ref(`decks/${firebaseApp.auth().currentUser.uid}`);
    return (dispatch) => {
    
        dispatch(indicateServerCommunicationAction(true));
        let decks = [];
        decksListRef.once('value')
            .then( (snapshot) => {
                
                snapshot.forEach(function(childSnapshot) {
                    let deck = {
                        'key': childSnapshot.key,
                        'title': childSnapshot.val().title,
                        'cardsCount': childSnapshot.val().cardsCount
                    }
                    decks.push(deck);
                });
                
                dispatch(indicateServerCommunicationAction(false));
                dispatch(fetchDecksSuccessAction(decks));

            })
            .catch(() => {
                dispatch(indicateServerCommunicationAction(false));
                dispatch(errorCommunicatingWithServerAction(error, "Error while fetching your decks."))
            });
    };
}

export function updateSelectedDeck(deck) {
    return {
        type: ADD_DECK_SUCCESS,
        deck
    };
}

export function selectDeck(decks) {
    return {
        type: SELECTED_DECK,
        decks
    };
}