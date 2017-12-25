import React, { Component } from 'react';
import Button from '../common/Button';
import {Alert, Text, StyleSheet, Image, View, TouchableOpacity, FlatList } from 'react-native';
import Spinner from '../common/Spinner';
import { connect } from 'react-redux';
import {fetchDecks} from '../../actions/decks';
import FlatListItemSeparator from '../common/FlatListItemSeparator';
import firebaseApp from '../../firebase';
import {updateSelectedDeck} from '../../actions/decks';

class Decks extends Component  {

    // deckListenerInDecks  = (deck) => {
    //     this.props.updateSelectedDeck(deck);
    // }   

    componentWillMount () {
        console.ignoredYellowBox = ['Setting a timer'];
        this.props.fetchDecks();
    }


    render () {
        
        console.log('1. decks in render: ', this.props.decks);
        const { navigate } = this.props.navigation;        
        return (
            <View style = { styles.mainContainer} >
                <Text style={styles.errorTextStyle}>
                    {this.props.server_communication_error && this.props.state.server_communication_error}
                </Text>
                <FlatList
                    data = { this.props.decks }
                    keyExtractor = {(deck) => {return deck.key}}
                    ItemSeparatorComponent = {FlatListItemSeparator}
                    renderItem = { ({item}) => { 
                        return (
                            <TouchableOpacity onPress={() => navigate("DeckDetail", {'deck': item})}>
                                <View style={styles.row}>
                                    <View style={{ 
                                        alignItems: 'center',
                                        justifyContent: 'flex-start',
                                        paddingLeft: 8,
                                        paddingRight: 16,
                                        }} 
                                    > 
                                        <Image 
                                            source={require('../../icons/redyellowcards.png')}
                                            style={{width: 60, height: 60}}
                                        />
                                    </View>
                                    <Text style={styles.textTitle} >{item && item.title}</Text>
                                    <View>
                                        <Text style={styles.cardsCountText} >{item && item.cardsCount} Cards</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                        }
                    }
                />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    mainContainer : {
        justifyContent: 'center',
        flex:1,
        margin: 10
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        height: 70,
    },
    textTitle: {
        flex: 1,
        textAlign: 'left',
        textAlignVertical: "center",
        lineHeight: 20,
        fontSize: 20,
        height: 44,
        paddingRight: 16
    },
    cardsCountText: {
        flex: 1,
        textAlign: 'right',
        textAlignVertical: "center",
        fontSize: 12,
        height: 15,
        paddingRight: 8,
        color: 'red'
    },
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red',
    }
});

const mapStateToProps = ({ decks, user, server_communication_error, isLoading }) => ({ decks, user, server_communication_error, isLoading });

// function mapStateToProps (state) {
//   return {
//     decks: state.decks,
//     user: state.user,
//     server_communication_error: state.server_communication_error,
//     isLoading: state.isLoading,
//   }
// }

function mapDispatchToProps (dispatch) {
  return {
    fetchDecks: () => dispatch(fetchDecks()),
    updateSelectedDeck: (deck) => dispatch(updateSelectedDeck(deck))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Decks);

