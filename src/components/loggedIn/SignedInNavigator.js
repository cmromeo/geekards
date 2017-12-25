import { StackNavigator } from "react-navigation";
import React, { Component } from 'react';
import Decks from './Decks';
import DeckDetail from './DeckDetail';
import AddDeck from './AddDeck';
import AddCard from './AddCard';
import Card from './Card';
import {Text, View, TouchableOpacity } from 'react-native';
import HeaderTitle from '../common/HeaderTitle';
import * as firebase from 'firebase';
import {addDeck} from '../../actions/decks';
import { connect } from 'react-redux';

const SignedInNavigator = StackNavigator({

    Decks: {
        screen: Decks,
        navigationOptions: ({navigation}) => ({
        headerTitle:
            <HeaderTitle title={'Decks'} />,
        headerStyle: {
            backgroundColor: '#007aff',
            shadowOpacity: 0.8,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            elevation: 2,
        },
        headerRight: 
            <TouchableOpacity 
                style={{ paddingRight: 20, paddingTop: 10, height: 44 }}
                onPress={() => navigation.navigate('AddDeck')}
            >
                <Text 
                style={{color: 'white', fontSize: 30}}
                >
                    +
                </Text>
            </TouchableOpacity>,
        headerLeft: 
            <TouchableOpacity 
                style={{ paddingLeft: 20, paddingTop: 20, height: 44 }}
                onPress={() => firebase.auth().signOut()}
            >
                <Text 
                style={{color: 'white'}}
                >
                    Sign Out
                </Text>
            </TouchableOpacity>
        })
    },
    AddDeck: {
        screen: AddDeck,
        navigationOptions: ({navigation}) => ({
        headerTitle:
            <HeaderTitle title={'New Deck'} />,
        headerStyle: {
            backgroundColor: '#007aff',
            shadowOpacity: 0.8,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            elevation: 2,
        },
        headerRight: 
            <View></View>,
        headerLeft: 
            <TouchableOpacity 
                style={{ paddingLeft: 20, paddingTop: 20, height: 44 }}
                onPress={() => navigation.goBack()}
            >
                <Text 
                    style={{color: 'white'}}
                >
                    &lt; Decks
                </Text>
            </TouchableOpacity>
        })
    },
    DeckDetail: {
        screen: DeckDetail,
        navigationOptions: ({navigation}) => ({
        headerTitle:
            <HeaderTitle title={'Deck Detail'} />,
        headerStyle: {
            backgroundColor: '#007aff',
            shadowOpacity: 0.8,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            elevation: 2,
        },
        headerRight: 
            <View></View>,
        headerLeft: 
            <TouchableOpacity 
                style={{ paddingLeft: 20, paddingTop: 20, height: 44 }}
                onPress={() => navigation.goBack()}
            >
                <Text 
                    style={{color: 'white'}}
                >
                    &lt; Decks
                </Text>
            </TouchableOpacity>
        })
    },
    AddCard: {
        screen: AddCard,
        navigationOptions: ({navigation}) => ({
        headerTitle:
            <HeaderTitle title={'New Card'} />,
        headerStyle: {
            backgroundColor: '#007aff',
            shadowOpacity: 0.8,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            elevation: 2,
        },
        headerRight: 
            <View></View>,
        headerLeft: 
            <TouchableOpacity 
                style={{ paddingLeft: 20, paddingTop: 20, height: 44 }}
                onPress={() => navigation.goBack()}
            >
                <Text 
                    style={{color: 'white'}}
                >
                    &lt; Deck
                </Text>
            </TouchableOpacity>
        })
    },
    Card: {
        screen: Card,
        navigationOptions: ({navigation}) => ({
        headerTitle:
            <HeaderTitle title={'Quiz'} />,
        headerStyle: {
            backgroundColor: '#007aff',
            shadowOpacity: 0.8,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            elevation: 2,
        },
        headerRight: 
            <View></View>,
        headerLeft: 
            <TouchableOpacity 
                style={{ paddingLeft: 20, paddingTop: 20, height: 44 }}
                onPress={() => navigation.goBack()}
            >
                <Text 
                    style={{color: 'white'}}
                >
                    &lt; Deck
                </Text>
            </TouchableOpacity>
        })
    },
});


function mapStateToProps (state) {
  return {
    user: state.user,
    server_communication_error: state.server_communication_error,
    isLoading: state.isLoading,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addDeck: (token) => dispatch(addDeck(token)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignedInNavigator)

