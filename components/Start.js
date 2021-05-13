import React, { Component } from 'react';
import { styles } from '../styles';
import * as Font from 'expo-font';
import { MaterialIcons } from '@expo/vector-icons';
import logo from '../assets/logo.png';
import { View, Text, KeyboardAvoidingView, TouchableOpacity, TextInput, Image, StyleSheet, Alert } from 'react-native';

// Creates App
    class StartScreen extends Component {
        constructor(props) {
            super(props);

            this.state = {
                name: '',
                color: '#EAEAEA',
                error: false
            }
        }

    // Checks for an empty name input
        inputValidation = () => {
            if (this.state.name === '') {
                Alert.alert("Enter your name")
                this.setState({
                    error: true
                })
            }
            else {
                this.setState({
                    error: false
                })
                this.props.navigation.navigate('Chat', {
                    name: this.state.name, 
                    color: this.state.color
                })
            }
        }

    // Set Font Properties
        getFonts = () => {
            return Font.loadAsync({
            "Light": require('../assets/fonts/Sen-Regular.ttf'),
            "Bold": require('../assets/fonts/Sen-Bold.ttf')
            });
        };

    // Set Background Colors
        setLight = () => {
            this.setState({
                color: '#EAEAEA'
            })
        }
        setWarm = () => {
            this.setState({
                color: '#FAD0B2'
            })
        }
        setCool = () => {
            this.setState({
                color: '#9EC0D8'
            })
        }
        setEarth = () => {
            this.setState({
                color: '#8EC090'
            })
        }
    

// App Mounted
    componentDidMount() {
        this.props.navigation.setOptions({ headerShown: false});
        this.getFonts();
    }

    // App Rendered
    render() {
        const { name, color, error } = this.state;
        
        return (
            <View style={styles.container}>
                    <Image source={logo} style={styles.logoImage}/>
                <View style={styles.formContainer}>  
                    <View style={styles.inputContainer}>
                        <MaterialIcons style={styles.userIcon} name="account-circle" size={24} color="#999" />
                        <TextInput
                            style={
                            error === true 
                            ? [textStyles.inputComponent, textStyles.inputError]
                            : textStyles.inputComponent
                            }
                            value={name}
                            onChangeText={(text) => this.setState({name: text})}
                            placeholder="Enter your name..."
                            
                        />
                        { Platform.OS === 'android' ? <KeyboardAvoidingView keyboardVerticalOffset={100} behavior="height"/> : null }
                    </View>
                    <View style={styles.backgroundSelectorContainer}>
                        <View style={styles.backgroundColorsContainer}>
                            <TouchableOpacity onPress={this.setLight}
                                style={
                                color === '#EAEAEA'
                                ? [styles.backgroundPicker, styles.light, styles.selectedColor] 
                                : [styles.backgroundPicker, styles.light ]
                                }
                            >
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.setWarm}
                                style={
                                color === '#FAD0B2'
                                ? [styles.backgroundPicker, styles.warm, styles.selectedColor] 
                                : [styles.backgroundPicker, styles.warm ]
                                }
                            >
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.setCool}
                                style={
                                color === '#9EC0D8'
                                ? [styles.backgroundPicker, styles.cool, styles.selectedColor] 
                                : [styles.backgroundPicker, styles.cool ]
                                }
                            >
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.setEarth}
                                style={
                                color === '#8EC090'
                                ? [styles.backgroundPicker, styles.earth, styles.selectedColor] 
                                : [styles.backgroundPicker, styles.earth ]
                                }
                            >
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.enterChat}
                        onPress={this.inputValidation}
                    >
                        <Text style={textStyles.buttonText}>Enter Chat Room</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const textStyles = StyleSheet.create({
    buttonText: {
        fontFamily: 'Bold',
        color: 'white',
        fontSize: 18,
        textTransform: 'uppercase'
    },
    labelText: {
        fontFamily: 'Bold',
        fontSize: 14,
        color: 'black'
    },
    inputComponent: {
        borderRadius: 3,
        backgroundColor: '#f3f3f3',
        height: 60,
        paddingLeft: 60,
        paddingRight: 10,
        fontSize: 16,
        color: "black",
        fontFamily: 'Bold' 
    },
    inputError: {
        backgroundColor: '#FFE1E1'
    }
})



export default StartScreen;