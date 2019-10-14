import {screenWidth, screenHeight} from "../../constants/Dimensions";
import Colors from "../../constants/Colors";
import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'rgba(255,255,255,1)',
        flex: 1,
    },
    imageBackground: {

        flex: 1,
    },
    header: {
        alignItems: 'center',
        marginTop: screenHeight / 10,
        marginBottom: screenHeight / 10
    },
    reactLogo: {
        width: screenWidth / 3,
        height: screenWidth / 3,
        tintColor: Colors.tabIconSelected,
        marginBottom: 10,
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
        borderColor:'rgba(0,0,0,1)',
        borderWidth:1,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
    email: {
        opacity:0.6,
        width: screenWidth / 20,
        height: screenWidth / 20,
        marginLeft: 15
    },
    password: {
        tintColor:Colors.blackText,
        width: screenWidth / 15,
        height: screenWidth / 15,
        marginLeft: 10
    },
    input: {
        fontSize: 16,
        marginLeft: 5,
        color: Colors.blackText
    },
    input1: {
        flex: 1,
        fontSize: 16,
        marginLeft: 5,
        color: Colors.blackText
    },
    eyeBlack: {
        width: screenWidth / 15,
        height: screenWidth / 15,
        tintColor: 'rgba(0,0,0,0.5)',
        marginRight: 10
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
        paddingHorizontal: screenWidth / 8,
    },
    register: {
    },
    forgot: {
        flex:1,
        marginLeft:5,
    },
    textForgot: {
        fontSize: 16
    },
    textRegister: {
        fontSize: 16,
    },


});

export default styles;
