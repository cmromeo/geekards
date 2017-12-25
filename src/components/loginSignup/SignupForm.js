import React, { Component } from 'react';
import Button from '../common/Button';
import Container from '../common/Container';
import Section from '../common/Section';
import Input from '../common/Input';
import {Text, StyleSheet, Image, View} from 'react-native';
import Spinner from '../common/Spinner';
import { connect } from 'react-redux'
import {registerUser} from '../../actions/users';

class SignupForm extends Component  {

    state = {
        email: '',
        password: '',
        confirmPassword: '',
        validationError: '',
    };

    onButtonPress() {
        const {email, password, confirmPassword} = this.state;
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

        if (confirmPassword.length === 0){
            this.setState({validationError: 'Please confirm your password.'});
            return;
        }
        if (confirmPassword !== password){
            this.setState({validationError: 'Passwords do not match!'});
            return;
        }
        console.log('email: ', email);
        console.log('password: ', password);
        
        this.props.registerUser(email, password);
    }

    renderButton() {
        if (this.props.isLoading){
            return <Spinner size='small'/>
        }
        return (
            <Button onPress={this.onButtonPress.bind(this)} >
                Sign up
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
                            this.setState({ password: trimmedPassword });
                        }}
                        secureTextEntry
                    />
                </Section>
                <Section>
                    <Input
                        placeholder='confirm password'
                        label='Confirm Password'
                        value={ this.state.confirmPassword } 
                        onChangeText={confirmPassword => {
                            const trimmedConfirmPassword = confirmPassword.trim();
                            this.setState({ confirmPassword: trimmedConfirmPassword })
                        }}
                        secureTextEntry
                    />
                </Section>
                <Text style={styles.errorTextStyle}>
                    {this.state.validationError && this.state.validationError}
                </Text>
                <View style={{height: 70, paddingTop: 20}} >
                    {this.renderButton ()}
                </View>
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
    registerUser: (email, password) => dispatch(registerUser(email, password))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupForm)

