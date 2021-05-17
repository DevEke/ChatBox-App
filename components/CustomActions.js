import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { styles } from '../styles';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import firebase from 'firebase';
import 'firebase/firestore'

class CustomActions extends Component {

    // Opens library to select image
        selectImg = async () => {
            const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status === 'granted') {
                let result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: 'Images'
                }).catch(error => {
                    console.log(error)
                });
                if (!result.cancelled) {
                    this.saveImg(result.uri);
                }
            }
        }

    // Opens camera to take a picture
        takePic = async () => {
            const { status } = await Permissions.askAsync(Permissions.CAMERA);
            if (status === 'granted') {
                let result = await ImagePicker.launchCameraAsync()
                .catch(error => {
                    console.log(error)
                });
                if (!result.cancelled) {
                    this.saveImg(result.uri);
                }
            }
        }
    
    // Gets current Location    
        getLoc = async () => {
            const {status} = await Permissions.askAsync(Permissions.LOCATION);
            if (status === 'granted') {
                let result = await Location.getCurrentPositionAsync({})
                .catch(error => {
                    console.log(error)
                });
                if(result) {
                    this.props.onSend({
                        location: {
                            latitude: result.coords.latitude,
                            longitude: result.coords.longitude
                        }
                    })
                }
            }
        }

    // Saves img to firebase firestore
        saveImg = async (uri) => {
            try {
                const { props } = this.props;
                const blob = await new Promise((resolve, reject) => {
                    const xhr = new XMLHttpRequest();
                    xhr.onload = function () {
                        resolve(xhr.response)
                    };
                    xhr.onerror = function (e) {
                        console.log(e);
                        reject(new TypeError('Request Failed'));
                    };
                    xhr.responseType = 'blob';
                    xhr.open('GET', uri, true);
                    xhr.send(null);
                });

                const uriParse = uri.split('');
                const uriName = uriParse[uriParse.length -1];
                const promise = [];
                const ref = firebase.storage().ref();
                const uploadTask = ref.child(`${uriName}`).put(blob);
                promise.push(uploadTask);

                Promise.all(promise).then(async tasks => {
                    blob.close();
                    const imageUrl = await uploadTask.snapshot.ref.getDownloadURL();
                    this.props.onSend({
                        image: imageUrl
                    })
                })
            } catch (error) {
                console.log(error)
            }
        }

    // Shows menu when action button is pressed
        onActionPress = () => {
            const options = [
                'Select Image from Library',
                'Take a Photo', 
                'Share Location', 
                'Cancel'
            ];
            const cancelBtnIdx = options.length - 1;
            this.context.actionSheet().showActionSheetWithOptions(
                {
                    options,
                    cancelBtnIdx
                },
                async (btnIdx) => {
                    switch (btnIdx) {
                        case 0: this.selectImg(); return;
                        case 1: this.takePic(); return;
                        case 2: this.getLoc(); default:
                    }
                }
            )
        }

    render() {
        return (
            <TouchableOpacity style={styles.moreActions} onPress={this.onActionPress}>
                <MaterialIcons name='add-circle' size={32} color='black'/>
            </TouchableOpacity>
        )
    }
}

CustomActions.contextTypes = {
    actionSheet: PropTypes.func,
};

export default CustomActions;

