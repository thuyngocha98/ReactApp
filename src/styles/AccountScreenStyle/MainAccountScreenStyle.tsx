import {screenWidth, screenHeight} from "../../constants/Dimensions";
import Colors from "../../constants/Colors";
import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: Colors.tabIconSelected,
    },
    header: {
        marginTop: screenHeight / 20,
        alignItems: 'center'
    },
    textAccount: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.white
    },
    avatar: {
        width: screenWidth / 4,
        height: screenWidth / 4,
        borderRadius: screenWidth / 8,
        resizeMode: 'cover',
        marginTop: screenWidth / 27.4
    },
    male: {
        marginTop: screenWidth / 41.1
    },
    textUser: {
        marginTop: screenWidth / 100,
        fontSize: 17,
        color: Colors.white
    },
    email: {
        opacity: 0.7,
        fontSize: 15,
        marginBottom: screenWidth / 41.1,
        color: Colors.white
    },
    mainContainer: {
        marginTop: screenWidth / 20.55,
        paddingHorizontal: screenWidth / 20.55,
        backgroundColor: Colors.white
    },
    overView: {
        marginVertical: screenWidth / 25,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textOverview: {
        marginLeft: screenWidth / 27.4,
        fontSize: 18,
        color: 'gray',
    },
    setting: {
        flexDirection: 'row',
        marginVertical: screenWidth / 25,
        alignItems: 'center',
    },
    textSetting: {
        marginLeft: screenWidth / 30,
        fontSize: 18,
        color: 'gray',
    },
    help: {
        flexDirection: 'row',
        marginVertical: screenWidth / 25,
        alignItems: 'center',
    },
    textHelp: {
        marginLeft: screenWidth / 26,
        fontSize: 18,
        color: 'gray'
    },
    signOut: {
        flexDirection: 'row',
        marginVertical: screenWidth / 25,
        alignItems: 'center',
    },
    textSignOut: {
        marginLeft: screenWidth / 26,
        fontSize: 18,
        color: 'gray',
    }

});

export default styles;
