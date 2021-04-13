import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { styles } from '../styles';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { render } from 'react-dom';
import { View, Text, StyleSheet } from 'react-native';

class ChatScreen extends Component {

    // This function is for loading my custom fonts into the app

    getFonts = () => {
        return Font.loadAsync({
          'Regular': require('../assets/fonts/Quicksand-Regular.ttf'),
          'Bold': require('../assets/fonts/Quicksand-Bold.ttf')
        });
      };

    // This function sets the text content on the title bar and triggers the function to get the fonts

    componentDidMount() {
        let { name } = this.props.route.params;
        this.props.navigation.setOptions({title: `${name}'s Chat Room`});
        this.getFonts();
    }

    render() {
        let { color } = this.props.route.params;
        return (
            <View style={[styles.container, {backgroundColor: color, justifyContent: 'center'}]}>
                <Text style={textStyles.chatTitle}>This is the Chat Screen</Text>
            </View>
        )
    }
}

const textStyles = StyleSheet.create({
    chatTitle: {
        fontFamily: 'Bold',
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'white',
        borderRadius: 15,
        fontSize: 16,
        color: '#999'
    }
})

export default ChatScreen;