import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const HeaderTitle = ({title}) =>  {
    const { titleStyle } = styles
    return (
        <Text style={titleStyle}>{ title }</Text>
    );
};

const styles = StyleSheet.create({
    titleStyle: {
        paddingTop: 20,
        color:'#dde',
        alignSelf:'center',
        fontSize:18,
        fontWeight: '300',
    }
});

export default HeaderTitle;
