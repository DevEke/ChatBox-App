import React, { Component } from 'react';
import { styles } from '../styles';
import * as Font from 'expo-font';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import user1 from '../assets/icons/user1.png';
import user2 from '../assets/icons/user2.png';
import UUIDGenerator from 'react-native-uuid-generator';
import { Bubble, GiftedChat, InputToolbar, Send, Avatar } from 'react-native-gifted-chat';
import { View, Text, StyleSheet, Platform, KeyboardAvoidingView, Image, Keyboard } from 'react-native';
import { useScrollToTop } from '@react-navigation/native';
const firebase = require('firebase');
require('firebase/firestore');



  

class ChatScreen extends Component {
    constructor() {
        super();

        this.state = {
            messages: [],
            user: {
                _id: '',
                name: ''
            }
        }

        const firebaseConfig = {
            apiKey: "AIzaSyC2q8Y5y4fHLdkzoyEx9dk4HbZXX5sOYLw",
            authDomain: "chatbox-e011d.firebaseapp.com",
            projectId: "chatbox-e011d",
            storageBucket: "chatbox-e011d.appspot.com",
            messagingSenderId: "628881560408",
            appId: "1:628881560408:web:ee683c045fa59c19f4cb2d"
          };
        
          if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
          }

          this.referenceChatMessages = firebase.firestore().collection('messages');
          
    }


    componentDidMount() {
        const { name } = this.props.route.params;
        this.referenceChatMessages = firebase.firestore().collection('messages');
        this.referenceUsers = firebase.firestore().collection('users');
        
        // this.unsubscribe = this.referenceChatMessages.onSnapshot(this.onCollectionUpdate);
        this.props.navigation.setOptions({title: name});
        this.authUnsubscribe = firebase.auth().onAuthStateChanged( async (user) => {
            if (!user) {
                await firebase.auth().signInAnonymously();
                const uid = UUIDGenerator.getRandomUUID((uuid) => {
                    return uuid;  
                });
                this.setState({
                    user: {
                        _id: uid,
                        name: name
                    },
                    messages: []
                });
                this.addUser();
            }
            this.unsubscribe = this.referenceChatMessages
                .orderBy('createdAt', 'desc')
                .onSnapshot(this.onMessagesUpdate);
        })
    }

    addUser = () => {
        const user = this.state.user;
        this.referenceUsers.add({
            _id: user._id,
            name: user.name,
        }) 
    }

    onMessagesUpdate = (querySnapshot) => {
       const messages = [];
        querySnapshot.forEach((doc) => {
            let data = doc.data();
            messages.push({
                user: data.user,
                text: data.text,
                createdAt: data.createdAt.toDate(),
                system: false
            })
        })
        this.setState({messages: messages})
    }


    addMessages = () => {
        const messages = this.state.messages[0];
        this.referenceChatMessages.add({
            text: messages.text || '',
            createdAt: messages.createdAt,
            system: false,
            user: messages.user,
        })
    }

    // This function is called when the user sends a message

    onSend(messages = []) {
        
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }), () => {
            this.addMessages();
        });
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

   

    componentWillUnmount() {
        this.authUnsubscribe();
        // this.unsubscribe();
    }


    onAuthStateChanged() {
        this.referencedUser = firebase.firestore().collection('users').where("_id", "==". this.state.user._id);
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