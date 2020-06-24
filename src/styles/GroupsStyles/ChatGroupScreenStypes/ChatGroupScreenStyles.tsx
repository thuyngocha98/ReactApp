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
        marginLeft: screenWidth/36,
        fontSize: 15,
        marginBottom: screenWidth/72
    },
    viewUser: {
        marginRight: screenWidth/36,
        marginTop:screenWidth/120,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    sub1ViewUser: {
        flex: 0.7, 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'flex-end',
    },
    viewTextUser: {
        borderRadius: 15, 
        backgroundColor: "rgba(247,189,66,1)", 
        flexDirection: 'column',
    },
    txtMessageUser: {
        textAlign: 'right',
        color: "#FFFFFF", 
        marginTop: screenWidth/90, 
        marginHorizontal: screenWidth/45, 
        fontSize: 15,
    },
    txtMessageTimeUser: {
        letterSpacing: 0.3,
        textAlign: 'right',
        color: "#FFFFFF", 
        marginBottom: screenWidth/90, 
        marginHorizontal: screenWidth/45, 
        fontSize: 8,
    },
    viewFriend: {
        marginLeft: screenWidth/36,
        marginTop:screenWidth/120,
        flexDirection: 'row', 
        justifyContent: 'flex-start', 
        alignItems: 'center',
    },
    sub1ViewFriend: {
        flex: 0.7, 
        flexDirection: 'row', 
        justifyContent: 'flex-start', 
        alignItems: 'flex-end',
    },
    viewTextFriend: {
        marginRight: screenWidth/120,
        width: screenWidth/12, 
        height: screenWidth/12, 
        borderRadius: screenWidth/24, 
        overflow: 'hidden',
    },
    viewMessageFriend: {
        borderRadius: 15, 
        backgroundColor: "#F1F0F0", 
        flexDirection: 'column',
    },
    txtMessageFriend: {
        textAlign: 'left',
        color: "rgba(0, 0, 0, 1)", 
        marginTop: screenWidth/90, 
        marginHorizontal: screenWidth/45, 
        fontSize: 15,
    },
    txtMessageTimeFriend: {
        letterSpacing: 0.3,
        textAlign: 'right',
        color: "rgba(0, 0, 0, .40)", 
        marginBottom: screenWidth/90, 
        marginHorizontal: screenWidth/45, 
        fontSize: 8,
    }
});
export default ChatGroupScreenStyles;
