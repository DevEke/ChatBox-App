import React, { Component } from 'react';
import { styles } from '../styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import user1 from '../assets/icons/user1.png';
import user2 from '../assets/icons/user2.png';
import { Bubble, GiftedChat, InputToolbar, Send, Avatar } from 'react-native-gifted-chat';
import { View, Text, StyleSheet, Platform, KeyboardAvoidingView, Image, Keyboard } from 'react-native';
const firebase = require('firebase');
require('firebase/firestore');
require('firebase/auth');



  

class ChatScreen extends Component {
    constructor() {
        super();

    // Initialize state 
        this.state = {
            messages: [],
            user: {
                uid: '',
                name: ''
            }
        }
    // firebase/firestore configurations
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
          this.referenceUsersList = firebase.firestore().collection('users');
          
    }

// App Component Mounted
    componentDidMount() {

    // Displays name from the login screen
        const { name } = this.props.route.params;
        this.props.navigation.setOptions({title: name});

    // References messages collection in firebase firestore
        this.referenceChatMessages = firebase.firestore().collection('messages');

    // Firebase Authentication
        this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                firebase.auth().signInAnonymously();
                this.setState({
                    user: {
                        uid: user.uid,
                        name: name
                    },
                    messages: []
                });
                this.addUser();
            }
            this.unsubscribe = this.referenceChatMessages.orderBy('createdAt', 'desc').onSnapshot(this.onMessagesUpdate);
        })
    }

// References active user list 
    onAuthStateChanged() {
        this.referencedUser = firebase.firestore().collection('users').where("uid", "==". this.state.user.uid);
    }

// Updates state with messages from the firebase firestore
    onMessagesUpdate = (querySnapshot) => {
       const messages = [];
        querySnapshot.forEach((doc) => {
            let data = doc.data();
            messages.push({
                uid: data.uid,
                text: data.text,
                createdAt: data.createdAt.toDate(),
                system: false
            })
        })
        this.setState({messages: messages})
    }

// Adds messages to the firebaase firestore
    addMessages = () => {
        const messages = this.state.messages[0];
        this.referenceChatMessages.add({
            text: messages.text || '',
            createdAt: messages.createdAt,
            system: false,
            uid: messages._id,
        })
    }

// Adds a user the firebase firestore
    addUser = () => {
        const user = this.state.user;
        this.referenceUsersList.add({
            uid: user.uid,
            name: user.name,
        })
    }

// Adds the message to the gifted chat, runs the addmessages function and dismisses keyboard
    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }), () => {
            this.addMessages();
        });
        Keyboard.dismiss();
    }

// Custom Message Send button
    renderSend(props) {
        return (
            <Send {...props} containerStyle={{ height: 40, width: 40, justifyContent: 'center', alignItems: 'center'}}>
                <View style={{marginRight: 5, marginBottom: 5}}>
                    <MaterialCommunityIcons name="send-circle" size={32}/>
                </View>
            </Send>
        )
    }

// Styled Message Box
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

// Styled Input
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


// On Component UnMount
    componentWillUnmount() {

    // Firebase firestore listener closed
        this.authUnsubscribe();
    }


   

    
// App Rendered
    render() {
        let { color, name } = this.props.route.params;
        const { messages, user } = this.state;
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
                        name: user.name,
                        _id: user.uid
                    }}
                    textStyles={textStyles.input}
                />
                { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height"/> : null }
            </View>
        )
    }

}

// Styles
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