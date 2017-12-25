import React, { Component } from 'react';
import Button from '../common/Button';
import { Text, StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import firebaseApp from '../../firebase';
import {updateSelectedDeck} from '../../actions/decks';
import { connect } from 'react-redux';

class DeckDetail extends Component  {

    state = {
        deck: this.props.navigation.state.params.deck
    }

    turnOnDeckListener  = (deck) => {
        const deckRef = firebaseApp.database().ref(`decks/${firebaseApp.auth().currentUser.uid}/${deck.key}/cardsCount`);
        deckRef.on('value', (snapshot) => {
            deck.cardsCount = snapshot.val();
            console.log('cards count changed: ', deck.cardsCount);
            //rerender the component
            this.setState({deck: deck});
            
            //inform the parent component
            this.props.updateSelectedDeck(deck);
            //this.props.navigation.state.params.deckListenerInDecks(deck);
        });
    }    
    

    componentWillMount() {
        //let deck = {'key': this.props.navigation.state.params.key, 'title': this.props.navigation.state.params.title, 'cardsCount': this.props.navigation.state.params.cardsCount };
        //let deck = {'key': this.props.navigation.state.params.key, 'title': this.props.navigation.state.params.title, 'cardsCount': this.props.navigation.state.params.cardsCount };
        //this.setState({deck: deck});

        this.turnOnDeckListener(this.state.deck);
    }

    render () {
        console.log('render func');

        let { deck } = this.state;

        const { navigate } = this.props.navigation;
        
        const cardsCount = `Cards: ${deck.cardsCount}`

        return (
            <View style = { styles.mainContainer} >
                <View style={{flex: 1}}>
                    <Text style={ styles.titleText } numberOfLines = {2} >
                        { deck.title }                
                    </Text>
                    <Text style={ styles.cardText }>
                        { cardsCount }
                    </Text>
                </View>
                <View style={styles.buttonView}>
                    <View style={{paddingBottom: 20}}>
                        <TouchableOpacity 
                            onPress = { () => navigate("AddCard", deck ) }
                            style = { styles.buttonStyle }
                        >
                            <Text style={ styles.buttonTextStyle } 
                            >
                                Add Card
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity 
                            onPress = { () => navigate("Card", deck) }
                            style = { styles.buttonStyle }
                        >
                            <Text style={ styles.buttonTextStyle } 
                            >
                                Try Quiz
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    mainContainer : {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex:1,
        paddingTop: 20,
        paddingBottom: 10
    },
    titleText: {
        textAlign: 'center',
        textAlignVertical: "center",
        fontSize: 30,
        fontWeight: "600",
    },
    cardText: {
        width: 120,
        textAlign: 'center',
        textAlignVertical: "center",
        lineHeight: 21,
        fontSize: 21,
        height: 44
    },
    addCard: {
        width: 120,
        alignSelf: 'stretch',
        backgroundColor: 'transparent',
        paddingBottom: 20
    },
    quiz: {
        width: 120,
        alignSelf: 'stretch',
        backgroundColor: 'transparent',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 20
    },
    buttonView: {
        flex: 2,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    buttonTextStyle: {
        alignSelf: 'center',
        color: '#007aff',
        fontSize: 18, 
        fontWeight: '600',
        paddingTop: 10, 
        paddingBottom: 10,
        textAlign: 'center',
        textAlignVertical: "center",
    },
    buttonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#007aff',
        width: 120,
        height: 60,
    }
});

function mapStateToProps (state) {
    return {
    }
  }
  
  function mapDispatchToProps (dispatch) {
    return {
      updateSelectedDeck: (deck) => dispatch(updateSelectedDeck(deck))
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(DeckDetail);

