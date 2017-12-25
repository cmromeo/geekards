import React, { Component } from 'react';
import {Text, StyleSheet, Image, View } from 'react-native';
import Spinner from '../common/Spinner';
import { connect } from 'react-redux'
import {addDeck} from '../../actions/decks';
import Section from '../common/Section';
import Input from '../common/Input';
import Button from '../common/Button';

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
        this.props.addDeck({ 'title': this.state.deck, 'cardsCount': 0 })
        this.props.navigation.goBack();
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
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddDeck)

