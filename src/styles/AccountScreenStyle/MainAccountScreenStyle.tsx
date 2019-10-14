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
        marginTop: screenWidth / 10
    },
    male: {
        marginTop: 10
    },
    textUser: {
        marginTop: screenWidth / 100,
        fontSize: 16,
        color: Colors.white
    },
    email: {
        opacity: 0.7,
        marginBottom: 10,
        color: Colors.white
    },
    mainContainer: {
        marginTop: screenWidth / 15,
        paddingHorizontal: 20
    },
    overView: {
        marginVertical: screenWidth / 25,
        flexDirection: 'row'
    },
    textOverview: {
        marginLeft: 15,
        marginTop: 3,
        fontSize: 22,
        color: 'gray',
    },
    setting: {
        flexDirection: 'row',
        marginVertical: screenWidth / 25,
    },
    textSetting: {
        marginLeft: 10,
        marginTop: 3,
        fontSize: 22,
        color: 'gray',
    },
    help: {
        flexDirection: 'row',
        marginVertical: screenWidth / 25,
        marginLeft: 4
    },
    textHelp: {
        marginLeft: 12,
        marginTop: 2,
        fontSize: 22,
        color: 'gray'
    },
    signOut: {
        flexDirection: 'row',
        marginVertical: screenWidth / 25,
        marginLeft: 10
    },
    textSignOut: {
        marginLeft: 12,
        marginTop: -2,
        fontSize: 22,
        color: 'gray',
    }

});

export default styles;
