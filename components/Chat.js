import React, { Component } from 'react';
import { styles } from '../styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import user1 from '../assets/icons/user1.png';
import user2 from '../assets/icons/user2.png';
import CustomActions from './CustomActions';
import { Bubble, GiftedChat, InputToolbar, Send, Avatar } from 'react-native-gifted-chat';
import { View, Text, StyleSheet, Platform, KeyboardAvoidingView, LogBox, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';
const firebase = require('firebase');
require('firebase/firestore');
require('firebase/auth');
LogBox.ignoreLogs(['Setting a timer for a long period of time', 'undefined']);  

class ChatScreen extends Component {
    constructor() {
        super();

    // Initialize state 
        this.state = {
            isConnected: false,
            uid: 0,
            messages: [],
            user: {
                _id: '',
                name: '',
                avatar: null
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

// References active user list 
    onAuthStateChanged() {
        this.referencedUser = firebase.firestore().collection('users').where("_id", "==". this.state.user._id);
    }


// Updates state with messages from the firebase firestore
    onMessagesUpdate = (querySnapshot) => {
        const messages = [];
        querySnapshot.forEach((doc) => {
            let data = doc.data();
            messages.push({
                user: {
                    _id: data.user._id,
                    name: data.user.name,
                    avatar: data.user.avatar
                },
                text: data.text,
                createdAt: data.createdAt.toDate(),
                system: false,
                image: data.image,
                location: data.location
            })
        })
        this.setState({messages: messages})
    }

// Adds messages to the firebaase firestore
    addMessages = () => {
        const messages = this.state.messages[0];
        this.referenceChatMessages.add({
            text: messages.text || null,
            createdAt: messages.createdAt,
            system: false,
            image: messages.image || null,
            location: messages.location || null,
            user: {
                _id: messages.user._id,
                name: messages.user.name,
                avatar: messages.user.avatar
            }
        })
    }

// Gets messages
    async getMessages() {
        let messages = '';
        try {
            messages = await AsyncStorage.getItem('messages') || [];
            this.setState({
                messages: JSON.parse(messages)
            });
        } catch (error) {
            console.log(error.message);
        }
    };

// Saves Messages
    async saveMessages() {
        try {
            await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
         } catch (error) {
            console.log(error.message)
        }
    }


// Deletes messages
    async deleteMessges() {
        try {
            await AsyncStorage.removeItem('messages');
            this.setState({
                messages: []
            });
        } catch (error) {
            console.lof(error.message);
        }
    }

// App Component Mounted
    componentDidMount() {

    // Checks for internet connection
        NetInfo.fetch().then(connection => {
            if (connection.isConnected) {
                this.setState({
                    isConnected: true
                });
            } else {
                this.setState({
                    isConnected: false
                });
                this.getMessages();
            }
            
        // Firebase Authentication    
            if (this.state.isConnected) {
                this.authUnsubscribe = firebase.auth().onAuthStateChanged(async user => {
                    if (!user) {
                        user = await firebase.auth().signInAnonymously();
                    }
                    this.setState({
                        user: {
                            _id: user.uid,
                            name: this.props.route.name,
                            avatar: null
                        }
                    })
                });
                this.unsubscribe =  this.referenceChatMessages.orderBy('createdAt', 'desc').onSnapshot(this.onMessagesUpdate)
            }
        })
        

    // Displays name from the login screen
        const { name } = this.props.route.params;
        this.props.navigation.setOptions({title: name});

    // References messages collection in firebase firestore
        this.referenceChatMessages = firebase.firestore().collection('messages');


        
    }




// Adds the message to the gifted chat, runs the addmessages function and dismisses keyboard
    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }), () => {
            this.saveMessages();
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
                        backgroundColor: 'black',
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
        const { isConnected } = this.state;
        if (!isConnected) {
        } else {
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
        
    }

// Custom Actions
    renderCustomActions(props) {
        return <CustomActions {...props}/>
    }

// Renders Custom Map View
    renderCustomView(props) {
        const { currentMessage } = props;
        if (currentMessage.location) {
            return (
                <MapView
                style={{
                    width: 150,
                    height: 100,
                    borderRadius: 5,
                    margin: 3
                }}
                region={{
                    latitude: currentMessage.location.latitude,
                    longitude: currentMessage.location.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }}/>

            )
        }
        return null
    }

// On Component UnMount
    componentWillUnmount() {

    // Firebase firestore listener closed
        this.authUnsubscribe();
    }


   

    
// App Rendered
    render() {
        const { color, name } = this.props.route.params;
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
                    renderActions={this.renderCustomActions}
                    renderCustomView={this.renderCustomView}
                    user={{
                        name: name,
                        _id: user._id,
                        avatar: null
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