import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { styles } from '../styles';
import * as Font from 'expo-font';
import user from '../assets/icons/user.png';
import logo from '../assets/logo.png';
import { View, Text, TouchableOpacity, TextInput, Image, StyleSheet, Alert } from 'react-native';

class StartScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            color: '#333333',
            error: false
        }
    }

    // This function validates that the user enters something in the input field.

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

    // This function is for loading my custom fonts into the app

    getFonts = () => {
        return Font.loadAsync({
          'Regular': require('../assets/fonts/Quicksand-Regular.ttf'),
          'Bold': require('../assets/fonts/Quicksand-Bold.ttf')
        });
      };

    // These functions set the state of the background color. There is probably an easier way to do this.

    setDark = () => {
        this.setState({
            color: '#333333'
        })
    }

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

    // This function will hide the title bar on the start screen and trigger the function to get the fonts

    componentDidMount() {
        this.props.navigation.setOptions({ headerShown: false});
        this.getFonts();
    }

    render() {
        const { name, color, error } = this.state;
        
        return (
            <View style={styles.container}>
                    <Image source={logo} style={styles.logoImage}/>
                <View style={styles.formContainer}>  
                    <View style={styles.inputContainer}>
                        <Image style={styles.userIcon} source={user}></Image>
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
                    </View>
                    <View style={styles.backgroundSelectorContainer}>
                        <Text style={textStyles.labelText}>Set Background Color</Text>
                        <View style={styles.backgroundColorsContainer}>
                            <TouchableOpacity onPress={this.setDark}
                                style={
                                color === '#333333'
                                ? [styles.backgroundPicker, styles.dark, styles.selectedColor] 
                                : [styles.backgroundPicker, styles.dark ]
                                }
                            >
                            </TouchableOpacity>
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
        fontSize: 16
    },
    labelText: {
        fontFamily: 'Bold',
        fontSize: 14,
        color: 'black'
    },
    inputComponent: {
        borderRadius: 15,
        backgroundColor: '#f3f3f3',
        height: 50,
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