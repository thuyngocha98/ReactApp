import {StatusBar, StyleSheet} from "react-native";
import {APPBAR_HEIGHT, screenWidth} from "../../../constants/Dimensions";
import Colors from "../../../constants/Colors";


const ChatGroupScreenStyles = StyleSheet.create({
    containerHeader: {
        width: screenWidth,
        height: APPBAR_HEIGHT + StatusBar.currentHeight,
        backgroundColor: Colors.tabIconSelected
    },
    header: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: screenWidth / 27.43,
    },
    nameGroup: {
        flex: 9,
        fontSize: screenWidth / 16,
        fontWeight: '500',
        color: Colors.white,
        textAlign: 'center',
    },
    cancel: {
        flex: 1,
    },
    footer: {
        flexDirection: 'row',
        marginHorizontal: 7,
        marginVertical: 7
    },
    input: {
        paddingLeft: 12,
        height: 40,
        borderWidth: 1,
        borderColor: Colors.lightgray,
        borderRadius: screenWidth / 20,
        fontSize: 15
    },
    send: {
        width: screenWidth / 13,
        height: screenWidth / 13,
        borderRadius: screenWidth / 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.tintColor,
        marginTop: 7,
        marginLeft: 5
    },
    microphone: {
        marginLeft: 7,
        marginTop: 7
    },
    message: {
        marginLeft: 10,
        fontSize: 15,
        marginBottom: 5
    },
});
export default ChatGroupScreenStyles;
