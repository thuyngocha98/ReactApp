import {screenHeight, screenWidth} from "../../constants/Dimensions";
import Colors from "../../constants/Colors";
import {StyleSheet} from "react-native";


const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'rgba(255,255,255,1)',
        flex: 1,
    },
    header: {
        alignItems: 'center',
        marginTop: screenHeight / 15,
        marginBottom: screenHeight / 15
    },
    reactLogo: {
        width: screenWidth / 3,
        height: screenWidth / 3,
        tintColor: Colors.tabIconSelected,
        marginBottom: 10,
    },
    userContainer: {
        flexDirection: 'row',
        paddingHorizontal: screenWidth / 10,
        marginBottom: screenWidth / 10
    },
    user: {
        flex: 1,
        flexDirection: 'row',
        width: screenWidth,
        alignItems: 'center',
        borderColor: 'rgba(0,0,0,1)',
        borderBottomWidth: 1,
        borderRadius: screenWidth / 15,
    },
    userName: {
        tintColor: Colors.blackText,
        width: screenWidth / 20,
        height: screenWidth / 20,
        marginLeft: 10,
        marginRight: 5
    },
    input: {
        fontSize: 16,
        marginLeft: 5,

    },
    buttonSignUp: {
        flexDirection: 'row',
        paddingHorizontal: screenWidth / 8,
        marginBottom: screenWidth / 30
    },
    buttonSignUp1: {
        flex: 1,
        flexDirection: 'row',
        width: screenWidth,
        height: screenWidth / 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: screenWidth / 16,
        backgroundColor: Colors.tabIconSelected,
    },
    textSignUp: {
        fontSize: 20,
        color: Colors.white
    },
    buttonLogin: {
        flexDirection: 'row',
        paddingHorizontal: screenWidth / 8,
        marginBottom: screenWidth / 30
    },
    buttonLogin1: {
        flex: 1,
        flexDirection: 'row',
        width: screenWidth,
        height: screenWidth / 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: screenWidth / 16,
    },
    textLogin: {
        fontSize: 20,
        opacity: 0.7
    },
});

export default styles;
