import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingVertical: 30,
        backgroundColor: 'white'
    },
    moreActions: {
        padding: 5,
        margin: 0
    },
    logoImage: {
        height: 150,
        width: 150,
        marginTop: 100,
        marginBottom: 20
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginVertical: 20,
        marginBottom: 100,
        padding: 20,
        width: '88%',
        height: '44%',
        backgroundColor: 'white'
    },
    inputContainer: {
        position: 'relative'
    },
    userIcon: {
        position: 'absolute',
        left: 16,
        top: 14,
        zIndex: 30
    },
    enterChat: {
        height: 60,
        paddingVertical: 10,
        width: '100%',
        borderRadius: 3,
        backgroundColor: 'black',
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
        justifyContent: 'space-between',
        paddingHorizontal: 20
    },
    backgroundPicker: {
        height: 40,
        width: 40,
        borderRadius: 20,
        marginHorizontal: 10,
        marginVertical: 20,
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