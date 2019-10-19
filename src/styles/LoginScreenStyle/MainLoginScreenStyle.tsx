import {screenWidth, screenHeight} from "../../constants/Dimensions";
import Colors from "../../constants/Colors";
import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#ffffff',
        flex: 1,
    },
    imageBackground: {
        flex: 1,
    },
    header: {
        alignItems: 'center',
        marginTop: screenHeight / 7,
        marginBottom: screenHeight / 20
    },
    reactLogo: {
        width: screenWidth / 3,
        height: screenWidth / 3,
        tintColor: Colors.tabIconSelected,
        marginBottom: screenWidth/41.1,
    },
    title: {
        fontSize: 24,
    },
    loginContainer: {
        flexDirection: 'row',
        paddingHorizontal: screenWidth / 10,
        marginBottom: screenWidth / 20
    },
    login: {
        flex: 1,
        flexDirection: 'row',
        width: screenWidth,
        height: screenWidth / 8,
        alignItems: 'center',
        borderRadius: screenWidth / 16,
        borderColor:Colors.lightgray,
        borderWidth:1,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
    email: {
        opacity:0.6,
        width: screenWidth / 20,
        height: screenWidth / 20,
        marginLeft: screenWidth/27.4
    },
    password: {
        tintColor:Colors.blackText,
        width: screenWidth / 15,
        height: screenWidth / 15,
        marginLeft: screenWidth / 34.25
    },
    input: {
        flex: 1,
        fontSize: 16,
        marginLeft: screenWidth/51.375,
        color: Colors.blackText
    },
    input1: {
        flex: 1,
        fontSize: 16,
        marginLeft: screenWidth/82.2,
        color: Colors.blackText
    },
    eyeBlack: {
        width: screenWidth / 15,
        height: screenWidth / 15,
        tintColor: 'rgba(0,0,0,0.5)',
        marginRight: screenWidth/41.1
    },
    buttonLogin: {
        flexDirection: 'row',
        paddingHorizontal: screenWidth / 10,
        marginBottom: screenWidth / 30
    },
    buttonLogin1: {
        flex: 1,
        flexDirection: 'row',
        width: screenWidth,
        height: screenWidth / 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: screenWidth / 16,
        backgroundColor: Colors.tabIconSelected,
    },
    textLogin: {
        fontSize: 16,
        color: Colors.white
    },
    footer: {
        flexDirection:'row',
        marginTop: screenWidth/41.1,
        paddingHorizontal: screenWidth / 8,
    },
    register: {
        flex: 1,
        marginLeft: screenWidth/82.2,
    },
    forgot: {
        
    },
    textForgot: {
        fontSize: 16
    },
    textRegister: {
        fontSize: 16,
    },


});

export default styles;
