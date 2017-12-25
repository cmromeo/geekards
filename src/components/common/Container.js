import React from 'react';
import { View, StyleSheet } from 'react-native';

const Container = (props) =>  {
    //const { container } = styles
    return (
        <View style={styles.container} >
            {props.children}
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1, 
    borderRadius: 2, 
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5, 
    marginRight: 5, 
    marginTop: 100, 
  }
});

export default Container;