import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 30
    },
    logoContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText: {
        fontSize: 45,
        fontWeight: '600',
        color: 'black',
        marginVertical: 100
    },
    logoImage: {
        height: 150,
        width: 150,
        marginVertical: 100
    },
    chatTitle: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'white',
        borderRadius: 15,
        fontSize: 16,
        color: '#999'
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginVertical: 20,
        padding: 20,
        width: '88%',
        height: '44%',
        backgroundColor: 'white',
        borderRadius: 20,
    },
    inputContainer: {
        position: 'relative'
    },
    userIcon: {
        position: 'absolute',
        left: 20,
        top: 15,
        zIndex: 30
    },
    enterChat: {
        height: 50,
        paddingVertical: 10,
        width: '100%',
        borderRadius: 15,
        backgroundColor: '#632B8E',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    labelText: {
        fontSize: 16,
        fontWeight: '700',
        color: "#999",
    },
    backgroundSelectorContainer: {
        marginVertical: 10,
    },
    backgroundColorsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    backgroundPicker: {
        height: 40,
        width: 40,
        borderRadius: 20,
        marginHorizontal: 10,
        marginVertical: 20,
    },
    dark: {
        backgroundColor: '#333'
    },
    light: {
        backgroundColor: '#EAEAEA'
    },
    warm: {
        backgroundColor: "#FAD0B2"
    },
    cool: {
        backgroundColor: "#9EC0D8"
    },
    earth: {
        backgroundColor: "#8EC090"
    },
    selectedColor: {
        transform: [{ scale: 1.3}]
    },
    chatContainer: {
        flex: 1
    }
})