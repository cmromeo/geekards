import React from 'react';
import { View, StyleSheet } from 'react-native';

const Section = (props) =>  {
    const { container } = styles
    return (
        <View style={container}>
            {props.children}
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative',
    height: 70
  },
});

export default Section;