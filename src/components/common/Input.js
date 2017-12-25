import React from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';


const Input = ({ label, value, style, onChangeText, placeholder, secureTextEntry  }) =>  {
    
    const { inputStyle, labelStyle, containerStyle } = styles;
    return (
        <View style = {containerStyle} >
            <Text style={labelStyle} >{ label }</Text> 
            <TextInput
                underlineColorAndroid='transparent'
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                autoCorrect={false}
                autoCapitalize={"none"}
                style={ styles.inputStyle }
                value={ value }
                onChangeText={onChangeText}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 2
    },
    labelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1
    },
    containerStyle: {
        height: 40,
        flex: 1, 
        flexDirection: 'row',
        alignItems: 'center'
    }
});

export default Input;