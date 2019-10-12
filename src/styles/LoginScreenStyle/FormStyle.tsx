import {screenWidth, screenHeight} from "../../constants/Dimensions";
import Colors from "../../constants/Colors";
import {StyleSheet} from "react-native";

const styles = StyleSheet.create({

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
        borderColor:'rgba(0,0,0,1)',
        borderWidth:1,
        borderRadius: screenWidth / 15,
    },
    userName: {
        tintColor:Colors.blackText,
        width: screenWidth / 15,
        height: screenWidth / 15,
        marginLeft: 10
    },
    input: {
        fontSize: 16,
        marginLeft: 5,

    },
    input1: {
        flex: 1,
        fontSize: 16,
        marginLeft: 5,

    },
    eyeBlack: {
        width: screenWidth / 15,
        height: screenWidth / 15,
        tintColor: 'rgba(0,0,0,0.5)',
        marginRight: 10
    },
    buttonLogin: {
        flexDirection: 'row',
        paddingHorizontal: screenWidth / 4,
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
        backgroundColor: '#F035E0',
    }
});

export default styles;
