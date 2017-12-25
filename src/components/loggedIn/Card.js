import React, { Component,  } from 'react';
import Button from '../common/Button';
import { AsyncStorage, Alert, Text, StyleSheet, Image, View, TouchableOpacity, Easing } from 'react-native';
import Spinner from '../common/Spinner';
import { connect } from 'react-redux';
import {fetchCards} from '../../actions/cards';
import moment from 'moment';
 
import FlipView from 'react-native-flip-view-next';
//animation: https://codedaily.io/screencasts/12/Create-a-Flip-Card-Animation-with-React-Native

class Card extends Component  {

    state = {
        activeCardIndex: 0,
        correctAnswers: 0,
        showScore: false,
        correct: false,
        isFlipped: false
    }


    renderScoreAndNext () {
        let activeCard = this.props.cards[this.state.activeCardIndex];

        let message = '';
        if (this.state.correct) {
            message = `You're right! Your score is now ${this.state.correctAnswers}`;
        }else{
            message = `Sorry, you're wrong. Your score is still ${this.state.correctAnswers}`;
        }

        return (
            <View 
                style={{
                    paddingTop: 30,
                    paddingBottom: 20,
                    justifyContent: 'flex-start', 
                    alignItems: 'center'
                }}
            >
                <View>
                    <Text style={{
                        textAlign: 'center', 
                        fontWeight: '500', 
                        fontSize: 21 }}
                    >
                        {message}
                    </Text>
                </View>
            
                <View style={{paddingTop: 20}}>
                    <TouchableOpacity 
                        onPress={() => 
                            this.setState({
                            activeCardIndex: this.state.activeCardIndex + 1, 
                            showScore: false
                        })}
                        style = { styles.peekButtonStyle }
                    >
                        <Text style={ styles.buttonTextStyle } >
                            Next Question
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    renderReplyButtonsAndPeek () {
        let activeCard = this.props.cards[this.state.activeCardIndex];

        return (
            <View>
                <View 
                    style={{
                        paddingTop: 10,
                        paddingBottom: 20,
                        flexDirection: 'row', 
                        justifyContent: 'space-around', 
                        alignItems: 'center'
                    }}
                >
                    <View style={{paddingLeft: 10, paddingRight: 10}}>
                        <TouchableOpacity 
                            onPress={() => {
                                if (activeCard.answer === true){
                                    this.setState({correct: true});
                                    this.setState({correctAnswers: this.state.correctAnswers + 1})
                                }else{
                                    this.setState({correct: false});
                                }
                                this.setState({showScore: true})
                            }}
                            style = { styles.buttonStyle }
                        >
                            <Text style={ styles.buttonTextStyle } >
                                Agree
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{paddingLeft: 10, paddingRight: 10}}>
                        <TouchableOpacity 
                            onPress={() => {
                                if (activeCard.answer === false){
                                    this.setState({correct: true, correctAnswers: this.state.correctAnswers + 1})
                                }else{
                                    this.setState({correct: false});
                                }
                                this.setState({showScore: true})
                            }}
                            style = { styles.buttonStyle } >
                            <Text style={ styles.buttonTextStyle } >
                                Disagree
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View
                    style={{
                        paddingTop: 10,
                        paddingBottom: 20,
                        justifyContent: 'center', 
                        alignItems: 'center'
                    }}
                >
                    <TouchableOpacity 
                        style = { styles.peekButtonStyle }
                        onPress={() => {
                            this.setState({correct: false});
                            this._flip();
                        }} 
                    >
                        <Text style={ [styles.buttonTextStyle, {textDecorationLine: 'underline'}] } >
                            Peek
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    componentWillMount () {
        console.ignoredYellowBox = ['Setting a timer'];
        this.props.fetchCards(this.props.navigation.state.params.key);

    }



    render () {

        if (this.state.activeCardIndex === this.props.cards.length){
            const finalScore = `Your score is: ${this.state.correctAnswers} out of ${this.props.cards.length}`
            const now = moment().toString();
            console.log('now is: ', now);
            console.log('now type ', typeof now);
            AsyncStorage.setItem('lastQuiz', now);
            return(
                <View style={styles.mainContainer}>
                    <View style={{marginTop: 30, marginBottom: 20, alignItems: 'center',
                        justifyContent: 'center'}} > 
                        <Image source={require('../../icons/redyellowcards.png')} />
                    </View>
                    <View style={{paddingTop: 40, paddingBottom: 20, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize: 21, fontWeight: '600', textAlign: 'center'}}>You have finished this deck. Congratulations!</Text>
                        <Text style={{fontSize: 21, fontWeight: '500', textAlign: 'center'}}>{finalScore}</Text>
                    </View>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity 
                            style = { styles.peekButtonStyle }
                            onPress={() => this.props.navigation.goBack()} 
                        >
                            <Text style={ styles.buttonTextStyle } >
                                Back to Deck
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity 
                            style = { styles.peekButtonStyle }
                            onPress={() => {
                                this.setState({
                                    activeCardIndex: 0,
                                    correctAnswers: 0,
                                    showScore: false,
                                    correct: false,
                                    isFlipped: false
                                });
                            }} 
                        >
                            <Text style={ styles.buttonTextStyle } >
                                Restart Quiz
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>  
            );
        }else{
            return (
                <View style={styles.mainContainer}>
                    <View style={{marginTop: 30, marginBottom: 20, alignItems: 'center',
                        justifyContent: 'center',}} > 
                        <Image source={require('../../icons/redyellowcards.png')} />
                    </View>

                    <FlipView style={{flex: 1}}
                        front={this._renderFront()}
                        back={this._renderBack()}
                        isFlipped={this.state.isFlipped}
                        onFlipped={(val) => {console.log('Flipped: ' + val);}}
                        flipAxis="y"
                        flipEasing={Easing.out(Easing.ease)}
                        flipDuration={500}
                        perspective={1000}/>
                </View>
            );
        }
    }

    _renderFront = () => {

        let activeCard = this.props.cards[this.state.activeCardIndex];

        let question = '';
        if (activeCard) {
            question = `Question: ${activeCard.question}`
        }

        return (
            
            <View style={{ flex: 1, backgroundColor: 'aliceblue', justifyContent: 'center', alignItems: 'center'}} >
                <View style={{paddingLeft: 8, paddingBottom: 24}}>
                    <Text style={{fontSize: 14}}>{`${this.state.activeCardIndex+1}/${this.props.cards.length}`}</Text>
                </View>
                <View style={{alignItems: 'center', paddingBottom: 24}}>
                    <Text style={{fontSize: 21, fontWeight: '500', textAlign: 'center'}}>{ question }</Text>
                </View>
                {this.state.showScore === true ? this.renderScoreAndNext() : this.renderReplyButtonsAndPeek()}
            </View>
        );
    };
        _renderBack = () => {
        
        let activeCard = this.props.cards[this.state.activeCardIndex];

        let question = '';
        if (activeCard) {
            question = `Question: ${activeCard.question}`
        }

        let answer = '';
        if (activeCard) {
            answer = `Answer: ${activeCard.answer}`
        }

        return (
        <View style={{
            flex: 1, 
            backgroundColor: '#1565C0', 
            justifyContent: 'center', 
            alignItems: 'center',
            paddingLeft: 16,
            paddingRight: 16
            }} >
            <View>
                <Text style={{
                    textAlign: 'center', 
                    fontWeight: '500', 
                    fontSize: 20,
                    color: 'white',
                    }}
                > { question }
                </Text>
                <Text style={{
                    paddingTop: 20,
                    textAlign: 'center', 
                    fontWeight: '600', 
                    fontSize: 21,
                    color: 'white'
                    }}
                >
                    { answer }
                </Text>
            </View>
        
            <View style={{paddingTop: 20}}>
                <TouchableOpacity 
                    onPress={() => {
                        this.setState({
                            activeCardIndex: this.state.activeCardIndex + 1, 
                            showScore: false                                   
                        });
                            this._flip();
                    }}
                    style = { styles.peekButtonStyle }
                >
                    <Text style={ [styles.buttonTextStyle, {color: 'white', textDecorationLine: 'underline'}] } 
                    >
                        Next Question
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
        );
    };

    _flip = () => {
        this.setState({isFlipped: !this.state.isFlipped});
    };
}

const styles = StyleSheet.create({
    mainContainer : {
        justifyContent: 'flex-start',
        flex:1,
        margin: 10
    },
    buttonTextStyle: {
        alignSelf: 'center',
        color: '#007aff',
        fontSize: 18, 
        fontWeight: '600',
        paddingTop: 10, 
        paddingBottom: 10,
        textAlign: 'center',
        textAlignVertical: 'center',
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
    },
    peekButtonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderRadius: 5,
        borderWidth: 1,
        width: 120,
        height: 60,
    },
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red',
    }
});

function mapStateToProps (state) {
  return {
    cards: state.cards,
    user: state.user,
    server_communication_error: state.server_communication_error,
    isLoading: state.isLoading,
  }
}

export default connect(
  mapStateToProps,
  {fetchCards}
)(Card);

