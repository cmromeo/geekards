import { StackNavigator } from "react-navigation";
import React, { Component } from 'react';
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import {Text, View, TouchableOpacity } from 'react-native';
import HeaderTitle from '../common/HeaderTitle';


const SignedOutNavigator = StackNavigator({

  LoginForm: {
    screen: LoginForm,
    navigationOptions: {
      headerTitle:
        <HeaderTitle title={'Sign In'} />,
      headerStyle: {
        backgroundColor: '#007aff',
        shadowOpacity: 0.8,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        elevation: 2,
      },
    }
  },
  SignupForm: {
    screen: SignupForm,
    navigationOptions: ({navigation}) => ({
      headerTitle:
        <HeaderTitle title={'Sign Up'} />,
      headerStyle: {
        backgroundColor: '#007aff',
        shadowOpacity: 0.8,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        elevation: 2,
      },
      headerRight: <View />,
      headerBackTitle: null,
      headerTintColor: 'white',
      headerLeft: 
        <TouchableOpacity 
            style={{ paddingLeft: 20, paddingTop: 20, height: 44 }}
            onPress={() => navigation.goBack()}
        >
            <Text 
              style={{color: 'white'}}
            >
              &lt; Sign In
            </Text>
        </TouchableOpacity>
    })
  }
});

export default SignedOutNavigator;

