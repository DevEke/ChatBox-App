import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import StartScreen from './components/Start';
import ChatScreen from './components/Chat';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const getFonts = () => {
  return Font.loadAsync({
    'Regular': require('./assets/fonts/Quicksand-Regular.ttf'),
    'Bold': require('./assets/fonts/Quicksand-Bold.ttf')
  });
};

export default function App() {

  const [ fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={() => setFontLoaded(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Start">
          <Stack.Screen name="Start" component={StartScreen}/>
          <Stack.Screen name="Chat" component={ChatScreen}/>
        </Stack.Navigator>  
      </NavigationContainer>
  );
}

