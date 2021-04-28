import React, { Component } from 'react';
import { styles } from '../styles';
import * as Font from 'expo-font';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import user1 from '../assets/icons/user1.png';
import user2 from '../assets/icons/user2.png';
import { Bubble, GiftedChat, InputToolbar, Send, Avatar } from 'react-native-gifted-chat';
import { View, Text, StyleSheet, Platform, KeyboardAvoidingView, Image, Keyboard } from 'react-native';

class ChatScreen extends Component {
    constructor() {
        super();

        this.state = {
            messages: []
        }
    }
    // This function is for loading my custom fonts into the app

    getFonts = () => {
        return Font.loadAsync({
            "Light": require('../assets/fonts/Sen-Regular.ttf'),
            "Bold": require('../assets/fonts/Sen-Bold.ttf')
        });
      };

    // This function is called when the user sends a message

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages)
        }));
        Keyboard.dismiss();
    }

    // This function changes the icon for the send button

    renderSend(props) {
        return (
            <Send {...props} containerStyle={{ height: 40, width: 40, justifyContent: 'center', alignItems: 'center'}}>
                <View style={{marginRight: 5, marginBottom: 5}}>
                    <MaterialCommunityIcons name="send-circle" size={32}/>
                </View>
            </Send>
        )
    }

    // This function changes the color of the senders message bubble

    renderBubble(props) {
        let { color } = this.props.route.params;
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#333',
                        borderRadius: 3,
                        padding: 5
                    },
                    left: {
                        padding: 5,
                        borderRadius: 3,
                        backgroundColor: 'white'
                    }
                }}
            />
        )
    }

    // This function customizes the input toolbar

    customInputToolbar(props) {
        return (
            <InputToolbar
                {...props}
                containerStyle={{
                    backgroundColor: "white",
                    borderTopWidth: 0,
                    paddingLeft: 10,
                    paddingRight: 5,
                    paddingVertical: 5
                }}
            />
        )
    }

    // This function sets the text content on the title bar, triggers the function to get the fonts, and sends a demo message to the user

    componentDidMount() {
        let { name } = this.props.route.params;
        this.props.navigation.setOptions({title: `${name}'s Chat Room`});
        this.getFonts();
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: `Hello ${name}. How are you liking the chat application?`,
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: user2
                    }
                },
                {
                    _id: 2,
                    text: 'React Native is in the chat',
                    createdAt: new Date(),
                    system: true
                }
            ]
        })
    }

    render() {
        let { color, name } = this.props.route.params;
        const { messages } = this.state;
        return (
            <View style={[styles.chatContainer, { backgroundColor: color}]}>
                <GiftedChat
                    showAvatarForEveryMessage={true}
                    showUserAvatar={true}
                    alwaysShowSend={true}
                    alignTop={true}
                    renderAvatarOnTop={true}
                    renderBubble={this.renderBubble.bind(this)}
                    messages={messages}
                    onSend={messages => this.onSend(messages)}
                    renderInputToolbar={this.customInputToolbar.bind(this)}
                    renderSend={this.renderSend.bind(this)}
                    user={{
                        _id: 1,
                        name: name,
                        avatar: user1
                    }}
                    textStyles={textStyles.input}
                />
                { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height"/> : null }
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
    },
    input: {
        fontFamily: 'Regular'
    }
})

export default ChatScreen;