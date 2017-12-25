import React, { Component } from 'react';
import {Text, StyleSheet, Image, View } from 'react-native';
import Spinner from '../common/Spinner';
import { connect } from 'react-redux'

import Section from '../common/Section';
import Input from '../common/Input';
import Button from '../common/Button';
import firebaseApp from '../../firebase';
import {indicateServerCommunicationAction, errorCommunicatingWithServerAction} from '../../actions/common';
import {addDeckSuccessAction, returnAddedDeckAction} from '../../actions/decks';

class AddDeck extends Component  {

    state = {
        deck: '',
        validationError: '',
    }

    cancel = () => {
        const {goBack} = this.props.navigation;
        goBack();
    }

    saveDeck = () => {
        this.setState({validationError: ''});
        if (this.state.deck.trim().length === 0){
            this.setState({validationError: 'Please enter the title of the Deck.'});
            return;
        }
        this.props.indicateServerCommunicationAction(true);

        const decksListRef = firebaseApp.database().ref(`decks/${firebaseApp.auth().currentUser.uid}`);
        const newDeckRef = decksListRef.push();
        const newDeck = { 'title': this.state.deck, 'cardsCount': 0, 'key': newDeckRef.key };
        newDeckRef.set(newDeck)
        .then(() => {          
            
            this.props.indicateServerCommunicationAction(false);
            this.props.addDeckSuccessAction(newDeck);
            this.props.returnAddedDeckAction(newDeck);
            
            this.props.navigation.navigate("DeckDetail", {'deck': newDeck, 'go_back_key': this.props.navigation.state.key});

        })
        .catch((error) => {
            dispatch(indicateServerCommunicationAction(false));
            dispatch(errorCommunicatingWithServerAction(error, "Error while adding a deck."))
            }
        );
    }

    renderSaveButton() {
        if (this.props.isLoading){
            return <Spinner size='small'/>
        }
        return (
            <Button onPress={this.saveDeck.bind(this)} >
                Save Deck
            </Button>
        );
    }

    render () {

        if (this.props.deck){
            console.log('deck is now in render ', this.props.deck);
        }
        
        return (
            <View >
                <View style={{marginTop: 40, marginBottom: 20, alignItems: 'center',
                    justifyContent: 'center',}} > 
                    <Image source={require('../../icons/redyellowcards.png')} />
                </View>
                <Section>
                    <Input 
                        placeholder='title of deck'
                        label='Title'
                        value={ this.state.deck } 
                        onChangeText={deck => {
                            this.setState({ deck: deck })
                        }}
                    />
                </Section>
                <Text style={styles.errorTextStyle}>
                    {this.state.validationError && this.state.validationError}
                </Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}} >
                    <Button onPress={this.cancel.bind(this)} >
                        Cancel
                    </Button>
                    {this.renderSaveButton()}
                </View>
                
                
            </View>
        );
    }
};

const styles = StyleSheet.create({

    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red',
    }
});


function mapStateToProps (state) {
  return {
    deck: state.deck,
    server_communication_error: state.server_communication_error,
    isLoading: state.isLoading,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addDeck: (deck) => dispatch(addDeck(deck)),
    indicateServerCommunicationAction: (isLoading) => dispatch(indicateServerCommunicationAction(isLoading)),
    errorCommunicatingWithServerAction: (error, message) => dispatch(errorCommunicatingWithServerAction(error, message)),
    addDeckSuccessAction: (deck) => dispatch(addDeckSuccessAction(deck)),
    returnAddedDeckAction: (deck) => dispatch(returnAddedDeckAction(deck)),
    

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddDeck)

