import React, { Component } from 'react';
import {Text, StyleSheet, Image, View, Switch, TextInput } from 'react-native';
import Spinner from '../common/Spinner';
import { connect } from 'react-redux'
import {addCard} from '../../actions/cards';
import Section from '../common/Section';
import Input from '../common/Input';
import Button from '../common/Button';
import DismissKeyboard from 'dismissKeyboard';

class AddCard extends Component  {

    state = {
        question: '',
        answer: false,
        validationError: '',
    }

    cancel = () => {
        const {goBack} = this.props.navigation;
        goBack();
    }

    saveCard = () => {
        this.setState({validationError: ''});
        if (this.state.question.trim().length === 0){
            this.setState({validationError: 'Please enter the question for this Card.'});
            return;
        }

        this.props.addCard(
            {   
                'deckId': this.props.navigation.state.params.key,
                'question': this.state.question.trim(),
                'answer': this.state.answer,
            }
        )
        this.props.navigation.goBack();
    }

    toggleAnswer = (value) => {
      this.setState({answer: value});
      console.log('answer is: ', value);
    }

    renderSaveButton() {
        if (this.props.isLoading){
            return <Spinner size='small'/>
        }
        return (
            <Button onPress={this.saveCard.bind(this)} >
                Save Card
            </Button>
        );
    }

    renderAnswer() {
        if (this.state.answer === false){
            return (
                <View style={{
                        flexDirection: 'row', 
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingBottom: 12
                }}>
                    <Text style={styles.boolLabelAnswer} >False</Text>
                    <Switch
                        style={{ paddingLeft: 8, paddingRight: 8 }}
                        onValueChange = {this.toggleAnswer}
                        value = {this.state.answer}/>
                    <Text style={styles.boolLabelNotAnswer}>True</Text>
                </View>
            )
        }else{
            return (
                <View style={{
                        flexDirection: 'row', 
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingBottom: 12
                }}>
                    <Text style={styles.boolLabelNotAnswer} >False</Text>
                    <Switch
                        style={{ paddingLeft: 8, paddingRight: 8 }}
                        onValueChange = {this.toggleAnswer}
                        value = {this.state.answer}/>
                    <Text style={styles.boolLabelAnswer}>True</Text>
                </View>
            )
        }
    }

    render () {
        
        return (
            <View behavior={'height'} style={{ paddingRight: 8, paddingLeft: 8 }}>
                <View style={{marginTop: 10, marginBottom: 10, alignItems: 'center',
                    justifyContent: 'center',}} > 
                    <Image source={require('../../icons/redyellowcards.png')} />
                </View>
                <View 
                    style={{
                        marginTop: 10, 
                        marginBottom: 20, 
                        justifyContent: 'center',
                        alignContent: 'center'
                    }}
                >
                    <Text 
                        style={styles.labelStyle}
                    >
                        Question: 
                    </Text> 
                    <TextInput
                        multiline={true}
                        numberOfLines={3}
                        underlineColorAndroid='transparent'
                        placeholder={'Enter a true or false question.'}
                        autoCorrect={false}
                        style={ styles.questionText }
                        value={ this.state.question }
                        onChangeText = {question => {
                            this.setState({ question: question })
                        }}
                    />
                </View>
                {this.renderAnswer()}
                <Text style={styles.errorTextStyle}>
                    {this.state.validationError && this.state.validationError}
                </Text>
                <Text style={styles.errorTextStyle}>
                    {this.props.card && `Saved "${this.props.card.question}"`}
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
    boolLabelAnswer: {
        fontSize: 21,
        fontWeight: "600",
    },
    boolLabelNotAnswer: {
        fontSize: 20,
        fontWeight: "400",
    },
    questionText: {
        textAlign: 'center',
        textAlignVertical: "center",
        fontSize: 21,
        fontWeight: "500",
    },
    labelStyle: {
        fontSize: 18,
        textAlign: 'center',
        paddingRight: 8,
        paddingLeft: 8
    },
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red',
    }
});




function mapStateToProps (state) {
  return {
    card: state.card,
    server_communication_error: state.server_communication_error,
    isLoading: state.isLoading,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addCard: (card) => dispatch(addCard(card)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCard)

