import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Header = (props) =>  {
    const { headerTitle } = props;
    const { textStyle, viewStyle } = styles
    return (
        <View style={ viewStyle }>
            <Text style={textStyle}>{ headerTitle }</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    viewStyle: {
        backgroundColor: '#F8F8F8',
        justifyContent: 'center',
        alignItems: 'center',
        height: 70,
        paddingTop: 20,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity:0.2,
        elevation: 2,
        position: 'relative'
    },
    textStyle: {
        fontSize: 20
    },
});

export default Header;