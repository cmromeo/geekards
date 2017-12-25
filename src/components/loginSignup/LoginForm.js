import React, { Component } from 'react';
import Button from '../common/Button';
import Container from '../common/Container';
import Section from '../common/Section';
import Input from '../common/Input';
import {Text, StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import Spinner from '../common/Spinner';
import { connect } from 'react-redux'
import {loginUser} from '../../actions/users';
import SignupForm from './SignupForm';

class LoginForm extends Component  {

    state = {
        email: '',
        password: '',
        validationError: '',
    };

    onButtonPress() {
        const {email, password} = this.state;
        this.setState({validationError: ''});
        
        const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;  
        
        if (email.length === 0 || email.match(mailformat) === false){

            
            this.setState({validationError: 'Please enter a valid email.'});
            return;
        }

        if (password.length === 0){
            this.setState({validationError: 'Please enter your password.'});
            return;
        }

        this.props.loginUser(email, password);
    }
    

    renderLoginButton() {
        if (this.props.isLoading){
            return <Spinner size='small'/>
        }
        return (
            <Button onPress={this.onButtonPress.bind(this)} >
                Sign In
            </Button>
        );
    }

    renderSignupButton(navigate) {
        return (
            <View style={{height: 70, paddingTop: 20}} >
                <TouchableOpacity 
                    buttonStyle={ styles.buttonStyle }
                    onPress={() => navigate("SignupForm")}
                >
                    <Text 
                        style={ styles.buttonTextStyle } 
                    >
                        Sign Up
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    render () {
        const { navigate } = this.props.navigation;
        return (
            <View >
                <View style={{marginTop: 40, marginBottom: 20, alignItems: 'center',
                    justifyContent: 'center',}} > 
                    <Image source={require('../../icons/redyellowcards.png')} />
                </View>
                <Section>
                    <Input 
                        placeholder='me@gmail.com'
                        label='Email'
                        value={ this.state.email } 
                        onChangeText={email => {
                            const trimmedEmail = email.trim();
                            this.setState({ email: trimmedEmail })
                        }}
                    />
                </Section>
                <Section>
                    <Input
                        placeholder='password'
                        label='Password'
                        value={ this.state.password } 
                        onChangeText={password => {
                            const trimmedPassword = password.trim();
                            this.setState({ password: trimmedPassword })
                        }}
                        secureTextEntry
                    />
                </Section>
                <Text style={styles.errorTextStyle}>
                    {this.state.validationError && this.state.validationError}
                </Text>
                <View style={{height: 70, paddingTop: 20}} >
                    {this.renderLoginButton ()}
                </View>
                { (this.props.isLoading === false || this.props.isLoading === undefined) && this.renderSignupButton (navigate)}
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red',
    },
    buttonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: 'transparent',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 20
    },
    buttonTextStyle: {
        alignSelf: 'center',
        color: '#909090',
        fontSize: 18, 
        fontWeight: '700',
        paddingTop: 10, 
        paddingBottom: 10
    }
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
    loginUser: (email, password) => dispatch(loginUser(email, password))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm)

