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
        marginTop: screenHeight / 10,
        marginBottom: screenHeight / 20
    },
    reactLogo: {
        width: screenWidth / 1.684,
        height: screenWidth / 4,
        tintColor: Colors.tabIconSelected,
        marginBottom: screenWidth/41.1,
    },
    userContainer: {
        flexDirection: 'row',
        paddingHorizontal: screenWidth / 8,
        marginBottom: screenWidth / 10
    },
    user: {
        flex: 3,
        flexDirection: 'row',
        width: screenWidth,
        alignItems: 'center',
        borderBottomColor: 'rgba(0,0,0,1)',
        borderBottomWidth: 0.5,
    },
    userName: {
        tintColor: Colors.blackText,
        width: screenWidth / 20,
        height: screenWidth / 20,
        marginRight: screenWidth/82.2
    },
    input: {
        flex: 1,
        fontSize: 16,
        marginLeft: screenWidth/82.2,
    },
    send: {
        flex: 1,
        backgroundColor: Colors.tintColor,
        borderRadius: screenWidth/51.375,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: screenWidth/82.2,
    },
    txtSend: {
        fontSize: 16,
        color: Colors.white,
        paddingHorizontal: screenWidth/41.1,
        paddingVertical: screenWidth/82.2,
    },
    buttonChange: {
        flexDirection: 'row',
        paddingHorizontal: screenWidth / 8,
        marginBottom: screenWidth / 30
    },
    buttonChange1: {
        flex: 1,
        flexDirection: 'row',
        width: screenWidth,
        height: screenWidth / 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: screenWidth / 16,
        backgroundColor: Colors.tabIconSelected,
    },
    textChange: {
        fontSize: 20,
        color: Colors.white
    },
    buttonLogin: {
        flexDirection: 'row',
        paddingHorizontal: screenWidth / 8,
        marginBottom: screenWidth / 30,
        borderWidth:1,
        marginHorizontal:screenWidth/8,
        borderRadius: screenWidth / 16,
        borderColor: Colors.gray,
    },
    buttonLogin1: {
        flex: 1,
        flexDirection: 'row',
        width: screenWidth,
        height: screenWidth / 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Colors.gray,
    },
    textLogin: {
        fontSize: 20,
        opacity: 0.7
    },
});

export default styles;
